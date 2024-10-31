import { useContext } from 'react';
import LoanContext from '../context/LoanContext';
import { Table } from 'reactstrap';

function LoanTable() {
  const { totalCalculation } = useContext(LoanContext);

  return (
    <div>
      {totalCalculation.length > 0 && (
          <div>
          <Table className="table-content">
            <thead>
              <tr>
                <th>Número da Parcela</th>
                <th>Data de Pagamento</th>
                <th>Principal</th>
                <th>Juros</th>
                { totalCalculation[1].correction && <th>Correção</th> }
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
                  { installment.correction && <td>{installment.correction}</td> }
                  <td>{installment.totalPayment}</td>
                  <td>{installment.balance}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>)
      }
    </div>
  );
}

export default LoanTable;
