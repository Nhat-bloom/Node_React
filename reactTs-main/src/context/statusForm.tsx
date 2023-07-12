import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Iprop {
  children: JSX.Element | JSX.Element[];
}
interface IContextForm {
  status: string;
  handleChangeStatus(status: string): void;
}
const FormContext = createContext<IContextForm | null>(null);

const FormContextProvider = ({ children }: Iprop) => {
  const [status, setStatus] = useState<string>("signup");
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("login")) {
      setStatus("login");
    } else {
      setStatus("signup");
    }
  }, [pathname]);
  const handleChangeStatus = (status: string) => {
    setStatus(status);
  };
  const values = {
    status,
    handleChangeStatus,
  };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export { FormContext, FormContextProvider };
