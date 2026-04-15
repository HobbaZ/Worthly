export let EmailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isInvalid = (formInput) =>
  !EmailRegex.test(formInput.email) || formInput.password.length < 8;

export const isUpdateUserInvalid = (formInput) =>
  formInput.username.length < 2 || !EmailRegex.test(formInput.email);
