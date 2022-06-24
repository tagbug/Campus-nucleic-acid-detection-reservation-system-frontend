import {useState} from "react";
import {getAllSiteList} from "service/site";

/**
 * 查询采样点
 */
export const useSiteList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [siteList, setSiteList] = useState<Site[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const load = async (pageNum: number, clear?: boolean) => {
        try {
            const data = (await getAllSiteList(pageNum || 1, initPageSize)).data;
            if (clear) {
                setSiteList(data.list);
            } else {
                setSiteList(list =>
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

    return { siteList, hasMore, loadMore, refresh };
}