import request from "./axios"



export const addSite = (address:string) => {
    return request<boolean>({
        url: '/site/add',
        method: 'POST',
        data: { address }
    })
}


export const deleteSite = (siteId:number) => {
    return request<Site>({
        url: '/site/delete',
        method: 'POST',
        params: {siteId}
    })
}

export const getAllSiteList = (pageNum:number,pageSize:number) => {
    return request<PageData<Site>>({
        url: '/site/queryList',
        method: 'GET',
        params: {pageNum,pageSize}
    })
}

export const getAllSiteByAddress = (address:string,pageNum:number,pageSize:number) => {
    return request<PageData<Site>>({
        url: '/site/findByAddress',
        method: 'GET',
        params: {address,pageNum,pageSize}
    })
}