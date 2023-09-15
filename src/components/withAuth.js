import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
// import NotAccess from "./NotAccess";
const NotAccess = lazy(() => import('./NotAccess'));


const withAuth = (WrappedComponent) => {

  return (props) => {
    const reduxToken = useSelector((state) => state?.auth?.token);
  
    

    // Simulating authentication logic
    const isAuthenticated = reduxToken!==undefined&&reduxToken!==""?true:false;
    


    // Render the wrapped component if authenticated
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return <NotAccess/>
  };
};

export default withAuth;
