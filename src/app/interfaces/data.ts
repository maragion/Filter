import { User } from './user';
import { UserData} from "./user-data";

export interface Data {
  data: UserData[],
  page: {
    total: number,
    current: number,
    size: number
  },
  users: User[]
}
