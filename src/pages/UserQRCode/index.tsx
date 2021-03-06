import { Button, Card, InfiniteScroll, Modal, PullToRefresh, Space, Tag, Toast } from "antd-mobile";
import {
    SystemQRcodeOutline,
    CloseCircleOutline
} from "antd-mobile-icons";
import { useAppointmentList } from "hooks/appointment";
import React from "react";
import { useNavigate } from "react-router";
import { cancelAppointment } from "service/appointment";
import styled from "styled-components";
import { QRCodeSVG } from 'qrcode.react';

const initPageSize = 5;

export const UserQRCode = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const {
        hasMore,
        loadMore,
        appointmentList,
        refresh
    } = useAppointmentList(initPageSize);


    const appointmentCards = appointmentList.map(appointment =>
        <Card
            title={<Space>
                <div>{appointment.name}</div>
                <Tag color="success" round>已预约</Tag>
            </Space>}
            key={appointment.time}
        >
            <Space direction="vertical" block>
                <Space direction="vertical" block>
                    <div>身份证：{appointment.cardId.substring(0, 4) + '*****' + appointment.cardId.substring(14, 18)}</div>
                    <div>预约时间：{appointment.time}</div>
                    <div>预约地点：{appointment.address}</div>
                </Space>
                <Space align="center" justify="end" block>
                    <Button color="success" shape="rounded" onClick={() => {
                        Modal.show({
                            closeOnMaskClick: true,
                            content: <Space block align="center" justify="center">
                                <QRCodeSVG
                                    value={JSON.stringify({uid: appointment.uid, time: appointment.time})}
                                />
                            </Space>
                        })
                    }}>
                        <SystemQRcodeOutline /> 展示二维码
                    </Button>
                    <Button color="danger" shape="rounded" onClick={() => {
                        cancelAppointment(appointment.time)
                            .then(() => { Toast.show('取消成功'); refresh(); }).catch(_ => { });
                    }}>
                        <CloseCircleOutline /> 取消预约
                    </Button>
                </Space>
            </Space>
        </Card>);

    return <Container>
        <Main>
            <PullToRefresh onRefresh={refresh}>
                <Space block direction="vertical">
                    {appointmentCards}
                </Space>
                <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasMore}
                />
            </PullToRefresh>
        </Main>
        <div className="bottom-button">
            <Button
                color="success"
                size="middle"
                style={{ flex: 1 }}
                onClick={() => navigate('/user/appointment')}
            >
                核酸检测预约
            </Button>
        </div>
    </Container>;
});

const Container = styled.div`
    min-height: 100%;
    
    .bottom-button {
        display: flex;
        position: fixed;
        bottom: 48px;
        width: 100%;
        padding: 16px;
    }
`

const Main = styled.div`
    padding: 16px;
    margin-bottom: 36px;
`