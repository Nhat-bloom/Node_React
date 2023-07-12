import { theme } from "antd";

const useMyToken = () => {
  const { token } = theme.useToken();
  return {
    ...token,
    colorBgContainer: "#4D455D",
    colorText: "#F5E9CF",
    colorPrimary: "#E96479",
    colorLinkActive:"#7DB9B6",
    colorTextDisabled:"#E96479"
  };
};

export default useMyToken;
