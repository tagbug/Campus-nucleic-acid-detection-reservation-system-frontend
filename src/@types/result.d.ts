/**
 * 检测结果模型
 */
type TestResult = {
    uid: number;
    time: string;
    siteId: number;
    tester: string;
    result: 'negative' | 'positive';
}