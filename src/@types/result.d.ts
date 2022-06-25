/**
 * 检测结果模型
 */
type TestResult = {
    uid: number,
    username: string;
    time: string;
    address: string;
    tester: string;
    result: 'negative' | 'positive';
}

/**
 * 用户检测结果模型
 */
type UserTestResult = {
    uid: number,
    name: string;
    cardId: string;
    time: string;
    address: string;
    tester: string;
    result: 'negative' | 'positive';
}