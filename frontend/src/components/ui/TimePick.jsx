import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <div style={{ width: '200px', overflow: 'hidden' }}> {/* Adjust width as needed */}
          <TimePicker
            label="Select Event Time"
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.875rem', // Adjust the font size
                height: '35px',       // Adjust the height
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1rem',     // Adjust the icon size
              },
            }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
