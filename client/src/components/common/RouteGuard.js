import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();
// console.log(history)

export const RouteGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  // console.log("RouteGuard isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return children ? children : <Outlet />;
};

/*
 When using React Router, manually changing the URL in the browser's
address bar can cause a page refresh or a full page reload,
which can result in loss of state and disrupt the user experience.
To prevent this behavior, you can use the HTML5 history API to update
the URL without triggering a page refresh. This can be done by setting
the history prop of your Router component to history object created with
createBrowserHistory function from the history package. 
*/
