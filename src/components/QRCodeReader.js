import QRCode from 'qrcode-reader';

export const qr = new QRCode();

export const scanQR = async (image) => {
    return new Promise((resolve, reject) => {
        qr.callback = (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.result);
            }
        }
        qr.decode(image);
    });
}