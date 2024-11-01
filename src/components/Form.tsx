import { useState, useContext, useRef } from "react";
import { CalculationOption } from "../calculations/types/CalculationOption";
import LoanContext from "../context/LoanContext";
import { Input, Label, Form, Button, Row, Col, FormGroup, InputGroupText, InputGroup} from 'reactstrap';
import { PreFixedOnBalance, PreFixedOnInstallment, PostFixedOnBalanceWithCorrection, PostFixedOnBalanceWithInstallmentCorrection, PostFixedOnInstallmentWithCorrection } from "../calculations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

function LoanForm(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<string>("");
  const [installmentCount, setInstallmentCount] = useState<number>(0);
  const [loanMonth, setLoanMonth] = useState<number>(0);
  const [loanYear, setLoanYear] = useState<number>(0);
  const [calculationType, setCalculationType] = useState<CalculationOption>(CalculationOption.PreFixedOnBalance);
  const [correctionRate, setCorrectionRate] = useState<number>(0);
  const { totalCalculation, setTotalCalculation } = useContext(LoanContext);

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace("%", "").replace(",", ".");
    setInterestRate(input);
  };

  const handleReset = () => {
    formRef.current?.reset();
    setLoanAmount(0);
    setInterestRate("");
    setInstallmentCount(0);
    setCalculationType(CalculationOption.PreFixedOnBalance);
    setLoanMonth(0);
    setLoanYear(0);
    setCorrectionRate(0);
    setTotalCalculation([]);  
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
        calculator = new PreFixedOnBalance(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear);
        break;
      case CalculationOption.PreFixedOnInstallment:
        calculator = new PreFixedOnInstallment(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear);
        break;
      case CalculationOption.PostFixedOnBalanceWithCorrection:
        calculator = new PostFixedOnBalanceWithCorrection(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear, correctionRate);
        break;
      case CalculationOption.PostFixedOnInstallmentWithCorrection:
        calculator = new PostFixedOnInstallmentWithCorrection(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear, correctionRate);
        break;
      case CalculationOption.PostFixedOnBalanceWithInstallmentCorrection:
        calculator = new PostFixedOnBalanceWithInstallmentCorrection(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear, correctionRate);
        break;
      default:
        calculator = new PreFixedOnBalance(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear);
    }

    const installmentDetails = calculator.calculateInstallments(loanAmount, Number(interestRate), installmentCount, loanMonth, loanYear, correctionRate);
    setTotalCalculation(installmentDetails);
  };

  return (
    <Form className="form-content mt-4">
      <Row>
        <Col md="4">
          <FormGroup>
            <Label htmlFor="loanAmount">Valor do Empréstimo:</Label>
            <Input type="number" id="loanAmount" value={loanAmount || ""} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </FormGroup>
        </Col>
        <Col md="4">
        <FormGroup>
            <Label htmlFor="interestRate">Taxa de Juros:</Label>
            <InputGroup>
              <Input type="number" id="interestRate" value={interestRate} onChange={handleInterestRateChange} />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label htmlFor="installmentCount">Número de Parcelas:</Label>
            <Input type="number" id="installmentCount" value={installmentCount || ""} onChange={(e) => setInstallmentCount(Number(e.target.value))} />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <FormGroup>
            <Label htmlFor="loanMonth">Mês do Empréstimo:</Label>
            <Input type="number" id="loanMonth" value={loanMonth || ""} onChange={(e) => setLoanMonth(Number(e.target.value))} />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label htmlFor="loanYear">Ano do Empréstimo:</Label>
            <Input type="number" id="loanYear" value={loanYear || ""} onChange={(e) => setLoanYear(Number(e.target.value))} />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label htmlFor="calculationType">Opções de Cálculo:</Label>
            <Input type="select" id="calculationType" value={calculationType} onChange={(e) => setCalculationType(e.target.value as CalculationOption)}>
              {Object.entries(CalculationOptionTitles).map(([key, title]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      {(calculationType === CalculationOption.PostFixedOnBalanceWithCorrection ||
        calculationType === CalculationOption.PostFixedOnInstallmentWithCorrection ||
        calculationType === CalculationOption.PostFixedOnBalanceWithInstallmentCorrection) && (
        <Row>
          <Col md="4">
            <FormGroup>
              <Label htmlFor="correctionRate">Taxa de Correção:</Label>
              <Input type="number" id="correctionRate" value={correctionRate || ""} onChange={(e) => setCorrectionRate(Number(e.target.value))} />
            </FormGroup>
          </Col>
        </Row>
      )}
      <Button color="primary" onClick={handleClick} className="button-spacing">
        Calcular
      </Button> 
      {
        totalCalculation.length > 0 && (
          <Button onClick={ handleReset } className="button-spacing">
            Refazer
            <FontAwesomeIcon icon={ faRedo } />
          </Button>
        )
      }
    </Form>
  );
}

export default LoanForm;
