import { Button, Form, Input, Modal, Radio, Space, Tag, Toast } from "antd-mobile";
import {
    TeamFill
} from "antd-mobile-icons";
import { useUserInfo } from "hooks/user";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "redux/store";
import styled from "styled-components";
import { scanQR, testedBase64 } from 'components/QRCodeReader';
import {UpdateUserInfo, UserUpdatePassword} from "service/user";

export const UserHome = React.memo(() => {
    // hooks
    const navigate = useNavigate();
    let userCache = useSelector<RootState, User | null>(state => state.user.userCache);
    const [form] = Form.useForm();
    const { userInfo, refresh } = useUserInfo(userCache?.id, info => form.setFieldsValue({
        cardId: info.cardId ? info.cardId : '-',
        sex: info.sex ? (info.sex === 'male' ? '男' : '女') : '-'
    }));

    return <Container>
        <Space block className="user" align="center">
            <TeamFill fontSize="32px" />
            <Space className="desc" >
                <div>{userInfo?.name}</div>
                <Tag
                    color="success"
                    fill="outline"
                    style={{ '--background-color': '#c8f7c5' }}
                >用户</Tag>
            </Space>
            <Button color="success" size="small" onClick={() => {
                const handler = Modal.show({
                    title: '修改密码',
                    content: UpdatePwd(values => {
                        UserUpdatePassword(values.oriPassword,values.newPassword).then(() => {
                            Toast.show('修改成功');
                            handler.close();
                            refresh();
                        }).catch(_ => { });
                    }),
                    closeOnMaskClick: true,
                })
            }}>修改密码</Button>
            <Button color="primary" size="small" onClick={() => {
                const handler = Modal.show({
                    title: '修改个人信息',
                    content: UpdateInfo(values => {
                        UpdateUserInfo(values).then(() => {
                            Toast.show('修改成功');
                            handler.close();
                            refresh();
                        }).catch(_ => { });
                    }),
                    closeOnMaskClick: true,
                })
            }}>修改信息</Button>
        </Space>
        <Form layout="horizontal" form={form}>
            <Form.Header>个人信息</Form.Header>
            <Form.Item name="cardId" label="身份证号">
                <Input disabled />
            </Form.Item>
            <Form.Item name="sex" label="性别">
                <Input disabled />
            </Form.Item>
        </Form>
        <div className="logout-button">
            <Button
                color="danger"
                size="middle"
                style={{ flex: 1 }}
                onClick={() => navigate('/logout')}
            >
                退出登录
            </Button>
        </div>
    </Container>
});

const UpdateInfo = (onFinish?: ((values: any) => void)) => <Form
    onFinish={onFinish}
>
    <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
        <Input placeholder="请输入姓名" />
    </Form.Item>
    <Form.Item name="cardId" label="身份证号" rules={[
        ({ getFieldsValue, setFieldsValue }) => ({
            validator(_, value) {
                if (!value) return Promise.resolve();
                if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                    return Promise.reject('请输入正确的身份证号码');
                }
                const values = getFieldsValue();
                setFieldsValue({
                    ...values,
                    sex: parseInt(value.substring(16, 17)) % 2 === 1 ? 'male' : 'female'
                })
                return Promise.resolve();
            }
        })
    ]}>
        <Input placeholder="请输入身份证号" />
    </Form.Item>
    <Form.Item name="sex" label="性别">
        <Radio.Group>
            <Space>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
            </Space>
        </Radio.Group>
    </Form.Item>
    <Form.Item>
        <Button color="primary" type="submit" shape="rounded" block>提交</Button>
    </Form.Item>
</Form>

const UpdatePwd = (onFinish?: ((values: any) => void)) => <Form
    onFinish={onFinish}
>
    <Form.Item name="oriPassword" label="旧密码" rules={[{ required: true }]}>
        <Input placeholder="请输入旧密码" />
    </Form.Item>
    <Form.Item name="newPassword" label="新密码" rules={[{ required: true }]}>
        <Input type="password" placeholder="请输入新密码" />
    </Form.Item>
    <Form.Item label="确认密码" name="confirm" rules={[
        { required: true },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致');
            }
        })
    ]}>
        <Input type="password" placeholder="请再次输入密码" autoComplete="new-password" />
    </Form.Item>
    <Form.Item>
        <Button color="primary" type="submit" shape="rounded" block>确认</Button>
    </Form.Item>
</Form>

const Container = styled.div`
    min-height: 100%;

    .user {
        padding: 32px;
        background-color: #2499f2;
        color: #fff;
    }

    .user .desc {
        flex: 1;
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
    }
    
    .logout-button {
        display: flex;
        position: absolute;
        bottom: 64px;
        width: 100%;
        padding: 16px;
    }
`