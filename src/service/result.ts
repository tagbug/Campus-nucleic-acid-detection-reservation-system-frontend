import request from "./axios"


export const addResult = (task:TaskRequest) => {
    return request<SiteTask>({
        url: '/task/add',
        method: 'POST',
        data:task
    })
}


export const updateTask = (task:TaskRequest) => {
    return request<SiteTask>({
        url: '/task/update',
        method: 'POST',
        data:task
    })
}

export const deleteTask = (siteId:number,timeStart:string) => {
    return request<SiteTask>({
        url: '/task/delete',
        method: 'POST',
        params:{siteId,timeStart}
    })
}