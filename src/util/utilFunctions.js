export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));
