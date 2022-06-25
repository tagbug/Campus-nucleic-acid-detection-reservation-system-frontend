import { useEffect, useState } from "react";
import { getAdminTestResult, getAdminTestResultByAddress, getUserTestResult } from "service/testResult";

/**
 * 查询核酸检测记录
 */
export const useResultList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [resultList, setResultList] = useState<UserTestResult[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        const data = (await getUserTestResult(pageNum || 1, initPageSize)).data;
        if (clear) {
            setResultList(data.list);
        } else {
            // 注意防止重复请求导致的数据冗余，如果出现重复数据，用下面的代码
            // setAppointmentList(list =>
            //     [...list.filter(item => !data.list.find(i => i.time === item.time)), ...data.list]
            // );
            setResultList(list =>
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

    return { resultList, hasMore, loadMore, refresh };
}

/**
 * 管理员查询全部核酸检测记录
 */
export const useAdminResultList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [resultList, setResultList] = useState<UserTestResult[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>('');

    const load = async (pageNum: number, clear?: boolean) => {
        let data: PageData<UserTestResult>;
        if (keyword !== '') {
            data = (await getAdminTestResultByAddress(keyword, pageNum || 1, initPageSize)).data;
        } else {
            data = (await getAdminTestResult(pageNum || 1, initPageSize)).data;
        }
        if (clear) {
            setResultList(data.list);
        } else {
            // 注意防止重复请求导致的数据冗余，如果出现重复数据，用下面的代码
            // setAppointmentList(list =>
            //     [...list.filter(item => !data.list.find(i => i.time === item.time)), ...data.list]
            // );
            setResultList(list =>
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

    useEffect(() => { refresh() }, [keyword]);

    return { setKeyword, resultList, hasMore, loadMore, refresh };
}