import {UserForm} from 'src/app/models/userForm';
import {Grupa} from 'src/app/models/grupa';
import {Faculty} from 'src/app/models/faculty';
import {Major} from 'src/app/models/major';


export interface Secretary {
    user: UserForm;
    faculty: Faculty;
}
