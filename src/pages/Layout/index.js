import { Layout, Menu, Popconfirm } from "antd";
import React from "react";
import layout from "./index.module.scss";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function LayoutView() {
  const {  loginStore,useStore1,channelStore } = useStore();
  useEffect(() => {
    useStore1.getUserInfo();
  }, [useStore1]);
  useEffect(()=>{
	channelStore.getChannelList()
  },[])

  const itemsSider = [
    {
      key: "/",
      icon: React.createElement(LaptopOutlined),
      label: "数据概览",
    },
    {
      key: "/article",
      icon: React.createElement(NotificationOutlined),
      label: "内容管理",
    },
    {
      key: "/publish",
      icon: React.createElement(UserOutlined),
      label: "发布文章",
    },
  ];
  const navigate = useNavigate();

  function clickMenu(item) {
    navigate(item.key);
  }

  const location = useLocation(); //返回的是当前的路由对象

  function loginOut() {
    loginStore.clearToken();
    navigate("/login");
  }

  return (
    <div style={{height:'100vh'}} className={layout.box}>
      <Layout >
        <Layout.Header className={layout.head}>
          <div>第一个测试</div>
          <div>
            <span style={{ marginRight: "10px" }}>
              {useStore1.userInfo.data.name}
            </span>
            <Popconfirm
              title="确认退出"
              okText="确认"
              cancelText="取消"
              placement="topRight"
              onConfirm={() => loginOut()}
            >
              退出
            </Popconfirm>
          </div>
        </Layout.Header>
        <Layout >
          <Layout.Sider  width={160} height={'100vh'} className={layout.sliderBar}>
            <Menu
              theme="dark"
              mode="inline"
              items={itemsSider}
              defaultSelectedKeys={[location.pathname]}
			  selectedKeys={[location.pathname]}
              onClick={(item) => clickMenu(item)}
            ></Menu>
          </Layout.Sider>
          <Layout.Content style={{padding:24,margin:0,minHeight:280,overflow:'auto'}}>
            {/* 二级出口路由 */}
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default observer(LayoutView);
