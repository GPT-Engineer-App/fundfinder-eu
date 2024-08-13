import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PenTool } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const FundList = ({ funds, updateFundStatus }) => {
  const [generatedApplication, setGeneratedApplication] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'writing', label: 'Writing Application' },
    { value: 'applied', label: 'Applied' },
    { value: 'waiting', label: 'Waiting for Response' },
  ];

  const generateApplication = (fund) => {
    // Simulating AI-generated application
    const generatedContent = `
      Application for ${fund.name}

      1. Project Title: [Insert innovative project title related to ${fund.description}]

      2. Executive Summary:
      [Brief overview of your project, highlighting its innovation and alignment with ${fund.name}'s goals]

      3. Problem Statement:
      [Describe the problem your project aims to solve, referencing the fund's focus areas]

      4. Proposed Solution:
      [Detailed explanation of your innovative solution and how it addresses the problem]

      5. Market Analysis:
      [Overview of the target market, potential customers, and competition]

      6. Business Model:
      [Explanation of how your project will generate revenue and achieve sustainability]

      7. Team:
      [Introduction of key team members and their relevant expertise]

      8. Budget and Funding Request:
      [Detailed budget breakdown and specific funding amount requested from ${fund.name}]

      9. Timeline:
      [Project milestones and expected completion dates]

      10. Impact:
      [Description of the expected impact of your project, aligning with ${fund.name}'s objectives]

      11. Risks and Mitigation:
      [Identification of potential risks and strategies to address them]

      12. Conclusion:
      [Summary of why your project is a strong candidate for ${fund.name} funding]
    `;
    setGeneratedApplication(generatedContent);
    setIsDialogOpen(true);
  };

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
            <TableHead>Status</TableHead>
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
              <TableCell>
                <Select
                  value={fund.status || 'not_started'}
                  onValueChange={(value) => updateFundStatus(fund.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => generateApplication(fund)}>
                      Write
                      <PenTool className="ml-1 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Generated Application for {fund.name}</DialogTitle>
                      <DialogDescription>
                        This is an AI-generated draft. Please review and modify as needed.
                      </DialogDescription>
                    </DialogHeader>
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {generatedApplication}
                    </pre>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FundList;