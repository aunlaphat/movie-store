import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Badge, Button, Drawer, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';
import CartModal from './CartModal';
import OrderHistory from './OrderHistory';

const { Header } = Layout;

const Navbar = ({ onSearch, cartItems, onLoginClick, onClearCart, onCheckout, purchaseHistory }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <Header style={{ backgroundColor: '#000', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20 }}>
      <div className="navbar-title">🎬 MOVIE STORE</div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'left',
          borderBottom: 'none',
        }}
      >
        <Menu.Item key="home" style={{ color: 'white' }}>
          <Link to="/" style={{ color: 'inherit' }}>หน้าแรก</Link>
        </Menu.Item>
        <Menu.Item key="movies" style={{ color: 'white' }}>
          <Link to="/movies" style={{ color: 'inherit' }}>ภาพยนตร์</Link>
        </Menu.Item>
      </Menu>

      <Badge count={cartItems.length} offset={[-5, 5]}>
        <ShoppingCartOutlined
          style={{ fontSize: 30, color: '#ccc', cursor: 'pointer' }}
          onClick={() => setCartOpen(true)}
        />
      </Badge>

      <HistoryOutlined
        style={{ fontSize: 25, color: '#ccc', cursor: 'pointer', marginLeft: 0 }}
        onClick={() => setHistoryOpen(true)}
      />

      <Button icon={<UserOutlined />} onClick={onLoginClick} style={{ marginLeft: 10 }}>
        เข้าสู่ระบบ
      </Button>

      <Drawer
        title="📽️ ประวัติการสั่งซื้อ"
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
