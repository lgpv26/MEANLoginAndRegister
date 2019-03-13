import { ValidatorFn, FormGroup } from '@angular/forms';

export const confirmPassword: ValidatorFn = (formGroup: FormGroup) => {
    const password = formGroup.get('password').value
    const password2 = formGroup.get('confirmPassword').value

    if(password + password2) {
        return password !== password2 ? {confirmPassword: true} : null
    } else {
        return null
    }
}