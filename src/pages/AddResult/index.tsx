import {NavBar, Form, Input, Button, DatePicker, Toast, Picker,Space} from "antd-mobile";
import React, {useState} from "react";
import styled from "styled-components";
import {SendOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router";
import moment from 'moment';

export const AddResult = React.memo(() => {
// hooks
    const navigate = useNavigate();
    const now = new Date()
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [value, setValue] = useState<(string | null)[]>([])
    const basicColumns = [
        [
            {label: '阳性', value: 'positive'},
            {label: '阴性', value: 'negative'},
        ],
    ]
    return <AppContainer>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')}/>}
        >
            添加检测结果
        </NavBar>
        <Form
            layout='horizontal'
            mode='card'
            footer={
                <Button block type='submit' color='primary' size='large'>
                    添加
                </Button>
            }
        >
            <Form.Header>添加检测结果</Form.Header>
            <Form.Item
                name='username'
                label='采样人员'
                rules={[{required: true, message: '内容不能为空'}]}
            >
                <Input placeholder='请输入采样人员姓名'/>
            </Form.Item>
            <Form.Header/>
            <Form.Item name='address' label='采样地点' help='采样地点'>
                <Input placeholder='请输入采样点'/>
            </Form.Item>
            <Form.Header/>
            <Form.Item name='time'
                       label='检测时间'
                       rules={[{required: true, message: '内容不能为空'}]}
                       onClick={() => {
                           setVisible(true)
                       }}
            >
                <DatePicker
                    visible={visible}
                    onClose={() => {
                        setVisible(false)
                    }}
                    precision='second'
                    defaultValue={now}
                    onConfirm={val => {
                        Toast.show(val.toString())
                    }}
                >
                    {value => moment(value).format("yyyy-MM-DD HH:mm:ss")}
                </DatePicker>
            </Form.Item>
            <Form.Header/>
            <Form.Item
                name='result'
                label='检测结果'
                rules={[{required: true, message: '内容不能为空'}]}
                onClick={() => {
                    setVisible1(true)
                }}>
                <Picker
                    columns={basicColumns}
                    visible={visible1}
                    onClose={() => {
                        setVisible1(false)
                    }}
                    value = {value}
                    onConfirm={v => {
                        setValue(v)
                    }}
                >
                {(items) => {
                    return (
                        <Space align='center'>
                            {items.every(item => item === null)
                                ? '未选择'
                                : items.map(item => item?.label ?? '未选择')}
                        </Space>
                    )
                }}
                </Picker>
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