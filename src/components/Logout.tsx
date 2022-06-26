import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { clearUserCache } from "redux/userSlice";

/**
 * 退出登录，清除登录信息并跳转到登录页面
 */
export const Logout = () => {
    // 清除登录信息
    const dispatch = useDispatch();
    dispatch(clearUserCache(null));

    return <>
        <Navigate to="/login" />;
    </>
};