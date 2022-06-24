import {
    NavBar,
    Card,
    Toast,
    Dialog,
    Button,
    SearchBar,
    PullToRefresh,
    Divider,
    Form,
    Input,
    Mask,
    DatePicker,
} from "antd-mobile";
import React, {useState} from "react";
import styled from "styled-components";
import {AntOutline, SendOutline} from "antd-mobile-icons";
import {useNavigate, useParams} from "react-router";
import moment from "moment";
import { deleteTask, updateTask} from "service/task";
import {DatePickerItem} from "components/DatePickerItem";

export const TaskMange = React.memo(() => {
// hooks
    const navigate = useNavigate();
    const {siteId, address} = useParams<{ siteId: string, address: string }>();
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [form] = Form.useForm();
    const TaskArr: SiteTask[] = [
        {
            address: "江滨医院",
            tester: "钟佩祺",
            timeStart: "2022-06-23 14:30",
            timeEnd: "2022-06-23 18:30",
            maxCapacity: 200
        },
        {
            address: "江滨医院",
            tester: "陈欣阳",
            timeStart: "2022-06-23 14:30",
            timeEnd: "2022-06-23 18:30",
            maxCapacity: 200
        }
    ]
    return <AppContainer>
        <Mask visible={visible} onMaskClick={() => setVisible(false)}>
            <div className="overlayContent">
                <Form
                    layout='horizontal'
                    mode='card'
                    form={form}
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            修改
                        </Button>
                    }
                    onFinish={values => {
                        updateTask({
                            tester: values.tester,
                            siteId: Number(siteId),
                            maxCapacity: Number(values.maxCapacity),
                            timeEnd: values.timeEnd,
                            timeStart: values.timeStart
                        }).then(_ => {
                            Toast.show('修改成功')
                            setVisible(false)
                            navigate('/admin/site/' + siteId + '&' + address)
                        }).catch(_ => {});
                    }
                    }
                >
                    <Form.Header>修改采样任务</Form.Header>
                    <Form.Item
                        name='tester'
                        label='采样人员'
                        rules={[{required: true, message: '内容不能为空'}]}
                    >
                        <Input placeholder='请输入采样人员姓名'/>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item name='maxCapacity' label='日最大检测量' rules={[{required: true, message: '内容不能为空'}]}>
                        <Input placeholder='请输入日最大检测量'/>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item name='timeStart'
                               label='开始时间'
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Header/>
                    <Form.Item name='timeEnd'
                               label='结束时间'
                               rules={[{required: true, message: '内容不能为空'}]}
                               onClick={() => {
                                   setVisible2(true)
                               }}
                    >
                        <DatePickerItem visible={visible2} setVisible={setVisible2} />
                    </Form.Item>
                </Form>
            </div>
        </Mask>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')}/>}
        >
            预约任务管理
        </NavBar>
        <div className="search">
            <SearchBar
                placeholder='搜索地址'
                style={{
                    '--background': '#ffffff',
                    '--height': '32px',
                    '--padding-left': '12px',
                }}
                onSearch={val => {
                    Toast.show(`你搜索了：${val}`)
                }}
            />

            <Button size='small'
                    color='primary'
                    onClick={() => {
                        navigate('/admin/site/add/' + siteId + '&' + address)
                    }}
            >
                添加采样任务
            </Button>
        </div>
        <PullToRefresh>
        {TaskArr !== undefined ? TaskArr.map((task, idx) =>
            <div className="container">
                <Card
                    key={idx}
                    className="task"
                    title={
                        <div style={{fontWeight: 'bold'}}>
                            <AntOutline style={{marginRight: '4px', color: '#1677ff'}}/>
                            {task.address}
                        </div>
                    }
                    style={{borderRadius: '16px'}}
                >
                    <div className="content">
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>采样人员：</span>
                            <span>{task.tester}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>开始时间：</span>
                            <span>{task.timeStart}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>结束时间：</span>
                            <span>{task.timeEnd}</span>
                        </div>
                        <div className="message">
                            <span style={{fontWeight: 'bold'}}>日最大检测量：</span>
                            <span>{task.maxCapacity}</span>
                        </div>
                    </div>
                    <div onClick={e => e.stopPropagation()} className="footer">
                        <Button
                            size='middle'
                            color='primary'
                            onClick={() => {
                                setVisible(true)
                                form.setFieldsValue({
                                    tester: task.tester,
                                    timeStart: moment(new Date(task.timeStart)).format("yyyy-MM-DD HH:mm:ss"),
                                    timeEnd: new Date(task.timeEnd),
                                    maxCapacity: task.maxCapacity
                                })
                            }}
                        >
                            修改采样任务
                        </Button>
                        <Button
                            size='middle'
                            color='danger'
                            onClick={() => Dialog.confirm({
                                content: '是否确认删除',
                                onConfirm: async () => {
                                    deleteTask(Number(siteId),task.timeStart).then(_ =>{
                                        Toast.show({
                                            icon: 'success',
                                            content: '删除成功',
                                            position: 'bottom',
                                        })
                                        navigate("/admin/site/" + siteId + '&' + address)
                                    }).catch(_ => {});
                                },
                            })}
                        >
                            删除采样任务
                        </Button>
                    </div>
                </Card></div>) : <></>
        }
            <Divider> --End-- </Divider>
        </PullToRefresh>
    </AppContainer>
});


const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;

  .topBar {
    flex: 0;
    border-bottom: 1px solid var(--adm-color-border);
    background-color: #2499f2;
    color: #fff;
  }

  .task {
    background-color: #FEFEFE;
    padding: 5px;
    margin-top: 12px;
    border: 1px solid var(--adm-color-border);
  }

  .content {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .container {
    padding: 15px;
  }

  .message {
    padding: 6px;
  }
  .overlayContent {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 370px;
    height: 370px;
    margin-top: -185px;
    margin-left: -185px;
    background: white;
    border-radius: 16px;
  }
  .body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
  }

  .footer {
    padding: 12px 6px 6px 6px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
  }

`