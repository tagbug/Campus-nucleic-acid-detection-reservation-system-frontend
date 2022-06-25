import {useEffect, useState} from "react";
import {getSiteCount, getTaskList} from "service/task";
import {getAppointmentCount} from "service/appointment";

/**
 * 查询采样任务
 */
export const useTaskList = (initPageSize: number,siteId:number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [taskList, setTaskList] = useState<SiteTask[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        try {
            const data = (await getTaskList(pageNum || 1, initPageSize,siteId)).data;
            if (clear) {
                setTaskList(data.list);
            } else {
                setTaskList(list =>
                    [...list, ...data.list]
                );
            }
            setHasMore(data.hasNextPage);
        } catch (e) { }
    }

    const loadMore = async () => {
        await load(pageNum + 1);
        setPageNum(pageNum + 1);
    }

    const refresh = async () => {
        await load(1, true);
        setPageNum(1);
    }

    return { taskList, hasMore, loadMore, refresh };
}

/**
 * 查询预约点总数
 */
export const useSiteCount = () => {
    const [count,setCount] = useState<number>(0);

    const refresh = () => {
        getSiteCount().then(res => {
            setCount(res.data)
        }).catch(_ => { });
    }
    useEffect(refresh, []);
    return { count };
}