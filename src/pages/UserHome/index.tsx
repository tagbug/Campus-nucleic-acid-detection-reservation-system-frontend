import { Button, Form, Input, Modal, Space, Tag } from "antd-mobile";
import {
    TeamFill
} from "antd-mobile-icons";
import { useUserInfo } from "hooks/user";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "redux/store";
import styled from "styled-components";
import { scanQR, testedBase64 } from 'components/QRCodeReader';

export const UserHome = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    let userCache = useSelector<RootState, User | null>(state => state.user.userCache);
    const [form] = Form.useForm();
    const { userInfo } = useUserInfo(userCache?.id, info => form.setFieldsValue({
        cardId: info ? info.cardId : '-',
        sex: info ? (info.sex === 'male' ? '男' : '女') : '-'
    }));

    return <Container>
        <Space block className="user" align="center">
            <TeamFill fontSize="32px" />
            <Space className="desc" >
                <div>{userInfo?.name}</div>
                <Tag
                    color="success"
                    fill="outline"
                    style={{ '--background-color': '#c8f7c5' }}
                >用户</Tag>
            </Space>
            <Button color="success" size="small" onClick={() => {
                scanQR(testedBase64).then(res => alert(res));
            }}>扫码测试</Button>
        </Space>
        <Form layout="horizontal" form={form}>
            <Form.Header>个人信息</Form.Header>
            <Form.Item name="cardId" label="身份证号">
                <Input disabled />
            </Form.Item>
            <Form.Item name="sex" label="性别">
                <Input disabled />
            </Form.Item>
        </Form>
        <div className="logout-button">
            <Button
                color="danger"
                size="middle"
                style={{ flex: 1 }}
                onClick={() => navigate('/logout')}
            >
                退出登录
            </Button>
        </div>
    </Container>
});

const Container = styled.div`
    min-height: 100%;

    .user {
        padding: 32px;
        background-color: #2499f2;
        color: #fff;
    }

    .user .desc {
        flex: 1;
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
    }
    
    .logout-button {
        display: flex;
        position: absolute;
        bottom: 64px;
        width: 100%;
        padding: 16px;
    }
`