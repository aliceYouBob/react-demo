import React, { memo } from 'react';
import { Card } from 'antd';
import { Pie } from '@/components/Charts';
import Yuan from '@/utils/Yuan';

const ProportionSales = memo(({ loading, salesPieData }) => (
  <Card loading={loading} bordered={false} title="销售额">
    <Pie
      subTitle="销售量"
      total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
      data={salesPieData}
      valueFormat={value => <Yuan>{value}</Yuan>}
      height={170}
      lineWidth={4}
      style={{ display: 'flex', 'justify-content': 'center' }}
    />
  </Card>
));

export default ProportionSales;
