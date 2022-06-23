/**
 * 采样点模型
 */
type Site = {
    id: number;
    address: string;
}

/**
 * 采样任务模型
 */
type SiteTask = {
    siteId: number;
    tester: string;
    timeStart: string;
    timeEnd: string;
    maxCapacity: number;
}