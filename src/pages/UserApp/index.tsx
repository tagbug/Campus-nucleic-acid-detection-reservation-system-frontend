import { NavBar, TabBar } from "antd-mobile";
import {
    AppOutline,
    UserOutline,
    SendOutline
} from 'antd-mobile-icons'
import React from "react";
import { Outlet, useNavigate } from "react-router";
import styled from "styled-components";

export const UserApp = React.memo(() => {
    // hooks
    const navigate = useNavigate();

    return <AppContainer>
        <div className="topBar">
            <NavBar
                onBack={() => navigate(-1)}
                right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')} />}
            >核酸检测预约系统</NavBar>
        </div>
        <div className="body">
            <Outlet />
        </div>
        <div className="bottom">
            <TabBar activeKey={global.location.pathname} onChange={v => navigate(v)}>
                {tabItems.map(item => <TabBar.Item {...item} />)}
            </TabBar>
        </div>
    </AppContainer>
});

const tabItems = [
    {
        key: '/user/index',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        key: '/user/home',
        title: '个人中心',
        icon: <UserOutline />,
    }
]

const AppContainer = styled.div`
    min-height: 100%;
    background-color: #f5f5f5;

    .topBar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        border-bottom: 1px solid var(--adm-color-border);
        background-color: #f5f5f5;
    }

    .body {
        min-height: 100%;        
        padding-top: 46px;
        padding-bottom: 50px;
    }

    .bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 10;
        border-top: 1px solid var(--adm-color-border);
        background-color: #f5f5f5;
    }
` 