/**
 * 简易Base64转换器
 * @param file 文件对象
 * @returns Base64 str
 */
export const getBase64 = (file?: File) => {
    if (!file) {
        return undefined;
    }
    return new Promise<string | undefined>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string | undefined);
        reader.onerror = (error) => reject(error);
    });
}