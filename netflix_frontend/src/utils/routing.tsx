import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { useState, useEffect } from "react";

export const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    isAuthenticated().then(setIsAuthed);
  }, []);

  if (isAuthed === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export const PublicRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    isAuthenticated().then(setIsAuthed);
  }, []);

  if (isAuthed === null) {
    return <div>Loading...</div>;
  }

  if (isAuthed) {
    return <Navigate to="/home" replace />;
  }

  return element;
};
