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
            <TabBar onChange={v => navigate(v)}>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;

    .topBar {
        flex: 0;
        border-bottom: 1px solid var(--adm-color-border);
    }

    .body {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bottom {
        flex: 0;
        border-top: 1px solid var(--adm-color-border);
    }
` 