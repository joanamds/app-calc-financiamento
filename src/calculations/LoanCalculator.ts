import ILoanCalculator from './interfaces/ILoanCalculation';

class LoanCalculator implements ILoanCalculator {
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

  calculateInstallments(): number[] {
    return [];
}
}

export default LoanCalculator;