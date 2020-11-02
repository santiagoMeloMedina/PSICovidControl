
import { FormGroup } from '@angular/forms';

export const CONSTANTS = {
    MATCH: (group: FormGroup) => { 
        let pass = group.get('password').value;
        let confirmPass = group.get('confirm_password').value;
        return pass === confirmPass ? null : { notSame: true }     
    }
}