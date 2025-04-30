import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  initialValue?: string;
  debounceTime?: number;
}

export const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  initialValue = '',
  debounceTime = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle input change with debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceTime);
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  bg-white text-gray-900 placeholder-gray-500
                  transition-colors"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      
      {searchTerm && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={handleClear}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};