
const emailValidationRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkEmailValidation = value => emailValidationRegExp.test(value);

const checkPasswordValidation = value => {
    // const regExp = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // return regExp.test(value);
    return true;
};

const checkConfirmPasswordValidation = (value, passwordValue) => {
    return checkPasswordValidation(value) && value === passwordValue;
};

export {
    checkEmailValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
};
