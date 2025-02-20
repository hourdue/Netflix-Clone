import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";


export const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return element;
  };
  
  export const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    if (isAuthenticated()) {
      return <Navigate to="/home" replace />;
    }
    return element;
  };
  