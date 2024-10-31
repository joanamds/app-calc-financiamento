import { createContext } from 'react';
import TotalInfomation from './types/TotalInformation';

const LoanContext = createContext<TotalInfomation>({
  totalCalculation: [],
  setTotalCalculation: () => {}
});

export default LoanContext;
