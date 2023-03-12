export const  validatePhone = (data) => {
  let regExp = new RegExp('^1\\d{10}$');
  return regExp.test(data)
};