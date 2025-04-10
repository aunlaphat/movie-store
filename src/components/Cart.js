import React from 'react';
import { Button, List } from 'antd';

function Cart({ cartItems, clearCart }) {
  const getTotal = () => {
    const base = cartItems.reduce((acc, item) => acc + (item.price || 100), 0);
    if (cartItems.length > 5) return base * 0.8;
    if (cartItems.length > 3) return base * 0.9;
    return base;
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#1e293b', color: 'white' }}>
      <h3>🛒 ตะกร้าสินค้า</h3>
      <List
        dataSource={cartItems}
        renderItem={(item) => <List.Item style={{ color: 'white' }}>{item.title} - ฿{item.price || 100}</List.Item>}
      />
      <p>รวมทั้งสิ้น: ฿{getTotal().toFixed(2)}</p>
      <Button danger onClick={clearCart}>ล้างตะกร้า</Button>
    </div>
  );
}

export default Cart;