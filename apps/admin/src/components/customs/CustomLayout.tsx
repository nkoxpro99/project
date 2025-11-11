import React from 'react';
import { Layout, Menu } from 'react-admin';
import { SquareIcon, TimerIcon, StackIcon, RulerSquareIcon, PersonIcon } from '@radix-ui/react-icons';

const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem primaryText="Kho bãi"></Menu.DashboardItem>
    <Menu.Item primaryText="Tất cả" to="/warehouse" />
    <Menu.Item primaryText="Đang chờ duyệt" to="/request" />
    <Menu.DashboardItem primaryText="Thống kê"></Menu.DashboardItem>
    <Menu.Item primaryText="Doanh thu" to="/revenue"></Menu.Item>
    <Menu.Item primaryText="Người dùng" to="/users"></Menu.Item>
    <Menu.DashboardItem primaryText="Kho bãi" leftIcon={<SquareIcon />} />
    <Menu.Item primaryText="Tất cả" to="/warehouse" leftIcon={<SquareIcon />} />
    <Menu.Item primaryText="Đang chờ duyệt" to="/request" leftIcon={<TimerIcon />} />
    <Menu.DashboardItem primaryText="Thống kê" leftIcon={<StackIcon />} />
    <Menu.Item primaryText="Doanh thu" to="/revenue" leftIcon={<RulerSquareIcon />} />
    <Menu.Item primaryText="Người dùng" to="/users" leftIcon={<PersonIcon />} />
  </Menu>
);

export const CustomLayout = (props: any) => {
  return <Layout {...props} menu={MyMenu} />;
};
