import React, { useEffect } from "react"
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 用于动态import的Fallback占位，显示一个顶部进度条和Loading文字
 */
export const FallbackLoading = React.memo(() => {
    useEffect(() => {
        nProgress.start();
        return () => { nProgress.done() };
    }, [])

    return <h1>Loading...</h1>
});