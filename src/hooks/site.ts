import { useState } from "react";
import { getAllSiteList } from "service/site";

/**
 * 查询采样点
 */
export const useSiteList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [siteList, setSiteList] = useState<Site[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        const data = (await getAllSiteList(pageNum || 1, initPageSize)).data;
        if (clear) {
            setSiteList(data.list);
        } else {
            setSiteList(list =>
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

    return { siteList, hasMore, loadMore, refresh };
}