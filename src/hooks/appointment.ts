import { useEffect, useState } from "react"
import { getSiteList, getSiteTimeRange } from "service/appointment";

/**
 * 查询可用采样点
 */
export const useSiteList = () => {
    const [siteList, setSiteList] = useState<Site[]>([]);

    const refresh = () => {
        getSiteList().then(res => {
            setSiteList(res.data);
        }).catch(_ => { });
    }

    useEffect(refresh, []);

    return { siteList, refresh };
}

/**
 * 查询采样点可用采样时间段
 */
export const useSiteTimeRange = (siteId?: number) => {
    const [timeRange, setTimeRange] = useState<string[]>([]);

    const refresh = () => {
        if (siteId) {
            getSiteTimeRange(siteId).then(res => {
                setTimeRange(res.data);
            }).catch(_ => { });
        }
    }

    useEffect(refresh, [siteId]);

    return { timeRange, refresh };
}