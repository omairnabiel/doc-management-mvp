export const isLogin = () => {
  if (localStorage.token) {
    return true;
  }
  return false;
};
