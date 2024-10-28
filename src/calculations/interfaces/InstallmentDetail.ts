export interface InstallmentDetail {
  installmentNumber: number;    // Número da parcela (1, 2, 3, etc.)
  paymentDate: string;          // Data de pagamento da parcela (formato "DD-MM-YYYY")
  principal: string;            // Valor principal pago nesta parcela
  interest: string;             // Valor dos juros aplicados nesta parcela
  correction: string;           // Valor da correção monetária nesta parcela
  totalPayment: string;         // Total pago nesta parcela (principal + juros + correção)
  balance: string;              // Saldo devedor restante após o pagamento desta parcela
}
