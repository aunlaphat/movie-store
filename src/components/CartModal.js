import React from 'react';
import { List, Button, Divider, message } from 'antd';

function CartModal({ cartItems, clearCart, onCheckout }) {
  const getTotal = () => {
    const base = cartItems.reduce((acc, item) => acc + (item.price || 99), 0);
    if (cartItems.length > 5) return base * 0.8;
    if (cartItems.length > 3) return base * 0.9;
    return base;
  };

  const handleCheckout = () => {
    message.success('📦 การชำระเงินเสร็จสมบูรณ์!');
    onCheckout();
    clearCart();
  };

  return (
    <div>
      <List
        dataSource={cartItems}
        locale={{ emptyText: 'ยังไม่มีรายการสินค้าในตะกร้า' }}
        renderItem={(item) => (
          <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.title}</span>
            <span>฿{item.price || 99}</span>
          </List.Item>
        )}
      />
      <Divider />
      <p>รวมทั้งหมด: ฿{getTotal().toFixed(2)}</p>
      <Button type="primary" onClick={handleCheckout} block>
        ✅ ชำระเงิน
      </Button>
      <Button danger onClick={clearCart} block style={{ marginTop: 10 }}>
        ล้างตะกร้า
      </Button>
    </div>
  );
}

export default CartModal;