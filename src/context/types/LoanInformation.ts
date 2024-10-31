interface LoanInformation {
  loanAmount: number | undefined;
  interestRate: number | undefined;
  installmentCount: number | undefined;
  loanMonth: number | undefined;
  loanYear: number | undefined;
  correctionRate: number | undefined;
  setLoanAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  setInterestRate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setInstallmentCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLoanMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLoanYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCorrectionRate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default LoanInformation;
