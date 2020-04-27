import {Seria} from 'src/app/models/seria';
import {Major} from 'src/app/models/major';
export class Grupa {
    id: number;
    seria: Seria = new Seria();
    number: number;
    major: Major = new Major();
  }