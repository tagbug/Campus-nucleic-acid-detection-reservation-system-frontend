import {
    NavBar, Card, Toast, Button, SearchBar, Dialog, Form,
    Input, Mask, PullToRefresh, Space, InfiniteScroll
} from "antd-mobile";
import React, {useState} from "react";
import styled from "styled-components";
import {AntOutline, RightOutline, SendOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router";
import {addSite, deleteSite} from "service/site";
import {useSiteList} from "../../hooks/site";
import {Debounce} from "util/HOF";

const initPageSize = 5;
export const SiteMange = React.memo(() => {
// hooks
    const navigate = useNavigate();
    const {
        hasMore,
        loadMore,
        siteList,
        refresh,
        setKeyword
    } = useSiteList(initPageSize);
    const [visible, setVisible] = useState(false)
    const onHeaderClick = (id: number, address: string) => {
        navigate('/admin/site/' + id + '&' + address)
    }
    const siteCards = siteList.map((site) =>
        <div className="container" key={site.id}>
            <Card
                key={site.id}
                className="site"
                title={
                    <div style={{fontWeight: 'bold'}}>
                        <AntOutline style={{marginRight: '4px', color: '#1677ff'}}/>
                        {site.address}
                    </div>
                }
                extra={<RightOutline/>}
                onHeaderClick={() => onHeaderClick(site.id, site.address)}
                style={{borderRadius: '16px'}}
            >
                <div onClick={e => e.stopPropagation()} className="footer">
                    <Button
                        size='small'
                        color='danger'
                        onClick={async () => {
                            const res = await Dialog.confirm({
                                content: '是否确认删除',
                            })
                            if (res) {
                                deleteSite(site.id).then(res => {
                                    if (res.status === 200) {
                                        Toast.show({
                                            icon: 'success',
                                            content: '删除成功',
                                            position: 'bottom',
                                        })
                                        refresh()
                                    } else {
                                        Toast.show({
                                            icon: 'fail',
                                            content: '删除失败',
                                            position: 'bottom',
                                        })
                                    }
                                }).catch(_ => {
                                });
                            } else {
                                Toast.show({
                                    icon: 'fail',
                                    content: '取消删除',
                                    position: 'bottom',
                                })
                            }
                        }}
                    >
                        删除采样点
                    </Button>
                </div>
            </Card>
        </div>
    )

    return <AppContainer>
        <Mask visible={visible} onMaskClick={() => setVisible(false)}>
            <div className="overlayContent">
                <Form
                    layout='horizontal'
                    mode="card"
                    onFinish={(values) => {
                        addSite(values.address).then(res => {
                            if (res.status === 200) {
                                Toast.show('添加成功');
                                refresh()
                                setVisible(false)
                            } else {
                                Toast.show('添加失败');
                                navigate("/admin/site");
                                setVisible(false)
                            }
                        }).catch(_ => {
                        });
                    }}
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            添加
                        </Button>
                    }
                >
                    <Form.Item name='address'
                               label='地址'
                               rules={[{required: true, message: '内容不能为空'}]}>
                        <Input
                            onChange={console.log} placeholder='请输入地点'
                        />
                    </Form.Item>
                </Form>
            </div>
        </Mask>
        <NavBar
            className="topBar"
            onBack={() => navigate(-1)}
            right={<SendOutline fontSize="16px" onClick={() => navigate('/logout')}/>}
        >
            预约点管理
        </NavBar>
        <div className="search">
            <SearchBar
                placeholder='搜索地址'
                style={{
                    '--background': '#ffffff',
                    '--height': '32px',
                    '--padding-left': '12px',
                }}
                onChange={Debounce(setKeyword, 500)}
            />

            <Button size='small'
                    color='primary'
                    onClick={() => {
                        setVisible(true)
                    }}
            >
                添加采样点
            </Button>
        </div>
        <PullToRefresh onRefresh={refresh}>
            <Space block direction="vertical">
                {siteCards}
            </Space>
            <InfiniteScroll
                loadMore={loadMore}
                hasMore={hasMore}
            />
        </PullToRefresh>
    </AppContainer>
});


const AppContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;

  .topBar {
    flex: 0;
    border-bottom: 1px solid var(--adm-color-border);
    background-color: #2499f2;
    color: #fff;
  }

  .site {
    background-color: #FEFEFE;
    padding: 5px;
    margin-top: 12px;
    border: 1px solid var(--adm-color-border);
  }

  .body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlayContent {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    margin-top: -150px;
    margin-left: -150px;
    background: white;
    border-radius: 16px;
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
    padding-top: 6px;
    display: flex;
    justify-content: flex-end;
  }

  .container {
    padding: 15px;
  }
`