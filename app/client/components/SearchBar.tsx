

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults, setIsSearching } from '../slices/uiSlice';
import { SearchResult } from '../../shared/types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setIsSearching(true));

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const results: SearchResult[] = await response.json();
      dispatch(setSearchResults(results));
    } catch (error) {
      console.error('Search error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      dispatch(setIsSearching(false));
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search locations..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

