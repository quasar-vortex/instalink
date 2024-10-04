import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search friends..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full rounded mt-2"
    />
  );
};

export default SearchBar;
