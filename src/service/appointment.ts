import request from './axios';

/**
 * 查询可用采样点
 */
export const getSiteList = () => { 
    return request<Site[]>({
        url: '/site/queryAll',
        method: 'GET',
    });
}

/**
 * 查询采样点可用采样时间段
 */
export const getSiteTimeRange = (siteId: number) => { 
    return request<string[]>({
        url: '/site/availableTime',
        method: 'GET',
        params: { siteId }
    });
}

/**
 * 新增预约记录
 */
export const addAppointment = (appointment: Appointment) => { 
    return request<Appointment>({
        url: '/appointment/add',
        method: 'POST',
        data: appointment
    });
}

/**
 * 取消预约
 */
export const cancelAppointment = (time: string) => { 
    return request<Appointment>({
        url: '/appointment/delete',
        method: 'POST',
        params: { time }
    });
}

/**
 * 分页查询完整预约记录
 */
export const getAppointmentList = (pageNum: number, pageSize: number) => { 
    return request<PageData<AppointmentInfo>>({
        url: '/appointment/queryFullList',
        method: 'GET',
        params: { pageNum, pageSize }
    });
}

/**
 * 预约总数
 */
export const getAppointmentCount = () => {
    return request<number>({
        url: '/appointment/count',
        method: 'GET',
    });
}