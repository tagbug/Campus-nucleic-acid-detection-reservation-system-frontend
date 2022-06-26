import { NavBar, Form, Input, Button, Toast } from "antd-mobile";
import React, { useState } from "react";
import styled from "styled-components";
import { SendOutline } from "antd-mobile-icons";
import { useNavigate, useParams } from "react-router";
import { addTask } from "service/task";
import { DatePickerItem } from "components/DatePickerItem";

export const AddTask = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const { siteId, address } = useParams<{ siteId: string, address: string }>();
    const now = new Date()
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    return <AppContainer>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')} />}
        >
            添加采样任务
        </NavBar>
        <Form
            layout='horizontal'
            mode='card'
            footer={
                <Button block type='submit' color='primary' size='large'>
                    添加
                </Button>
            }
            onFinish={values => {
                addTask({
                    tester: values.tester,
                    siteId: Number(siteId),
                    maxCapacity: Number(values.maxCapacity),
                    timeEnd: values.timeEnd,
                    timeStart: values.timeStart
                }).then(_ => {
                    Toast.show('添加成功')
                    navigate("/admin/site/" + siteId + '&' + address)
                }).catch(_ => { });
            }}
        >
            <Form.Header>添加采样任务</Form.Header>
            <Form.Item
                name='tester'
                label='采样人员'
                rules={[{ required: true, message: '内容不能为空' }]}
            >
                <Input placeholder='请输入采样人员姓名' />
            </Form.Item>
            <Form.Header />
            <Form.Item name='address' label='地址' help='采样地点' initialValue={address}>
                <Input disabled={true} value={address} />
            </Form.Item>
            <Form.Item name='siteId' hidden initialValue={siteId}>
                <Input value={siteId} />
            </Form.Item>
            <Form.Header />
            <Form.Item name='timeStart'
                label='开始时间'
                rules={[{ required: true, message: '内容不能为空' }]}
                onClick={() => {
                    setVisible(true)
                }}
                initialValue={now}
            >
                <DatePickerItem defaultValue={now} visible={visible} setVisible={setVisible} />
            </Form.Item>
            <Form.Header />
            <Form.Item name='timeEnd'
                label='结束时间'
                rules={[{ required: true, message: '内容不能为空' }]}
                onClick={() => {
                    setVisible1(true)
                }}
                initialValue={now}
            >
                <DatePickerItem defaultValue={now} visible={visible1} setVisible={setVisible1} />
            </Form.Item>
            <Form.Header />
            <Form.Item name='maxCapacity' label='日最多检测量' rules={[{ required: true, message: '内容不能为空' }]}>
                <Input placeholder='请输入日最多检测量' />
            </Form.Item>
        </Form>
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

  .footer {
    padding: 12px 6px 6px 6px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
  }

`