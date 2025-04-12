import React from 'react';
import { List, Divider } from 'antd';
import dayjs from 'dayjs';

const OrderHistory = ({ orders }) => {
  if (orders.length === 0) return <p style={{ color: '#999' }}>ยังไม่มีประวัติการสั่งซื้อ</p>;

  return (
    <div>
      {orders.map((order, idx) => (
        <div key={idx} style={{ marginBottom: 24 }}>
          <Divider orientation="left" plain>
            🕒 สั่งซื้อเมื่อ {dayjs(order.timestamp).format('DD MMM YYYY เวลา HH:mm')}
          </Divider>
          <List
            size="small"
            dataSource={order.items}
            renderItem={(item, i) => (
              <List.Item>
              <List.Item.Meta
                title={<span><b>{i + 1}.</b> {item.title}</span>}
                description={`ราคา: ฿${item.price || 99}`}
              />
            </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
