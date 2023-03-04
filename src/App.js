import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import Router from './shared/Router';
import { CookiesProvider } from 'react-cookie';

<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
</style>

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
