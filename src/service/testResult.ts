import request from "./axios";

/**
 * 用户分页查询检测结果
 * @param pageNum 页码
 * @param pageSize 每页数量
 */
export const getUserTestResult = (pageNum: number, pageSize: number) => {
    return request<PageData<UserTestResult>>({
        url: '/result/queryList',
        method: 'GET',
        params: { pageNum, pageSize }
    });
}

/**
 * 管理员分页查询检测结果
 */
export const getAdminTestResult = (pageNum: number, pageSize: number) => {
    return request<PageData<UserTestResult>>({
        url: '/result/adminQueryList',
        method: 'GET',
        params: { pageNum, pageSize }
    });
}

/**
 * 管理员根据地址模糊查询检测结果
 */
export const getAdminTestResultByAddress = (address: string, pageNum: number, pageSize: number) => {
    return request<PageData<UserTestResult>>({
        url: '/result/adminQueryListByAddress',
        method: 'GET',
        params: { address, pageNum, pageSize }
    });
}


/**
 * 管理员增加检测结果
 */
export const addTestResult = (data: TestResult) => {
    return request({
        url: '/result/add',
        method: 'POST',
        data
    });
}

/**
 * 管理员修改检测结果
 */
export const updateTestResult = (data: TestResult) => {
    return request({
        url: '/result/update',
        method: 'POST',
        data
    });
}

/**
 * 管理员根据uid和time删除检测结果
 */
export const deleteTestResult = (uid: number, time: string) => {
    return request({
        url: '/result/delete',
        method: 'POST',
        params: { uid, time }
    });
}
