export const emailValidate = (email) => {
    let pattern = new RegExp(
       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
    );
 
    return pattern.test(email);
 };

 export const validatePassword = (fieldName, fields, form_errors) => {
    let isPasswordValid = true;
    let validate = new RegExp(/^.*(?=.{6,})(?=.*\d?)(?=.*[a-zA-Z]).*$/);
    let field = fields[fieldName];

    if (!isEmpty(field)) {
        if (!field.match(validate)) {
            form_errors[fieldName] = "At least six characters, including at least one letter";
            isPasswordValid = false;
        }
    } else {
        form_errors[fieldName] = "Empty password";
        isPasswordValid = false;
    }

    return isPasswordValid;
};

export const validateConfirmPassword = (form_errors, password, password2) => {
    let isConfirmed = true;

    if (password !== password2) {
        form_errors['password'] = "Passwords do not match";
        form_errors['password2'] = "Passwords do not match";
        isConfirmed = false;
    }

    return isConfirmed;
};

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
