import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Badge, Button, Drawer, Menu, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import CartModal from './CartModal';
import OrderHistory from './OrderHistory';

const { Header } = Layout;

const Navbar = ({ cartItems, onSearch, onLoginClick, onClearCart, onCheckout, purchaseHistory, user, onLogout }) => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const location = useLocation();
  const selectedKey = location.pathname === '/movies' ? 'movies' : 'home';

  const userMenuItems = [
    {
      key: 'logout',
      label: 'ออกจากระบบ',
      icon: <LogoutOutlined />,
      onClick: onLogout,
    },
  ];

  return (
    <Header style={{ backgroundColor: '#000', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20 }}>
      <div className="navbar-title">🎬 MOVIE STORE</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'left', borderBottom: 'none' }}
        items={[
          {
            key: 'home',
            label: <Link to="/">หน้าแรก</Link>,
          },
          {
            key: 'movies',
            label: <Link to="/movies">ภาพยนตร์</Link>,
          },
        ]}
      />
      <Badge count={cartItems.length} offset={[-5, 5]}>
        <ShoppingCartOutlined
          style={{ fontSize: 28, color: '#ccc', cursor: 'pointer' }}
          onClick={() => setCartOpen(true)}
        />
      </Badge>
      <HistoryOutlined
        style={{ fontSize: 24, color: '#ccc', cursor: 'pointer', marginLeft: 0 }}
        onClick={() => setHistoryOpen(true)}
      />
      {user ? (
        <div style={{ marginLeft: 10 }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button icon={<UserOutlined />}>
              {user.username}
            </Button>
          </Dropdown>
        </div>
      ) : (
        <Button onClick={onLoginClick} style={{ marginLeft: 10 }}>
          เข้าสู่ระบบ / สมัครสมาชิก
        </Button>
      )}


      <Drawer
        title="📝 ประวัติการสั่งซื้อ"
        placement="right"
        onClose={() => setHistoryOpen(false)}
        open={historyOpen}
        width={400}
      >
        <OrderHistory orders={purchaseHistory} />
      </Drawer>
      <Drawer
        title="🛒 ตะกร้าสินค้า"
        placement="right"
        onClose={() => setCartOpen(false)}
        open={cartOpen}
        width={350}
      >
        <CartModal cartItems={cartItems} clearCart={onClearCart} onCheckout={onCheckout} />
      </Drawer>
    </Header>
  );
};

export default Navbar;