
const emailValidationRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordValidationRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const checkEmailValidation = value => emailValidationRegExp.test(value);

// Check if password length is greater than 8, has at least 1 Uppercase 1 Lowercase and 1 digit
const checkPasswordValidation = pass => passwordValidationRegExp.test(pass)

const checkConfirmPasswordValidation = (value, passwordValue) =>
    checkPasswordValidation(value) && value === passwordValue;

export {
    checkEmailValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
};
