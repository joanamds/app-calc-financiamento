import React, { useMemo, PropsWithChildren } from 'react';
import LoanContext from './LoanContext';
import TotalInformation from './types/TotalInformation';

const LoanProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const totalInformation = useMemo<TotalInformation>(() => ({
    totalCalculation: [],
    setTotalCalculation: () => {},
  }), []);

  return (
    <LoanContext.Provider value={totalInformation}>
      {children}
    </LoanContext.Provider>
  );
};

export default LoanProvider;
