import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function JoinUs({}) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PageContainer title="Join us!">
          <div className="mb-4 flex flex-col space-y-5">
            
          </div>
        </PageContainer>
      </LocalizationProvider>
    );
}