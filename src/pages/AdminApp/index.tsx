import { Divider, List, NavBar, Space, TabBar, Tag } from "antd-mobile";
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
    TeamFill,
    SendOutline,
    ExclamationCircleOutline,
    SetOutline,
} from 'antd-mobile-icons'
import { TabBarItemProps } from "antd-mobile/es/components/tab-bar";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import styled from "styled-components";

export const AdminApp = React.memo(() => {
    // hooks
    const navigate = useNavigate();

    return <AppContainer>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')} />}
        >
            后台管理
        </NavBar>
        <div className="user">
            <TeamFill fontSize="32px" />
            <Space className="desc" >
                <div>系统管理员</div>
                <Tag
                    color="warning"
                    fill="outline"
                    style={{ '--background-color': '#fde6d2' }}
                >超级管理员</Tag>
            </Space>
        </div>
        <Space block align="center" justify="around" className="panel">
            <Space direction="vertical" align="center">
                <div>-</div>
                <div>预约点</div>
            </Space>
            <Space direction="vertical" align="center">
                <div>-</div>
                <div>总预约数</div>
            </Space>
            <Space direction="vertical" align="center">
                <div>-</div>
                <div>用户</div>
            </Space>
        </Space>
        <List header="功能管理">
            <List.Item onClick={()=>navigate('./site')}>预约点管理</List.Item>
            <List.Item onClick={()=>navigate('./task')}>预约任务管理</List.Item>
            <List.Item onClick={()=>navigate('./result')}>检测结果管理</List.Item>
        </List>
        <List style={{ 'marginTop': '16px' }}>
            <List.Item prefix={<ExclamationCircleOutline />}>关于我们</List.Item>
            <List.Item prefix={<MessageOutline />}>联系我们</List.Item>
            <List.Item prefix={<SetOutline />}>设置</List.Item>
        </List>
    </AppContainer>
});

const AppContainer = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;

    .topBar,
    .user {
        background-color: #2499f2;
        color: #fff;
    }

    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 32px;
    }

    .user > .desc {
        flex: 1;
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
    }

    .panel {
        background-color: #fff;
    }

    .panel > * {
        padding: 16px;
    }
` 