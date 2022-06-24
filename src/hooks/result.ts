import { useState } from "react";
import { getUserTestResult } from "service/testResult";

/**
 * 查询核酸检测记录
 */
export const useResultList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [resultList, setResultList] = useState<UserTestResult[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        try {
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

    return { resultList, hasMore, loadMore, refresh };
}