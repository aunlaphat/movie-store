import React from 'react';
import { Input } from 'antd';

const Header = ({ onSearch }) => (
  <div style={{ padding: '20px', backgroundColor: '#0d1b2a', color: 'white' }}>
    <h1 style={{ margin: 0 }}>🎬 MousePlus</h1>
    <Input.Search
      placeholder="ค้นหาหนัง..."
      enterButton
      onSearch={onSearch}
      style={{ maxWidth: 400, marginTop: 10 }}
    />
  </div>
);

export default Header;