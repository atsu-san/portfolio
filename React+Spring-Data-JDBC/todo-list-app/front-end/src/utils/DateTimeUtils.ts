import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../constants/constants";

export class DateTimeUtils {
  static getDateTimeStr(dateTime: string, format?: string): string {
    const dayjsTime = dayjs(dateTime);
    return dayjsTime.isValid()
      ? dayjsTime.format(format ?? DATE_TIME_FORMAT)
      : "";
  }
}
