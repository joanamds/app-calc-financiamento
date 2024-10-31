import { useState } from "react";
import { CalculationOption } from "../calculations/types/CalculationOption";

function Form(): JSX.Element {
  const [loanAmount, setLoanAmount] = useState<number | undefined>();
  const [interestRate, setInterestRate] = useState<string>("");
  const [installmentCount, setInstallmentCount] = useState<number | undefined>();
  const [loanMonth, setLoanMonth] = useState<number | undefined>();
  const [loanYear, setLoanYear] = useState<number | undefined>();
  const [calculationType, setCalculationType] = useState<CalculationOption | undefined>();
  const [correctionRate, setCorrectionRate] = useState<number | undefined>();

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace("%", "").replace(",", ".");
    setInterestRate(input);
  };

  const CalculationOptionTitles: Record<CalculationOption, string> = {
    [CalculationOption.PreFixedOnBalance]: "Pré-fixado - Juros sobre Saldo Devedor",
    [CalculationOption.PreFixedOnInstallment]: "Pré-fixado - Juros na Parcela",
    [CalculationOption.PostFixedOnBalanceWithCorrection]: "Pós-fixado - Juros e Correção no Saldo Devedor",
    [CalculationOption.PostFixedOnInstallmentWithCorrection]: "Pós-fixado - Juros e Correção na Parcela",
    [CalculationOption.PostFixedOnBalanceWithInstallmentCorrection]: "Pós-fixado - Juros sobre Saldo Devedor e Correção na Parcela"
  };

  return (
    <form className="form-content">
      <label htmlFor="loanAmount"/>
      Valor do empréstimo: 
      <input 
        type="number"
        id="loanAmount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(Number(e.target.value))}
      />
      
      <label htmlFor="interestRate"/>
      Valor do juros: 
      <input 
        type="text"
        id="interestRate"
        value={interestRate ? `${interestRate}%` : ""}
        onChange={handleInterestRateChange}
      />
      <label htmlFor="installmentCount"/>
      Número de parcelas: 
      <input 
        type="number"
        id="installmentCount"
        value={installmentCount}
        onChange={(e) => setInstallmentCount(Number(e.target.value))}
      />
      <label htmlFor="loanMonth"/>
      Mês do empréstimo:
      <input 
        type="number"
        id="loanMonth"
        value={loanMonth}
        onChange={(e) => setLoanMonth(Number(e.target.value))}
      />
      <label htmlFor="loanYear"/>
      Ano do empréstimo:
      <input 
        type="number"
        id="loanYear"
        value={loanYear}
        onChange={(e) => setLoanYear(Number(e.target.value))}
      />

      <label htmlFor="calculationType">Opções de cálculo:</label>
      <select 
        id="calculationType"
        value={calculationType}
        onChange={(e) => setCalculationType(e.target.value as CalculationOption)}
      >
        {Object.entries(CalculationOptionTitles).map(([key, title]) => (
          <option key={key} value={key}>
            {title}
          </option>
        ))}
      </select>

      {/* Renderização condicional da taxa de correção */}
      {(calculationType === CalculationOption.PostFixedOnBalanceWithCorrection ||
        calculationType === CalculationOption.PostFixedOnInstallmentWithCorrection ||
        calculationType === CalculationOption.PostFixedOnBalanceWithInstallmentCorrection) && (
        <>
          <label htmlFor="correctionRate"/>
          Taxa de correção:
          <input 
            type="number"
            id="correctionRate"
            value={correctionRate}
            onChange={(e) => setCorrectionRate(Number(e.target.value))}
          />
        </>
      )}
    </form>
  );
}

export default Form;


