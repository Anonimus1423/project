export const forgetPasswordEmailTemplate = (link, userName) => {
  return `
          Hi ${userName}!
          Please go here for change your password
          <a href="${link}">Click Here</a>
      `;
};
