import { Button, Form, Input, Space, Toast } from "antd-mobile";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserCache } from "redux/userSlice";
import { UserLogin, UserRegister } from "service/user";
import styled from "styled-components";

export const Login = React.memo(() => {
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [opType, setOpType] = React.useState<'login' | 'register'>("login");

    return <Container>
        <Space block align="center" justify="center">
            <h1>校园核酸预约检测系统</h1>
        </Space>
        <Form
            layout="horizontal"
            mode="card"
            onFinish={(values) => {
                if (opType === 'login') {
                    UserLogin(values.username, values.password).then(res => {
                        dispatch(setUserCache(res.data));
                        Toast.show('登录成功');
                        navigate("/");
                    }).catch(_ => { });
                } else {
                    UserRegister(values.username, values.password).then(res => {
                        dispatch(setUserCache(res.data));
                        Toast.show('注册成功，已自动登录');
                        navigate("/");
                    }).catch(_ => { });
                }
            }}
        footer={<>
            <Space block justify="end" className="switch">
                {opType === 'login' ?
                    <>没有账号？<span className="primary" onClick={() => setOpType('register')} >点击注册</span></> :
                    <>已有账号？<span className="primary" onClick={() => setOpType('login')} >点击登录</span></>
                }
            </Space>
            <Button block color="primary" type="submit" >
                {opType === 'login' ? '登录' : '注册'}
            </Button>
        </>}
        >
        {opType === 'login' ? loginItems : registerItems}
    </Form>
    </Container >
})

const loginItems = <>
    <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" autoComplete="username" />
    </Form.Item>
    <Form.Item label="密码" name="password" rules={[{ required: true }]}>
        <Input type="password" placeholder="请输入密码" autoComplete="current-password" />
    </Form.Item>
</>

const registerItems = <>
    <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" autoComplete="username" />
    </Form.Item>
    <Form.Item label="密码" name="password" rules={[{ required: true }]}>
        <Input type="password" placeholder="请输入密码" autoComplete="new-password" />
    </Form.Item>
    <Form.Item label="确认密码" name="confirm" rules={[
        { required: true },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致');
            }
        })
    ]}>
        <Input type="password" placeholder="请再次输入密码" autoComplete="new-password" />
    </Form.Item>
</>

const Container = styled.div`
    .switch {
        margin-bottom: 16px;
    }

    .primary {
        color: var(--adm-color-primary);
    }
`