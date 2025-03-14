import { Layout, Menu } from 'react-admin';

const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem primaryText="Kho bãi"></Menu.DashboardItem>
    <Menu.Item primaryText="Tất cả" to="/warehouse" />
    <Menu.Item primaryText="Đang chờ duyệt" to="/request" />
    <Menu.DashboardItem primaryText="Thống kê"></Menu.DashboardItem>
    <Menu.Item primaryText="Doanh thu" to="/revenue"></Menu.Item>
    <Menu.Item primaryText="Người dùng" to="/users"></Menu.Item>
  </Menu>
);

export const CustomLayout = (props: any) => {
  return <Layout {...props} menu={MyMenu} />;
};

