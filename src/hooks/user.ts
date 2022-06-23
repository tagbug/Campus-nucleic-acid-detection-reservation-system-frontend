import { useEffect, useState } from "react"
import { GetUserInfo } from "service/user";

/**
 * 获取用户信息
 */
export const useUserInfo = (uid: number | undefined, callback?: (userInfo: UserInfo) => any) => {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    const refresh = () => {
        if (uid) {
            GetUserInfo(uid).then(res => {
                setUserInfo(res.data);
                callback?.(res.data);
            }).catch(_ => { });
        }
    };

    useEffect(refresh, [uid]);

    return { userInfo, refresh };
}