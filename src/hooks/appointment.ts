import { useEffect, useState } from "react"
import { getAppointmentCount, getAppointmentList, getSiteList, getSiteTimeRange } from "service/appointment";

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
 * 查询预约数总数
 */
export const useAppointmentCount = () => {
    const [count, setCount] = useState<number>(0);

    const refresh = () => {
        getAppointmentCount().then(res => {
            setCount(res.data)
        }).catch(_ => { });
    }

    useEffect(refresh, []);

    return { count };
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


/**
 * 查询完整预约记录
 */
export const useAppointmentList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [appointmentList, setAppointmentList] = useState<AppointmentInfo[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        const data = (await getAppointmentList(pageNum || 1, initPageSize)).data;
        if (clear) {
            setAppointmentList(data.list);
        } else {
            // 注意防止重复请求导致的数据冗余，如果出现重复数据，用下面的代码
            // setAppointmentList(list =>
            //     [...list.filter(item => !data.list.find(i => i.time === item.time)), ...data.list]
            // );
            setAppointmentList(list =>
                [...list, ...data.list]
            );
        }
        setHasMore(data.hasNextPage);
    }

    const loadMore = async () => {
        try {
            await load(pageNum + 1);
            setPageNum(pageNum + 1);
        } catch (e) { }
    }

    const refresh = async () => {
        try {
            await load(1, true);
            setPageNum(1);
        } catch (e) { }
    }

    return { appointmentList, hasMore, loadMore, refresh };
}