import request from "./axios"

/**
 * 增加预约点
 * @param task
 */
export const addTask = (task:TaskRequest) => {
    return request<SiteTask>({
        url: '/task/add',
        method: 'POST',
        data:task
    })
}

/**
 * 更新预约点
 * @param task
 */
export const updateTask = (task:TaskRequest) => {
    return request<SiteTask>({
        url: '/task/update',
        method: 'POST',
        data:task
    })
}

/**
 * 删除预约点
 * @param siteId
 * @param timeStart
 */
export const deleteTask = (siteId:number,timeStart:string) => {
    return request<SiteTask>({
        url: '/task/delete',
        method: 'POST',
        params:{siteId,timeStart}
    })
}

/**
 * 预约点列表
 * @param pageNum
 * @param pageSize
 * @param siteId
 */
export const getTaskList = (pageNum:number,pageSize:number,siteId:number) => {
    return request<PageData<SiteTask>>({
        url: '/task/queryList',
        method: 'GET',
        params: {pageNum,pageSize,siteId}
    })
}

/**
 * 预约点总数
 */
export const getSiteCount = () => {
    return request<number>({
        url: '/site/count',
        method: 'GET',
    });
}