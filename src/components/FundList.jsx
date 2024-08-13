import React from 'react';
import FundCard from './FundCard';

const FundList = ({ funds }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {funds.map((fund) => (
        <FundCard key={fund.id} fund={fund} />
      ))}
    </div>
  );
};

export default FundList;