// components/OrderHistory.js
import React from 'react';
import { List } from 'antd';

const OrderHistory = ({ orders }) => {
  if (orders.length === 0) return <p style={{ color: '#999' }}>ยังไม่มีประวัติการสั่งซื้อ</p>;

  return (
    <List
      itemLayout="horizontal"
      dataSource={orders}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={`ราคา: ฿${item.price || 99}`}
          />
        </List.Item>
      )}
    />
  );
};

export default OrderHistory;
