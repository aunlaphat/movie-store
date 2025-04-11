import React, { useEffect, useState } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function CheckoutModal({ visible, onClose }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!visible) return;
    setTimeLeft(60);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <Modal open={visible} onCancel={onClose} footer={null} title={`📦 โอนเงินภายใน ${timeLeft} วินาที`}>
      <p style={{ marginBottom: 10 }}>บัญชี: 123-456-789 ธนาคาร MovieBank</p>
      <Upload.Dragger name="file" customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 500)}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">คลิกหรือวางสลิปโอนเงินที่นี่</p>
      </Upload.Dragger>
      <Button type="primary" style={{ marginTop: 16 }} onClick={() => {
        message.success('ส่งสลิปสำเร็จ');
        onClose();
      }} block>
        ยืนยันการโอนเงิน
      </Button>
    </Modal>
  );
}

export default CheckoutModal;