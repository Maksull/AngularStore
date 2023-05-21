import { AbstractControl } from "@angular/forms";

export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumberRegex = /^(\+380)\d{9}$/;;

    return phoneNumberRegex.test(control.value) ? null : { invalidEmail: true };
}