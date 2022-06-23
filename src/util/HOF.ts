/**
 * 节流
 * @param fn 要包装的函数
 * @param interval 间隔（ms）
 */
export const Throttle = (fn: Function, interval: number) => {
    let nextCall: number = Date.now();
    return (...args: unknown[]) => {
        let now = Date.now();
        if (nextCall <= now) {
            nextCall = now + interval;
            return fn(...args);
        }
        nextCall = now + interval;
    }
}

/**
 * 防抖
 * @param fn 要包装的函数
 * @param delay 延迟（ms）
 */
export const Debounce = (fn: Function, delay: number) => {
    let timeout: number | null = null;
    let r: Function | null = null;
    return (...args: unknown[]) => new Promise<any>(resolve => {
        if (timeout) {
            window.clearTimeout(timeout);
            r?.();
        }
        r = resolve;
        timeout = window.setTimeout(() => {
            resolve(fn(...args));
            timeout = null;
            r = null;
        }, delay);
    })
}