import CalculationOption from './CalculationOption';

interface ILoanCalculation {
  loanAmount: number;             // Valor do empréstimo
  interestRate: number;           // Taxa de juros
  installmentCount: number;       // Número de parcelas
  loanMonth: number;              // Mês de concessão do empréstimo
  loanYear: number;               // Ano de concessão do empréstimo
  correctionRate?: number;        // Taxa de correção monetária 
  calculateInstallments(option: CalculationOption): number[]; // Opções de cálculo
}


export default ILoanCalculation;
