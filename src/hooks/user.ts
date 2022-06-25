import {useEffect, useState} from "react"
import {getUserCount, GetUserInfo} from "service/user";
import {getAppointmentCount} from "service/appointment";

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
            }).catch(_ => {
            });
        }
    };

    useEffect(refresh, [uid]);

    return {userInfo, refresh};
}

/**
 * 查询用户总数
 */
export const useAppointmentCount = () => {
    const [count, setCount] = useState<number>(0);

    const refresh = () => {
        getUserCount().then(res => {
            setCount(res.data)
        }).catch(_ => {
        });
    }

    useEffect(refresh, []);

    return {count};
}