import { InstallmentDetail } from "../../calculations/types/InstallmentDetail";

export default interface TotalInformation {
  totalCalculation: InstallmentDetail[]
  setTotalCalculation: React.Dispatch<React.SetStateAction<InstallmentDetail[]>>
}