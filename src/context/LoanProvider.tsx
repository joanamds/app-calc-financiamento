import React, { useState, useMemo, PropsWithChildren } from 'react';
import LoanContext from './LoanContext';
import LoanInformation from './types/LoanInformation';

const LoanProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [loanAmount, setLoanAmount] = useState<number | undefined>(undefined);
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [installmentCount, setInstallmentCount] = useState<number | undefined>(undefined);
  const [loanMonth, setLoanMonth] = useState<number | undefined>(undefined);
  const [loanYear, setLoanYear] = useState<number | undefined>(undefined);
  const [correctionRate, setCorrectionRate] = useState<number | undefined>(undefined);

  const loanInformation = useMemo<LoanInformation>(() => ({
    loanAmount,
    interestRate,
    installmentCount,
    loanMonth,
    loanYear,
    correctionRate,
    setLoanAmount,
    setInterestRate,
    setInstallmentCount,
    setLoanMonth,
    setLoanYear,
    setCorrectionRate,
  }), [
    loanAmount, 
    interestRate, 
    installmentCount, 
    loanMonth, 
    loanYear, 
    correctionRate
  ]);

  return (
    <LoanContext.Provider value={loanInformation}>
      {children}
    </LoanContext.Provider>
  );
};

export default LoanProvider;
