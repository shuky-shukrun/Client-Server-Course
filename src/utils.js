const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  var res = true;

  if (password.length < 8) res = false;

  var upperCaseLetters = /[A-Z]/g;
  var lowerCaseLetters = /[a-z]/g;
  if (!password.match(upperCaseLetters) && !password.match(lowerCaseLetters))
    res = false;

  var numLetters = /[0-9]/g;
  if (!password.match(numLetters)) res = false;

  return res;
};

const validateString = (str) => {
  return String(str)
    .toLowerCase()
    .match(/^[A-Za-z]+$/);
};

const validateEmptyFields = (arr) => {
  return arr.every((input) => input.trim() !== "");
};

const SPECIAL_LETTERS = `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?`;

export {
  validatePassword,
  validateString,
  validateEmail,
  validateEmptyFields,
  SPECIAL_LETTERS,
};
