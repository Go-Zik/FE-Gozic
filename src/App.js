import React from 'react'
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import { CookiesProvider } from 'react-cookie';

function App() {
  const queryClient = new QueryClient()

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
