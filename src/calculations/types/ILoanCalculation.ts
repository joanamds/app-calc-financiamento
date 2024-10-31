export interface ILoanCalculation {
  loanAmount: number | undefined;
  interestRate: number | undefined;
  installmentCount: number | undefined;
  loanMonth: number | undefined;
  loanYear: number | undefined;
  correctionRate?: number | undefined;
}
