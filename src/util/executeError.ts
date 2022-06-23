/*
 * @Author: TagBug 1242135295@qq.com
 * @Date: 2022-05-08 12:52:44
 * @LastEditors: TagBug 1242135295@qq.com
 * @LastEditTime: 2022-05-19 13:12:28
 * @FilePath: \myroom-admin\src\util\executeError.ts
 * @Description: 这里是服务层的统一错误定义
 */
/**
 * 服务器执行请求失败的Error
 */
export default class ExecuteError<T = Object> extends Error {
    res?: ServerResJSON<T>;
    status?: Number;

    /**
     * @param msg 要告知用户的错误信息
     * @param res 服务器返回的JSON
     */
    constructor(msg: string, res?: ServerResJSON<T>) {
        super('' + msg);
        this.res = res;
        this.status = res?.status || -1;
    }

    valueOf() {
        return {
            message: this.message,
            res: this.res,
            status: this.status,
        }
    }
};