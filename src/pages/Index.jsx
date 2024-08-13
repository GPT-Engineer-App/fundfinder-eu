import React from 'react';
import { useQuery } from '@tanstack/react-query';
import FundList from '../components/FundList';
import SearchBar from '../components/SearchBar';
import { fetchFunds, searchFunds, updateFundStatus } from '../api/fundsApi';
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data: funds, isLoading, error, refetch } = useQuery({
    queryKey: ['funds', searchTerm],
    queryFn: () => searchTerm ? searchFunds(searchTerm) : fetchFunds(),
  });

  const handleUpdateFundStatus = async (fundId, newStatus) => {
    await updateFundStatus(fundId, newStatus);
    refetch(); // Refetch the funds to update the UI
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">EU Non-Diluting Funds</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">Error loading funds: {error.message}</div>
      ) : (
        <FundList funds={funds} updateFundStatus={handleUpdateFundStatus} />
      )}
    </div>
  );
};

export default Index;