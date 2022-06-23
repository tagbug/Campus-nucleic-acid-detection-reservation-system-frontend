/**
 * 服务端返回JSON
 */
type ServerResJSON<T = undefined> = {
    status: Number, // 状态码
    msg: string,    // 提示信息
    data: T, // 自定义携带数据（可选），默认为Object类型
}

/**
 * 分页data
 */
type PageData<T = Object> = {
    total: number;
    list: T[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}