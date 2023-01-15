export const validateEmailTemplate = (code, userName) => {
  return `
        Hi ${userName}!
        Your verification code is ${code}.
    `;
};
