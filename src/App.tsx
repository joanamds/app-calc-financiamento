import React from 'react';
import Header from './components/Header';
import LoanForm from './components/Form';
import LoanTable from './components/Table';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <LoanForm />
      <LoanTable />
    </div>
  );
}

export default App;
