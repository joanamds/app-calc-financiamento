import { useContext } from 'react';
import LoanContext from '../context/LoanContext';

function Table() {
  const { totalCalculation } = useContext(LoanContext);

  return (
    <div>
      <h1>Tabela de Detalhes das Parcelas</h1>
      <table>
        <thead>
          <tr>
            <th>Número da Parcela</th>
            <th>Data de Pagamento</th>
            <th>Principal</th>
            <th>Juros</th>
            <th>Correção</th>
            <th>Pagamento Total</th>
            <th>Saldo Restante</th>
          </tr>
        </thead>
        <tbody>
          {totalCalculation.map((installment, index) => (
            <tr key={index}>
              <td>{installment.installmentNumber}</td>
              <td>{installment.paymentDate}</td>
              <td>{installment.principal}</td>
              <td>{installment.interest}</td>
              <td>{installment.correction}</td>
              <td>{installment.totalPayment}</td>
              <td>{installment.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
