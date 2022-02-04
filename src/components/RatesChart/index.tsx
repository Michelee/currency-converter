import React from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area
} from 'recharts';
import { fxCurrencyValues } from "../../constants/types";

interface RatesChartTypes {
  data: Array<fxCurrencyValues>
}

const RatesChart = ({ data }: RatesChartTypes) => {
  return (
    <div className='ChartComponent' data-testid='rates-chart'>
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="rate" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatesChart;