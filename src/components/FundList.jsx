import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';

const FundList = ({ funds }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funds.map((fund) => (
            <TableRow key={fund.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{fund.name}</TableCell>
              <TableCell>{fund.description}</TableCell>
              <TableCell>
                <Badge variant="secondary">{fund.country}</Badge>
              </TableCell>
              <TableCell>{fund.amount}</TableCell>
              <TableCell className="text-right">
                <a
                  href={fund.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                >
                  Visit <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FundList;