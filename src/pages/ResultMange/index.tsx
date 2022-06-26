import {
    NavBar,
    Card,
    Toast,
    Button,
    SearchBar,
    Dialog,
    PullToRefresh,
    Form,
    Input,
    Mask, Tag, InfiniteScroll, Modal, Space
} from "antd-mobile";
import React, { useState } from "react";
import styled from "styled-components";
import { AntOutline, SendOutline } from "antd-mobile-icons";
import { NavigateFunction, useNavigate } from "react-router";
import { NormalPickerItem } from "components/NormalPickerItem";
import { useAdminResultList } from "hooks/result";
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { scanQR } from "components/QRCodeReader";
import { PickerItem } from "components/PickerItem";
import { useSiteList } from "hooks/appointment";
import { deleteTestResult, updateTestResult } from "service/testResult";
import { formatDate } from "util/dateFormat";
import { Debounce } from "util/HOF";

const initPageSize = 5;

export const ResultMange = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const [maskVisible, setMaskVisible] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [form] = Form.useForm();
    const { resultList, hasMore, loadMore, refresh, setKeyword } = useAdminResultList(initPageSize);
    const { siteList } = useSiteList();

    return <AppContainer>
        <Mask visible={maskVisible} onMaskClick={() => setMaskVisible(false)}>
            <div className="overlayContent">
                <Form
                    layout='horizontal'
                    mode='card'
                    form={form}
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            修改
                        </Button>
                    }
                    onFinish={(values) => {
                        updateTestResult({
                            ...values,
                            siteId: siteList.find(v => v.address === values.address)?.id,
                            time: formatDate(new Date(values.time)),
                        }).then(() => {
                            Toast.show('修改成功');
                            setMaskVisible(false);
                            refresh();
                        }).catch(_ => {
                        });
                    }}
                >
                    <Form.Header>修改检测结果</Form.Header>
                    <Form.Item name='uid'
                        label='用户ID'
                        rules={[{ required: true, message: '内容不能为空' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name='tester'
                        label='检测人员'
                        rules={[{ required: true, message: '内容不能为空' }]}
                    >
                        <Input placeholder='请输入采样人员姓名' />
                    </Form.Item>
                    <Form.Item name='address' label='检测地点' rules={[{ required: true, message: '内容不能为空' }]}>
                        <PickerItem
                            columns={[siteList.map(item => ({ label: item.address, value: item.address }))]}
                        />
                    </Form.Item>
                    <Form.Item name='time'
                        label='检测时间'
                        rules={[{ required: true, message: '内容不能为空' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name='result'
                        label='检测结果'
                        rules={[{ required: true, message: '内容不能为空' }]}
                        onClick={() => {
                            setPickerVisible(true)
                        }}>
                        <NormalPickerItem
                            columns={[
                                [
                                    { label: '阳性', value: 'positive' },
                                    { label: '阴性', value: 'negative' },
                                ],
                            ]}
                            visible={pickerVisible}
                            setVisible={setPickerVisible}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Mask>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')} />}
        >
            检测结果管理
        </NavBar>
        <Space block align="center" justify="between" style={{ padding: '16px 16px 0' }}>
            <SearchBar
                placeholder='搜索地址'
                style={{
                    '--background': '#ffffff',
                    '--height': '32px',
                    '--padding-left': '6px',
                }}
                onChange={Debounce(setKeyword, 500)}
            />
            <Button size='small'
                color='primary'
                onClick={() => QRScanner(navigate)}
            >
                扫码添加
            </Button>
        </Space>
        <PullToRefresh onRefresh={refresh}>
            {resultList && resultList.map((result, idx) =>
                <div className="container" key={result.uid + result.time}>
                    <Card
                        key={idx}
                        className="task"
                        title={
                            <div style={{ fontWeight: 'bold' }}>
                                <AntOutline style={{ marginRight: '4px', color: '#1677ff' }} />
                                {result.name}
                            </div>
                        }
                        style={{ borderRadius: '16px' }}
                    >
                        <div className="content">
                            <div className="message">
                                <span style={{ fontWeight: 'bold' }}>检测人员：</span>
                                <span>{result.tester}</span>
                            </div>
                            <div className="message">
                                <span style={{ fontWeight: 'bold' }}>检测时间：</span>
                                <span>{result.time}</span>
                            </div>
                            <div className="message">
                                <span style={{ fontWeight: 'bold' }}>检测地点：</span>
                                <span>{result.address}</span>
                            </div>
                            <div className="message">
                                <span style={{ fontWeight: 'bold' }}>检测结果：</span>
                                <span>{result.result === 'negative' ?
                                    <Tag color="success" round>阴性</Tag> :
                                    <Tag color="danger" round>阳性</Tag>}</span>
                            </div>
                        </div>
                        <div onClick={e => e.stopPropagation()} className="footer">
                            <Button
                                size='middle'
                                color='primary'
                                onClick={() => {
                                    setMaskVisible(true)
                                    form.setFieldsValue({
                                        uid: result.uid,
                                        time: result.time,
                                        address: result.address,
                                        tester: result.tester,
                                        result: result.result,
                                    })
                                }}
                            >
                                修改检测结果
                            </Button>
                            <Button
                                size='middle'
                                color='danger'
                                onClick={() => Dialog.confirm({
                                    content: '是否确认删除',
                                    onConfirm: async () => {
                                        return deleteTestResult(result.uid, result.time)
                                            .then(() => {
                                                Toast.show('删除成功');
                                                refresh();
                                            }).catch(_ => {
                                            });
                                    },
                                })}
                            >
                                删除检测结果
                            </Button>
                        </div>
                    </Card>
                </div>)}
            <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
        </PullToRefresh>
    </AppContainer>
});

const QRScanner = (navigate: NavigateFunction) => {
    const Container = styled.div`
      width: 100%;
    `

    const handler = Modal.show({
        title: '扫码',
        content: <Container>
            <Camera
                onTakePhoto={dataUri => {
                    scanQR(dataUri).then(res => {
                        console.log(res);
                        handler.close();
                        const userData = JSON.parse(res);
                        navigate('./add/' + userData.uid + '&' + userData.time);
                    }).catch(err => {
                        console.warn(err);
                        Toast.show('请再试一次');
                    });
                }}
                sizeFactor={0.5}
                idealFacingMode="environment"
            />
        </Container>,
        closeOnMaskClick: true,
    })
}

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;

  .topBar {
    flex: 0;
    border-bottom: 1px solid var(--adm-color-border);
    background-color: #2499f2;
    color: #fff;
  }

  .task {
    background-color: #FEFEFE;
    padding: 5px;
    border: 1px solid var(--adm-color-border);
  }

  .content {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .message {
    padding: 6px;
  }

  .body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    padding: 15px 15px 0;
  }

  .footer {
    padding: 12px 6px 6px 6px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
  }

  .overlayContent {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 370px;
    height: 370px;
    margin-top: -185px;
    margin-left: -185px;
    background: white;
    border-radius: 16px;
  }
`