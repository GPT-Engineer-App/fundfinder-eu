import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FundCard = ({ fund }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{fund.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{fund.description}</p>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{fund.country}</Badge>
          <span className="text-sm font-semibold">{fund.amount}</span>
        </div>
        <a
          href={fund.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Visit Website
        </a>
      </CardContent>
    </Card>
  );
};

export default FundCard;