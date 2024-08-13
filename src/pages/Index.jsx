import React from 'react';
import { useQuery } from '@tanstack/react-query';
import FundList from '../components/FundList';
import SearchBar from '../components/SearchBar';
import { fetchFunds, searchFunds } from '../api/fundsApi';

const Index = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data: funds, isLoading, error } = useQuery({
    queryKey: ['funds', searchTerm],
    queryFn: () => searchTerm ? searchFunds(searchTerm) : fetchFunds(),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">EU Non-Diluting Funds</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <div className="text-center mt-8">Loading funds...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">Error loading funds: {error.message}</div>
      ) : (
        <FundList funds={funds} />
      )}
    </div>
  );
};

export default Index;