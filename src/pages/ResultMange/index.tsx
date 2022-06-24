import {
    NavBar,
    Card,
    Toast,
    Button,
    SearchBar,
    Dialog,
    Divider,
    PullToRefresh,
    Form,
    Input,
    DatePicker, Mask, Picker, Space
} from "antd-mobile";
import React, {useState} from "react";
import styled from "styled-components";
import {AntOutline, SendOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router";
import moment from "moment";
import {NormalPickerItem} from "components/NormalPickerItem";

export const ResultMange = React.memo(() => {
// hooks
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>()
    const basicColumns = [
        [
            {label: '阳性', value: '阳性'},
            {label: '阴性', value: '阴性'},
        ],
    ]
    const ResultArr: TestResult[] = [
        {
            address: "江滨医院",
            tester: "钟佩祺",
            time: "2022-06-23 14:30",
            username: "陈欣阳",
            result: 'negative'
        },
        {
            address: "江滨医院",
            tester: "陈欣阳",
            time: "2022-06-23 14:30",
            username: "钟佩祺",
            result: 'negative'
        }
    ]
    return <AppContainer>
        <Mask visible={visible} onMaskClick={() => setVisible(false)}>
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
                >
                    <Form.Header>修改检测结果</Form.Header>
                    <Form.Item
                        name='tester'
                        label='检测人员'
                        rules={[{required: true, message: '内容不能为空'}]}
                    >
                        <Input placeholder='请输入采样人员姓名'/>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item name='address' label='检测地点' rules={[{required: true, message: '内容不能为空'}]}>
                        <Input placeholder='请输入检测地点'/>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item name='time'
                               label='检测时间'
                               rules={[{required: true, message: '内容不能为空'}]}
                               onClick={() => {
                                   setVisible1(true)
                               }}
                    >
                        <DatePicker
                            visible={visible1}
                            onClose={() => {
                                setVisible1(false)
                            }}
                            precision='second'
                            onConfirm={val => {
                                Toast.show(val.toString())
                            }}
                        >
                            {value => moment(value).format("yyyy-MM-DD HH:mm:ss")}
                        </DatePicker>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item
                        name='testResult'
                        label='检测结果'
                        rules={[{required: true, message: '内容不能为空'}]}
                        onClick={() => {
                            setVisible2(true)
                        }}>
                        <NormalPickerItem
                            columns={basicColumns}
                            visible={visible2}
                            setVisible={setVisible2}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Mask>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')}/>}
        >
            检测结果管理
        </NavBar>
        <div className="search">
            <SearchBar
                placeholder='搜索地址'
                style={{
                    '--background': '#ffffff',
                    '--height': '32px',
                    '--padding-left': '12px',
                }}
                onSearch={val => {
                    Toast.show(`你搜索了：${val}`)
                }}
            />

            <Button size='small'
                    color='primary'
                    onClick={() => {
                        navigate('/admin/result/add')
                    }}
            >
                添加检测结果
            </Button>
        </div>

        <PullToRefresh>
            {ResultArr !== undefined ? ResultArr.map((result, idx) =>
            <div className="container">
                <Card
                    key={idx}
                    className="task"
                    title={
                        <div style={{fontWeight: 'bold'}}>
                            <AntOutline style={{marginRight: '4px', color: '#1677ff'}}/>
                            {result.username}
                        </div>
                    }
                    style={{borderRadius: '16px'}}
                >
                    <div className="content">
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>检测人员：</span>
                            <span>{result.tester}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>检测时间：</span>
                            <span>{result.time}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>检测地点：</span>
                            <span>{result.address}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>检测结果：</span>
                            <span>{result.result==='negative'?"阴性":"阳性"}</span>
                        </div>
                    </div>
                    <div onClick={e => e.stopPropagation()} className="footer">
                        <Button
                            size='middle'
                            color='primary'
                            onClick={() => {
                                setVisible(true)
                                form.setFieldsValue({
                                    username: result.username,
                                    time: new Date(result.time),
                                    address: result.address,
                                    tester: result.tester,
                                    testResult: result.result==='negative'?"阴性":"阳性",
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
                                    Toast.show({
                                        icon: 'success',
                                        content: '删除成功',
                                        position: 'bottom',
                                    })
                                },
                            })}
                        >
                            删除检测结果
                        </Button>
                    </div>
                </Card>
            </div>) : <></>}
            <Divider> --End-- </Divider>
        </PullToRefresh>
    </AppContainer>
});


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
    margin-top: 12px;
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

  .search {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
  }

  .container {
    padding: 15px;
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