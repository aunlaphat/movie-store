import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const LoginModal = ({ visible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      alert(`เข้าสู่ระบบสำเร็จ: ${username}`);
      onClose();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null}>
      <h2 style={{ color: '#e50914' }}>เข้าสู่ระบบ</h2>
      <Input placeholder="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: 10 }} />
      <Input.Password placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 20 }} />
      <Button type="primary" block onClick={handleLogin}>เข้าสู่ระบบ</Button>
    </Modal>
  );
};

export default LoginModal;