const useToken = () => {
  const token = localStorage.getItem("token");

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
  };

  return {
    token,
    setToken,
    clearToken,
  };
};

export default useToken;
