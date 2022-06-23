import request from "./axios"


/**
 * 用户登录接口
 * @param username 用户名
 * @param password 密码
 */
export const UserLogin = (username: string, password: string) => {
    return request<User>({
        url: '/user/login',
        method: 'POST',
        params: { username, password }
    })
}

/**
 * 用户注册接口
 * @param username 用户名
 * @param password 密码
 */
export const UserRegister = (username: string, password: string) => {
    return request<User>({
        url: '/user/register',
        method: 'POST',
        data: { username, password }
    })
}

/**
 * 用户更新密码接口
 * @param oriPassword 原密码
 * @param newPassword 新密码
 */
export const UserUpdatePassword = (oriPassword: string, newPassword: string) => {
    return request<User>({
        url: '/user/updatePassword',
        method: 'POST',
        params: { oriPassword, newPassword }
    })
}

/**
 * 用户信息获取接口
 * @param uid 用户id
 */
export const GetUserInfo = (uid: number) => {
    return request<UserInfo>({
        url: '/user/info',
        method: 'GET',
        params: { uid }
    })
}