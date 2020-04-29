import {Faculty} from 'src/app/models/faculty'
export class Major {
    id: number;
    name: string;
    faculty: Faculty = new Faculty();
  }