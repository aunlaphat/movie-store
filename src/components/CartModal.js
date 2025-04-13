import React from 'react';
import { List, Button, Divider } from 'antd';

function CartModal({ cartItems, onCheckout, clearCart }) {
  const getDiscountRate = () => {
    if (cartItems.length > 5) return 0.2;
    if (cartItems.length > 3) return 0.1;
    return 0;
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price ?? 99), 0);
  const discountRate = getDiscountRate();
  const discountAmount = totalPrice * discountRate;
  const finalPrice = totalPrice - discountAmount;

  return (
    <div>
      <List
        dataSource={cartItems}
        locale={{ emptyText: 'ยังไม่มีรายการสินค้าในตะกร้า' }}
        renderItem={(item, index) => (
          <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <b>{index + 1}.</b> {item.title}
            </span>
            <span>฿{item.price ?? 99}</span>
          </List.Item>
        )}
      />
      <Divider />
      <div>
        <div style={{ textAlign: 'center', fontWeight: 'bold',marginTop: 0}}>
          <p>🎉 โปรโมชั่น 🎉</p>
          <p>ซื้อครบ 3 เรื่องขึ้นไปลด 10% 🎈</p>
          <p>ซื้อครบ 5 เรื่องขึ้นไปลด 20% 🎈</p>
        </div>
        <p>รวม: ฿{totalPrice.toFixed(2)}</p>
        {discountRate > 0 && <p>ส่วนลด: -฿{discountAmount.toFixed(2)}</p>}
        <h3>ยอดชำระ: ฿{finalPrice.toFixed(2)}</h3>

        {cartItems.length > 0 && (
          <Button type="primary" style={{ marginBottom: 5 }}onClick={onCheckout} block>
            ดำเนินการชำระเงิน
          </Button>
        )}
        <Button danger onClick={clearCart} block>
          ล้างตะกร้า
        </Button>
      </div>
    </div>
  );
}

export default CartModal;
