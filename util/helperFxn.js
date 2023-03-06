export const loggedInFxn = function () {
  const authInfo = localStorage.getItem("authObject");
  const authInfoJson = JSON.parse(authInfo);
  return authInfoJson;
};
