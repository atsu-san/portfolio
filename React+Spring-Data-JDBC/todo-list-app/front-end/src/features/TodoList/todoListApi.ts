export type TTodo = {
  /** Todo Id */
  id: string;
  /** Todo Name */
  name: string;
  /** Todo Type (0: Work, 1: Home, 2: Other) */
  type: number;
  /** Progress  (0: Not done, 1: Done) */
  status: number;
  /** Scheduled Start Time */
  startAt: string;
  /** Scheduled End Time */
  endAt: string;
};

import { useApi } from "../../utils/useApi";
const { Api } = useApi({ path: "todos" });
export default new Api<TTodo>();
