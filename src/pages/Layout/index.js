import { Layout, Menu, Popconfirm } from "antd";
import React from "react";
import "./index.scss";
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
  const {  loginStore,useStore1 } = useStore();
  useEffect(() => {
    useStore1.getUserInfo();
  }, [useStore1]);

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

  const loaction = useLocation(); //返回的是当前的路由对象

  function loginOut() {
    loginStore.clearToken();
    navigate("/login");
  }

  return (
    <div>
      <Layout>
        <Layout.Header className="head">
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
        <Layout>
          <Layout.Sider theme={"light"} width={120} className="siderBar">
            <Menu
              theme="dark"
              mode="inline"
              items={itemsSider}
              defaultSelectedKeys={[loaction.pathname]}
              onClick={(item) => clickMenu(item)}
            ></Menu>
          </Layout.Sider>
          <Layout.Content>
            {/* 二级出口路由 */}
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default observer(LayoutView);
