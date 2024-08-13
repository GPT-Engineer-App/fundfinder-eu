import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, PenTool, ArrowUpDown } from 'lucide-react';
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
import { debounce } from 'lodash';

const FundList = ({ funds, updateFundStatus }) => {
  const [generatedApplication, setGeneratedApplication] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({});
  const [columns, setColumns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'country', label: 'Country' },
    { id: 'amount', label: 'Amount' },
    { id: 'applicationPeriod', label: 'Application Period' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'fundingType', label: 'Funding Type' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ]);

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'writing', label: 'Writing Application' },
    { value: 'applied', label: 'Applied' },
    { value: 'waiting', label: 'Waiting for Response' },
  ];

  const generateApplication = (fund) => {
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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = debounce((column, value) => {
    setFilters(prev => ({ ...prev, [column]: value }));
  }, 300);

  const sortedAndFilteredFunds = useMemo(() => {
    let sortedFunds = [...funds];
    if (sortConfig.key) {
      sortedFunds.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedFunds.filter(fund => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return fund[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [funds, sortConfig, filters]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newColumns = Array.from(columns);
    const [reorderedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, reorderedColumn);
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <Table>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <TableHeader {...provided.droppableProps} ref={provided.innerRef}>
                <TableRow>
                  {columns.map((column, index) => (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <TableHead ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="flex items-center">
                            {column.label}
                            {['name', 'country'].includes(column.id) && (
                              <ArrowUpDown
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={() => handleSort(column.id)}
                              />
                            )}
                          </div>
                          {['name', 'description', 'country'].includes(column.id) && (
                            <Input
                              placeholder={`Filter ${column.label}`}
                              onChange={(e) => handleFilterChange(column.id, e.target.value)}
                              className="mt-2"
                            />
                          )}
                        </TableHead>
                      )}
                    </Draggable>
                  ))}
                </TableRow>
              </TableHeader>
            )}
          </Droppable>
          <TableBody>
            {sortedAndFilteredFunds.map((fund) => (
              <TableRow key={fund.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'name' && <span className="font-medium">{fund.name}</span>}
                    {column.id === 'description' && fund.description}
                    {column.id === 'country' && <Badge variant="secondary">{fund.country}</Badge>}
                    {column.id === 'amount' && fund.amount}
                    {column.id === 'applicationPeriod' && fund.applicationPeriod}
                    {column.id === 'eligibility' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help underline">
                            View Eligibility
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{fund.eligibility}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {column.id === 'fundingType' && fund.fundingType}
                    {column.id === 'status' && (
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
                    )}
                    {column.id === 'actions' && (
                      <div className="space-x-2">
                        <a
                          href={fund.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Info
                        </a>
                        <a
                          href={fund.applicationWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-700"
                        >
                          Apply
                        </a>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <button
                              className="text-purple-500 hover:text-purple-700"
                              onClick={() => generateApplication(fund)}
                            >
                              Write
                            </button>
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
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DragDropContext>
  );
};

export default FundList;