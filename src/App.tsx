import React from 'react';
import Header from './components/Header';
import LoanForm from './components/Form';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <LoanForm />
      <Table />
    </div>
  );
}

export default App;
