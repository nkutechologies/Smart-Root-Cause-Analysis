export const generateRandomString = () => {
  return (Math.random() * 10).toString(36).substring(2, 12);
};
