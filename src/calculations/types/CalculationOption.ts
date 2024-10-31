export enum CalculationOption {
  PreFixedOnBalance = "A",             // Pré-fixado com juros sobre saldo devedor
  PreFixedOnInstallment = "B",         // Pré-fixado com juros na parcela
  PostFixedOnBalanceWithCorrection = "C",  // Pós-fixado com juros e correção no saldo devedor
  PostFixedOnInstallmentWithCorrection = "D", // Pós-fixado com juros e correção na parcela
  PostFixedOnBalanceWithInstallmentCorrection = "E" // Pós-fixado com juros sobre o saldo devedor e correção na parcela
}
