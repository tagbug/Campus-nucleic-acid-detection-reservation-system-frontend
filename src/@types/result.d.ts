/**
 * 检测结果模型
 */
type TestResult = {
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
    name: string;
    cardId: string;
    time: string;
    address: string;
    tester: string;
    result: 'negative' | 'positive';
}