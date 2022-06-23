import { Button, Form, Input } from "antd-mobile";
import React from "react";

export const Login = React.memo(() => {
    return (
        <Form
            layout="horizontal"
            mode="card"
            footer={
                <Button block color="primary" type="submit" >
                    登录
                </Button>
            }
        >
            <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true }]}>
                <Input placeholder="请输入密码" />
            </Form.Item>
        </Form>
    )
})