import { createContext, useContext } from "react";
import useApi from "./useApi";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const fetchListings = (page = 1, filters) => {
    fetchData(
      `/new-listings?page=${page}`,
      {
        method: "GET",
        params: { ...filters },
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data);
          setPagination(res?.pagination); // Store pagination info
          setCurrentPage(res?.pagination?.current_page);
        }
      }
    );
  };
  const values = {
    fetchListings,
    properties,
    setProperties,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
