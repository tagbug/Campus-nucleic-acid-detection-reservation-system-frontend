import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "redux/store";

/**
 * 检查登录状态
 */
export const LoginRedirect = () => {
    // TODO: 这里检查逻辑比较简单，日后修改
    let userCache = useSelector<RootState, User | null>(state => state.user.userCache);
    console.log({ userCache: userCache })

    return <Navigate to={userCache ? (userCache.type === 'admin' ? '/admin' : '/user') : '/login'} />
}