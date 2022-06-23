import React from 'react';
import { useNavigate } from 'react-router';
import { Button, ErrorBlock } from 'antd-mobile';

/**
 * 路由不匹配时的失败占位
 */
export const NotFound = React.memo(() => {
    const navigate = useNavigate();

    return (
        <ErrorBlock
            description="您访问的页面不存在"
        >
            <Button color='primary' onClick={() => navigate(-1)} >
                返回
            </Button>
        </ErrorBlock>
    );
});
