import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryInput from './src/pages/QueryInput';
import ExecutionDashboard from './src/pages/ExecutionDashboard';
import ReportView from './src/pages/ReportView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QueryInput />} />
        <Route path="/dashboard" element={<ExecutionDashboard />} />
        <Route path="/report" element={<ReportView />} />
      </Routes>
    </BrowserRouter>
  );
}
