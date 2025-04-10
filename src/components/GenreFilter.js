import React from 'react';
import { Select } from 'antd';

const GenreFilter = ({ genres, onChange }) => (
  <Select
    placeholder="เลือกหมวดหมู่"
    style={{ width: 200, marginBottom: 20 }}
    onChange={onChange}
    allowClear
  >
    {genres.map((g) => (
      <Select.Option key={g.id} value={g.id}>{g.name}</Select.Option>
    ))}
  </Select>
);

export default GenreFilter;