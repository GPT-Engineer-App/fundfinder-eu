import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FundList = ({ funds }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[250px]">Description</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Application Period</TableHead>
            <TableHead>Eligibility</TableHead>
            <TableHead>Funding Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell>{fund.applicationPeriod}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Show eligibility</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{fund.eligibility}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{fund.fundingType}</TableCell>
              <TableCell className="text-right space-x-2">
                <a
                  href={fund.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                >
                  <Button variant="outline" size="sm">
                    Info
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={fund.applicationWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700 inline-flex items-center"
                >
                  <Button variant="outline" size="sm">
                    Apply
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
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