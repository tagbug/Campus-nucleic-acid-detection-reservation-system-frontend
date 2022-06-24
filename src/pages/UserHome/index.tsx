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
import { scanQR } from 'components/QRCodeReader';

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
                scanQR('data:image/png;base64,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').then(res => alert(res));
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