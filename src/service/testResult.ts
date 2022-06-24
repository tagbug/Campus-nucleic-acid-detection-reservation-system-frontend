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