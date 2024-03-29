import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function compareTwoValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (!control || !matchingControl) {
            // Return if controls are not found in form group
            return null;
        }

        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            // Return if another validator has already found an error on the matchingControl
            return null;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
            return { confirmedValidator: true };
        } else {
            matchingControl.setErrors(null);
            return null;
        }
    };
}