import {UserForm} from 'src/app/models/userForm'
import {Grupa} from 'src/app/models/grupa'
import {Faculty} from 'src/app/models/faculty'
import {Major} from 'src/app/models/major'
export interface StudentForm {
    user: UserForm,
    sin: number,
    father_initial: string,
    cnp: number,
    grupa: Grupa
  }