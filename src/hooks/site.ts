import { useEffect, useState } from "react";
import { getAllSiteByAddress, getAllSiteList } from "service/site";

/**
 * 查询采样点
 */
export const useSiteList = (initPageSize: number) => {
    const [pageNum, setPageNum] = useState<number>(0);
    const [siteList, setSiteList] = useState<Site[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>('');

    const load = async (pageNum: number, clear?: boolean) => {
        let data: PageData<Site>;
        if (keyword !== '') {
            data = (await getAllSiteByAddress(keyword, pageNum || 1, initPageSize)).data;
        } else {
            data = (await getAllSiteList(pageNum || 1, initPageSize)).data;
        }
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

    // eslint-disable-next-line
    useEffect(() => { refresh() }, [keyword]);

    return { setKeyword, siteList, hasMore, loadMore, refresh };
}