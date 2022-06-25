import { NavBar, Form, Input, Button, DatePicker, Toast, Picker, Space } from "antd-mobile";
import React, { useState } from "react";
import styled from "styled-components";
import { SendOutline } from "antd-mobile-icons";
import { useNavigate, useParams } from "react-router";
import moment from 'moment';
import { addTestResult } from "service/testResult";
import { NormalPickerItem } from "components/NormalPickerItem";

export const AddResult = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const { userId, time } = useParams<{ userId: string, time: string }>();
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [value, setValue] = useState<(string | null)[]>([])

    return <AppContainer>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')} />}
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
            onFinish={(values) => { 
                addTestResult(values).then(() => {
                    Toast.show('增加成功');
                    navigate(-1);
                }).catch(_ => { })
            }}
        >
            <Form.Header>添加检测结果</Form.Header>
            <Form.Item
                name='uid'
                label='用户ID'
                initialValue={userId}
                rules={[{ required: true, message: '请重新扫码，用户ID不能为空' }]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Header />
            <Form.Item
                name='time'
                label='采样时间'
                initialValue={time}
                rules={[{ required: true, message: '请重新扫码，采样时间不能为空' }]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Header />
            <Form.Item
                name='result'
                label='检测结果'
                rules={[{ required: true, message: '内容不能为空' }]}
                onClick={() => {
                    setVisible1(true)
                }}>
                <NormalPickerItem
                    columns={[
                        [
                            { label: '阳性', value: 'positive' },
                            { label: '阴性', value: 'negative' },
                        ],
                    ]}
                    visible={visible1}
                    setVisible={setVisible1}
                />
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