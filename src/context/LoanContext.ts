import { createContext } from 'react';
import LoanInformation from './types/LoanInformation';

const LoanContext = createContext<LoanInformation | undefined>(undefined);

export default LoanContext;
