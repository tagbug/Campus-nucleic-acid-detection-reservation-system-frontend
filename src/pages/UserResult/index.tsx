import { Button, Card, InfiniteScroll, PullToRefresh, Space, Tag } from "antd-mobile";
import {
    RightOutline} from "antd-mobile-icons";
import { useResultList } from "hooks/result";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const initPageSize = 5;

export const UserResult = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const {
        hasMore,
        loadMore,
        resultList,
        refresh
    } = useResultList(initPageSize);


    const resultCards = resultList.map(result =>
        <Card
            title={<Space>
                <div>{result.name}</div>
                {result.result === 'negative' ?
                    <Tag color="success" round>阴性</Tag> :
                    <Tag color="danger" round>阳性</Tag>}
            </Space>}
            extra={<RightOutline />}
            key={result.time}
        >
            <Space direction="vertical" block>
                <Space direction="vertical" block>
                    <div>身份证：{result.cardId.substring(0, 4) + '*****' + result.cardId.substring(14, 18)}</div>
                    <div>采样时间：{result.time}</div>
                    <div>采样地点：{result.address}</div>
                    <div>采样人：{result.tester}</div>
                </Space>
            </Space>
        </Card>);

    return <Container>
        <Main>
            <PullToRefresh onRefresh={refresh}>
                <Space block direction="vertical">
                    {resultCards}
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