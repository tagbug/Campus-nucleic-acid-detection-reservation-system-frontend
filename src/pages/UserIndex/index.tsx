import { Space } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export const UserIndex = React.memo(() => {
    const navigate = useNavigate();

    return <Container>
        <div className="card-container">
            <Space className="card blue" direction="vertical" onClick={() => navigate('/user/appointment')}>
                <div style={{ fontSize: '22px' }}>核酸检测预约</div>
                <div>填写个人信息进行核酸检测</div>
            </Space>
            <Space className="card orange" direction="vertical" onClick={() => navigate('/user/qrcode')}>
                <div style={{ fontSize: '22px' }}>预约二维码查看</div>
                <div>核酸检测登记时出示二维码</div>
            </Space>
            <Space className="card green" direction="vertical" onClick={() => navigate('/user/result')}>
                <div style={{ fontSize: '22px' }}>核酸检测记录查询</div>
                <div>查询个人核酸检测记录</div>
            </Space>
        </div>
    </Container>
});

const Container = styled.div`
    min-height: 100%;
    background-image: url("http://36.156.31.72:8888/pcr/h5/static/img/banner_test.4c9912f6.png");
    background-size: contain;
    background-repeat: no-repeat;

    .card-container {
        padding-top: 220px;
    }

    .card {
        position: relative;
        display: flex;
        padding: 20px;
        width: calc(100vw - 36px);
        z-index: 1;
        border-radius: 6px;
        margin: 0 18px 18px;
        background-image: url("http://36.156.31.72:8888/pcr/h5/static/img/list_bg.b18935fc.png");
        background-size: cover;
        background-position: 50%;
        color: #fff;
        box-shadow: 0px 0px 20px 0px rgb(41 121 255 / 10%);
    }

    .card::after {
        content: "";
        position: absolute;
        z-index: -1;
        background-color: inherit;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: -10%;
        border-radius: 5px;
        opacity: .2;
        transform: scale(.9);
    }

    .blue {
        background-color: #0081ff;
    }

    .orange {
        background-color: #f37b1d;
    }

    .green {
        background-color: #1cbbb4;
    }
`