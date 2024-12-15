import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  placeholder: string;
  changeValue(value: string): void;
}

export default function SearchBar({
  value,
  placeholder,
  changeValue,
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => {
        changeValue(e.target.value);
      }}
      placeholder={placeholder}
      sx={{ mb: '1.5rem', width: '100%' }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
