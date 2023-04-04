export const generateSlug = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth();
  const day = dateNow.getDate();
  const hour = dateNow.getHours();
  const minute = dateNow.getMinutes();
  const seconds = dateNow.getSeconds();
  const miliSeconds = dateNow.getMilliseconds();
  return `${year}-${month}-${day}/${hour}-${minute}-${seconds}-${miliSeconds}`;
};
