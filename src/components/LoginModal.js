import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';

const ADMIN_CREDENTIAL = {
  username: 'admin',
  password: 'supersecure123'
};

const LoginModal = ({ visible, onClose, onLogin }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) return message.error('กรุณากรอกข้อมูลให้ครบ');

    if (username === ADMIN_CREDENTIAL.username) {
      if (password !== ADMIN_CREDENTIAL.password) {
        return message.error('รหัสผ่านไม่ถูกต้องสำหรับผู้ดูแลระบบ');
      }
    } else {
      const registered = localStorage.getItem(`user_${username}`);
      if (!registered) return message.error('ไม่พบบัญชีผู้ใช้ กรุณาลงทะเบียนก่อน');
      const parsed = JSON.parse(registered);
      if (parsed.password !== password) return message.error('รหัสผ่านไม่ถูกต้อง');
    }

    const role = username === ADMIN_CREDENTIAL.username ? 'admin' : 'user';
    const userData = { username, role };
    localStorage.setItem('user', JSON.stringify(userData));
    message.success('เข้าสู่ระบบสำเร็จ');
    onLogin(userData);
    onClose();
  };

  const handleRegister = () => {
    if (!username || !password) return message.error('กรุณากรอกข้อมูลให้ครบ');
    if (username === ADMIN_CREDENTIAL.username) return message.error('ไม่สามารถลงทะเบียนชื่อ admin ได้');
    if (localStorage.getItem(`user_${username}`)) return message.error('ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว');

    localStorage.setItem(`user_${username}`, JSON.stringify({ username, password }));
    message.success('สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ');
    setIsRegisterMode(false);
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null}>
      <h2 style={{ color: isRegisterMode ? '#1677ff' : '#e50914' }}>
        {isRegisterMode ? 'ลงทะเบียน' : 'เข้าสู่ระบบ'}
      </h2>
      <Input
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input.Password
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      {isRegisterMode ? (
        <Button type="primary" block onClick={handleRegister} style={{ marginBottom: 12 }}>
          สมัครสมาชิก
        </Button>
      ) : (
        <Button type="primary" block onClick={handleLogin} style={{ marginBottom: 12 }}>
          เข้าสู่ระบบ
        </Button>
      )}

      <Button type="link" block onClick={() => setIsRegisterMode(!isRegisterMode)}>
        {isRegisterMode ? 'มีบัญชีแล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? ลงทะเบียนที่นี่'}
      </Button>
    </Modal>
  );
};

export default LoginModal;
