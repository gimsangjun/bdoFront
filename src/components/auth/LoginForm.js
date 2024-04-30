import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tw from "twin.macro";

export default function LoginForm({ type, onLogin, sessionID, status, onSignUp }) {
  // const type = "login" or "register"
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const { username, password, passwordConfirm } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (status === 200) {
      // 로그인 성공
      // 백엔드 서버에서 해주었기 때문에 굳이 처리안해줘도 된다.
      // setCookie("sessionID", sessionID, 1);
      navigate("/");
    }
    if (status === 401) {
      // 로그인 실패
    }
    if (status === 201) {
      // 회원가입 성공
      navigate("/login");
    }
    if (status === 400) {
      // 이미 존재하는 유저
    }
    if (status === 500) {
      // 회원가입중 오류 발생
    }
  }, [status, navigate, sessionID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "signup") {
      // 회원가입
      if (password !== passwordConfirm) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        onSignUp(username, password);
      }
    } else {
      // 로그인
      setPasswordError("");
      onLogin(username, password);
    }
    setFormData({ username: "", password: "", passwordConfirm: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border border-gray-300 rounded-md shadow-md p-6 w-96">
        <h1 className="text-2xl font-bold mb-6">{type === "register" ? "회원가입" : "로그인"}</h1>
        {status === 401 && <ErrorMsg>로그인이 실패하였습니다.</ErrorMsg>}
        {status === 400 && <ErrorMsg>이미 존재하는 유저 입니다.</ErrorMsg>}
        {status === 500 && <ErrorMsg>알수 없는 오류 발생</ErrorMsg>}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel htmlFor="username">아이디:</InputLabel>
            <InputField
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="ID를 입력하세요."
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="password">비밀번호:</InputLabel>
            <InputField
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요."
            />
          </InputWrapper>
          {type === "signup" && (
            <InputWrapper>
              <InputLabel htmlFor="passwordConfirm">비밀번호 확인:</InputLabel>
              <InputField
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요."
              />
            </InputWrapper>
          )}
          {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}
          <SubmitButton type="submit">{type === "login" ? "로그인" : "회원가입"}</SubmitButton>
        </form>
        <div className="mt-4 text-center">
          {type === "login" && (
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const ErrorMsg = tw.p`text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 mb-4`;
const InputWrapper = tw.div`mb-4`;
const InputLabel = tw.label`block text-gray-700 font-semibold mb-2`;
const InputField = tw.input`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500`;
const SubmitButton = tw.button`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700`;
