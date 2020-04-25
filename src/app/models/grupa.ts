import {Seria} from 'src/app/models/seria'
import {Major} from 'src/app/models/major'
export interface Grupa {
    id:number,
    seria: Seria,
    number: number
    major: Major
  }