/**
 * 预约模型
 */
type Appointment = {
    uid: number;
    time: string;
    siteId: number;
}

/**
 * 预约信息模型
 */
type AppointmentInfo = {
    uid: number;
    time: string;
    address: string;
    name: string;
    cardId: string;
}