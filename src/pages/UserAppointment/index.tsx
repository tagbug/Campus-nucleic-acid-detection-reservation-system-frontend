import { Button, Form, Input, Radio, Space, Toast } from "antd-mobile";
import { PickerItem } from "components/PickerItem";
import { useSiteList, useSiteTimeRange } from "hooks/appointment";
import { useUserInfo } from "hooks/user";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "redux/store";
import { addAppointment } from "service/appointment";

export const UserAppointment = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    const { siteList } = useSiteList();
    const [siteId, setSiteId] = React.useState<number>();
    const { timeRange } = useSiteTimeRange(siteId);
    const user = useSelector<RootState, User | null>(state => state.user.userCache);
    const { userInfo } = useUserInfo(user?.id);
    const [form] = Form.useForm();

    useEffect(() => {
        if (userInfo?.cardId) {
            form.setFieldsValue({
                ...form.getFieldsValue(),
                name: userInfo.name,
                cardId: userInfo.cardId,
                age: new Date().getFullYear() - parseInt(userInfo.cardId.substring(6, 10)),
                sex: parseInt(userInfo.cardId.substring(16, 17)) % 2 === 1 ? 'male' : 'female'
            });
        }
    }, [userInfo, form]);

    return <Form
        form={form}
        onFinish={values => {
            addAppointment({
                uid: user?.id!,
                siteId: siteId!,
                time: (values.appointmentTime as string).split('~')[0],
            })
                .then(() => {
                    Toast.show('预约成功');
                    navigate(-1);
                })
                .catch(_ => { });
        }}
    >
        <Form.Header>核酸检测预约</Form.Header>
        <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="身份证号码" name="cardId" rules={[
            { required: true },
            ({ getFieldsValue, setFieldsValue }) => ({
                validator(_, value) {
                    if (!value || !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                        return Promise.reject('请输入正确的身份证号码');
                    }
                    const values = getFieldsValue();
                    setFieldsValue({
                        ...values,
                        age: new Date().getFullYear() - parseInt(value.substring(6, 10)),
                        sex: parseInt(value.substring(16, 17)) % 2 === 1 ? 'male' : 'female'
                    })
                    return Promise.resolve();
                }
            })
        ]}>
            <Input placeholder="请输入身份证号码" />
        </Form.Item>
        <Form.Item label="年龄" name="age" rules={[{ required: true }]}>
            <Input type="number" placeholder="请输入年龄" />
        </Form.Item>
        <Form.Item label="性别" name="sex" rules={[{ required: true }]} initialValue="male">
            <Radio.Group>
                <Space>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="近期是否出国" name="recentOut" rules={[{ required: true }]} initialValue="false">
            <Radio.Group>
                <Space>
                    <Radio value="false">否</Radio>
                    <Radio value="true">是</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="联系电话" name="phone" rules={[
            { required: true },
            {
                validator(_, value) {
                    if (!value || !/^1[3456789]\d{9}$/.test(value)) {
                        return Promise.reject('请输入正确的手机号码');
                    }
                    return Promise.resolve();
                }
            }
        ]}>
            <Input type="number" placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item label="采样地点" name="appointmentSite" rules={[{ required: true }]} >
            <PickerItem
                placeholder="选择采样地点"
                columns={[siteList.map(v => ({ label: v.address, value: v.address }))]}
                handleChange={v => {
                    setSiteId(siteList.find(v2 => v2.address === v)?.id);
                    const values = form.getFieldsValue();
                    form.setFieldsValue({ ...values, appointmentTime: '' });
                }}
            />
        </Form.Item>
        <Form.Item label="采样时间" name="appointmentTime" rules={[{ required: true }]}>
            <PickerItem
                placeholder="选择采样时间"
                columns={[timeRange.map(v => ({ label: v, value: v }))]}
            />
        </Form.Item>
        <Form.Item>
            <Button color="primary" type="submit" shape="rounded" block>预约</Button>
        </Form.Item>
    </Form>;
});