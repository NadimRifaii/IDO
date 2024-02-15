import { useDispatch, useSelector } from "react-redux";
import { extractUserSlice, setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthComponent = () => {
  const user = useSelector(extractUserSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return !user.email ? <Navigate to={'/'} /> : <Outlet />;
};

export default AuthComponent;
