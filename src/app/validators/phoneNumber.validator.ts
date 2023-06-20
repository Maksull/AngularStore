import { AbstractControl } from "@angular/forms";

export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    // const phoneNumberRegex = /^(\+380)\d{9}$/;
    const phoneNumberRegex = /^\d{10}$/;

    return phoneNumberRegex.test(control.value) ? null : { invalidEmail: true };
}