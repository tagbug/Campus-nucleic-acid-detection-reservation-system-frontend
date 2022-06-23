/**
 * 用户模型
 */
type User = {
    id: number;
    username: string;
    password: string;
    type: 'admin' | 'user';
}

/**
 * 用户信息模型
 */
type UserInfo = {
    uid: number;
    name: string;
    cardId: string;
    sex: 'male' | 'female';
}