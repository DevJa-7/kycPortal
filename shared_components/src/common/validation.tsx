/**
 * Email validation
 * @param value
 */
export const isValidEmail = (value: string) => {
  const regexp = new RegExp(
    /(^(?=.{1,64}@)([_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+(\.[_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+)*))@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
  );
  return regexp.test(value);
};

/**
 * Mobile number with prefix '+' followed by country code
 * @param value
 */
export const isValidMobile = (value: string) => {
  const phoneno = /^\+?([0-9]{2})\)?([0-9]{9})$/;
  return value.match(phoneno);
};

/**
 * Only Alphabetics and space
 * @param value
 */
export const isValidName = (value: string) => {
  const alphaLetters = /^[a-zA-Z'_ ]*$/; // /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  return value.match(alphaLetters);
};

/**
 * Have one Uppercase
 * @param value
 */
export const hasUppercase = (value: string) => {
  const regexp = new RegExp(/[A-Z]/);
  return regexp.test(value);
};

/**
 * Have one Lowercase
 * @param value
 */
export const hasLowercase = (value: string) => {
  const regexp = new RegExp(/[a-z]/);
  return regexp.test(value);
};

/**
 * Have one Number
 * @param value
 */
export const hasNumber = (value: string) => {
  const regexp = new RegExp(/[0-9]/);
  return regexp.test(value);
};

/**
 * Have one special character
 * @param value
 */
export const hasSpecialCharacter = (value: string) => {
  const regexp = new RegExp(/[~`!@#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/);
  return regexp.test(value);
};
