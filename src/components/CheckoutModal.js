import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

function CheckoutModal({ visible, onClose }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!visible) return;
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
    <Modal open={visible} onCancel={onClose} footer={null}>
      <h2>📦 โอนเงินภายใน {timeLeft} วินาที</h2>
      <p>บัญชี: 123-456-789 ธนาคาร MouseBank</p>
    </Modal>
  );
}

export default CheckoutModal;
