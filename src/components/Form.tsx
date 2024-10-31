import { useState, useContext } from "react";
import { CalculationOption } from "../calculations/types/CalculationOption";
import LoanContext from "../context/LoanContext";
import { PreFixedOnBalance,
  PreFixedOnInstallment,
  PostFixedOnBalanceWithCorrection,
  PostFixedOnBalanceWithInstallmentCorrection,
  PostFixedOnInstallmentWithCorrection
} from "../calculations";

function Form(): JSX.Element {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<string>("");
  const [installmentCount, setInstallmentCount] = useState<number>(0);
  const [loanMonth, setLoanMonth] = useState<number>(0);
  const [loanYear, setLoanYear] = useState<number>(0);
  const [calculationType, setCalculationType] = useState<CalculationOption>(CalculationOption.PreFixedOnBalance);
  const [correctionRate, setCorrectionRate] = useState<number>(0);
  const { setTotalCalculation } = useContext(LoanContext);

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

  const handleClick = () => {
    let calculator;

    switch (calculationType) {
      case CalculationOption.PreFixedOnBalance:
        calculator = new PreFixedOnBalance(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear
        );
        break;
      case CalculationOption.PreFixedOnInstallment:
        calculator = new PreFixedOnInstallment(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear
        );
        break;
      case CalculationOption.PostFixedOnBalanceWithCorrection:
        calculator = new PostFixedOnBalanceWithCorrection(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear,
          correctionRate
        );
        break;
      case CalculationOption.PostFixedOnInstallmentWithCorrection:
        calculator = new PostFixedOnInstallmentWithCorrection(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear,
          correctionRate
        );
        break;
      case CalculationOption.PostFixedOnBalanceWithInstallmentCorrection:
        calculator = new PostFixedOnBalanceWithInstallmentCorrection(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear,
          correctionRate
        );
        break;
      default:
        calculator = new PreFixedOnBalance(
          loanAmount,
          Number(interestRate),
          installmentCount,
          loanMonth,
          loanYear
        );
    }

    const installmentDetails = calculator.calculateInstallments(
      loanAmount,
      Number(interestRate),
      installmentCount,
      loanMonth,
      loanYear,
      correctionRate
    );

    console.log(installmentDetails);
    setTotalCalculation(installmentDetails);
  };

  return (
    <form className="form-content">
      <label htmlFor="loanAmount"/>
      Valor do empréstimo: 
      <input 
        type="number"
        id="loanAmount"
        value={loanAmount === 0 ? "" : loanAmount}
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
        value={installmentCount === 0 ? "" : installmentCount}
        onChange={(e) => setInstallmentCount(Number(e.target.value))}
      />
      <label htmlFor="loanMonth"/>
      Mês do empréstimo:
      <input 
        type="number"
        id="loanMonth"
        value={loanMonth === 0 ? "" : loanMonth}
        onChange={(e) => setLoanMonth(Number(e.target.value))}
      />
      <label htmlFor="loanYear"/>
      Ano do empréstimo:
      <input 
        type="number"
        id="loanYear"
        value={loanYear === 0 ? "" : loanYear}
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
            value={correctionRate === 0 ? "" : correctionRate}
            onChange={(e) => setCorrectionRate(Number(e.target.value))}
          />
        </>
      )}

      <button type="button" onClick={handleClick}>Calcular</button>
    </form>
  );
}

export default Form;


