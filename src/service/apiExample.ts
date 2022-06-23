/*
 * @Author: TagBug 1242135295@qq.com
 * @Date: 2022-05-19 12:52:13
 * @LastEditors: TagBug 1242135295@qq.com
 * @LastEditTime: 2022-05-19 16:45:56
 * @FilePath: \myroom-admin\src\service\apiExample.ts
 * @Description: api接口写法参考
 */

import { Toast } from "antd-mobile"
import ExecuteError from "util/executeError"
import request from "./axios"

/**
 * 注意request接收泛型参数，表示ServerResJSON.data的类型，当接口无返回data时，可以省略，这会让data类型为undefined
 * request第二个参数接收自定义的错误提示函数，若不传则使用默认的Toast.show
 */
export const ApiDemo = (username: string, password: string) => {
    return request<User>({
        url: '/user/login',
        method: 'POST',
        params: { username, password }
    }, Toast.show)
}

/**
 * 调用参考
 */
async () => {
    try {
        // try-catch块内写正常的业务逻辑
        // axios是会抛出异常的，注意捕获，以免导致渲染逻辑崩溃
        let user: User = (await ApiDemo('admin', 'admin')).data;
        // dispatch(setUserCache(user));
    } catch (e) {
        // 这里写因各种原因接口调用失败的 补救措施，也可以不写，默认会用用message.error提示错误，并在console打印
        switch ((e as ExecuteError).status) {
            case -1:
            // 可能网络错误
            case 404:
            // 没找到
            case 500:
            // 服务器内部错误
            default:
            // 其他的...
        }
    }
}