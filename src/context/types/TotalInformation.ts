import { InstallmentDetail } from "../../calculations/types/InstallmentDetail";
import { Dispatch, SetStateAction } from "react";

export default interface TotalInformation {
  totalCalculation: InstallmentDetail[]
  setTotalCalculation: Dispatch<SetStateAction<InstallmentDetail[]>>;
}