import { InstallmentDetail } from "./types/InstallmentDetail";
import LoanCalculator from "./LoanCalculator";

export default class PreFixedOnInstallment extends LoanCalculator {
  calculateInstallments(
    loanAmount: number,
    interestRate: number,
    installmentCount: number,
    loanMonth: number,
    loanYear: number,
    correctionRate?: number): InstallmentDetail[] {
      const installments: InstallmentDetail[] = [];
      const amortizacaoFixa = loanAmount / installmentCount;
      const ratePercent = interestRate / 100;
      let balance = loanAmount;

      for (let i = 0; i <= installmentCount; i++) {
        let installmentDetail: InstallmentDetail;
    
        if (i === 0) {
          installmentDetail = {
            installmentNumber: i,
            paymentDate: `01/${loanMonth.toString().padStart(2, '0')}/${loanYear}`,
            principal: (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            interest: (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            totalPayment: (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            balance: balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          };
        } else {
          // Calcula juros com base no saldo devedor atual
          const interest = amortizacaoFixa * (((1 + ratePercent)**i - 1))
          const totalPayment = amortizacaoFixa + interest;
          balance -= amortizacaoFixa;
    
          // Incrementa o mês de pagamento
          const paymentDate = new Date(loanYear, loanMonth - 1 + i, 1);
          const formattedDate = `01/${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}/${paymentDate.getFullYear()}`;
    
          installmentDetail = {
            installmentNumber: i,
            paymentDate: formattedDate,
            principal: amortizacaoFixa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            interest: interest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            correction: (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            totalPayment: totalPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            balance: balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          };
        }
        installments.push(installmentDetail);
      }
      return installments;
  }
}