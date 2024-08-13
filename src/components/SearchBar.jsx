import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

const SearchBar = ({ setSearchTerm }) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((nextValue) => setSearchTerm(nextValue), 300),
    [setSearchTerm]
  );

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    debouncedSearch(nextValue);
  };

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search funds by name or country..."
        value={value}
        onChange={handleChange}
        className="pl-10 w-full max-w-md mx-auto"
      />
    </div>
  );
};

export default SearchBar;