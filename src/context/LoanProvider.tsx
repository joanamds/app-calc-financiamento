import React, { useState, ReactNode } from 'react';
import { InstallmentDetail } from '../calculations/types/InstallmentDetail';
import LoanContext from './LoanContext';

interface LoanProviderProps {
  children: ReactNode;
}

const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  const [totalCalculation, setTotalCalculation] = useState<InstallmentDetail[]>([]);

  return (
    <LoanContext.Provider value={{ totalCalculation, setTotalCalculation }}>
      {children}
    </LoanContext.Provider>
  );
};

export { LoanProvider };
