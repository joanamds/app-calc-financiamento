import { ILoanCalculation } from './interfaces/ILoanCalculation';
import { InstallmentDetail } from './interfaces/InstallmentDetail';

abstract class LoanCalculator implements ILoanCalculation {
  loanAmount: number;
  interestRate: number;
  installmentCount: number;
  loanMonth: number;
  loanYear: number;
  correctionRate?: number;

  constructor(
      loanAmount: number, 
      interestRate: number, 
      installmentCount: number, 
      loanMonth: number, 
      loanYear: number, 
      correctionRate?: number
  ) {
      this.loanAmount = loanAmount;
      this.interestRate = interestRate;
      this.installmentCount = installmentCount;
      this.loanMonth = loanMonth;
      this.loanYear = loanYear;
      this.correctionRate = correctionRate;
  }

  abstract calculateInstallments(
    loanAmount: number, 
    interestRate: number, 
    installmentCount: number, 
    loanMonth: number, 
    loanYear: number, 
    correctionRate?: number
  ): InstallmentDetail[];
}


export default LoanCalculator;