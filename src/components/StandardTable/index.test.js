import React from 'react';
import { shallow } from 'enzyme';
import StandardTable from './index';

it('renders table props', () => {
  // 使用包装后的组件
  const data = { list: [], pagination: {} };
  const columns = [
    {
      title: '单位名称',
      dataIndex: 'name',
    },
  ];
  const wrapper = shallow(<StandardTable data={data} columns={columns} />);

  expect(wrapper.find('Table').length).toBe(1);
  expect(wrapper.find('Table').props().dataSource.length).toBe(0);
  expect(wrapper.find('Table').props().dataSource).toEqual([]);
  expect(wrapper.find('Table').prop('pagination').showSizeChanger).toBeTruthy();
  expect(wrapper.find('Table').prop('rowKey')).toBe('key');
});
