import {Faculty} from 'src/app/models/faculty'
export interface Major {
    id:number,
    name: string
    faculty: Faculty
  }