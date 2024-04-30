import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import { login, signUp } from "../modules/auth";
import LoadingPage from "../pages/LoadingPage";

export default function LoginContainer({ type }) {
  const { sessionID, loading, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogin = (username, password) => dispatch(login(username, password));
  const onSignUp = (username, password) => dispatch(signUp(username, password));

  return loading ? (
    <LoadingPage />
  ) : (
    <LoginForm
      type={type}
      onLogin={onLogin}
      status={status}
      sessionID={sessionID}
      onSignUp={onSignUp}
    />
  );
}
