"use client";

import ButtonForm from "@/components/buttonForm";
import InputForm from "@/components/inputForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const validateForm = () => {
    if (inputs.name < 2) {
      setErrorMessage("이름은 2글자 이상이어야 합니다.");
      return false;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(inputs.email)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if (inputs.nickname < 2) {
      setErrorMessage("닉네임은 2글자 이상이어야 합니다.");
      return false;
    }
    if (inputs.password < 8) {
      setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // console.log(inputs);
    // router.push("/login");
    alert("회원가입 준비 중입니다.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        <form onSubmit={handleSignUp} className="flex flex-col justify-center">
          <InputForm
            label="NAME"
            type="text"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            className="mb-2"
          />
          <InputForm
            label="EMAIL"
            type="email"
            name="email"
            placeholder="moving@movie.com"
            value={inputs.email}
            onChange={handleChange}
            className="mb-2"
          />
          <InputForm
            label="NICKNAME"
            type="text"
            name="nickname"
            placeholder="nickname"
            value={inputs.nickname}
            onChange={handleChange}
            className="mb-2"
          />
          <InputForm
            label="PASSWORD"
            type="password"
            name="password"
            placeholder="●●●●●●●●"
            value={inputs.password}
            onChange={handleChange}
            className="mb-2"
          />
          <InputForm
            label="CONFIRM PASSWORD"
            type="password"
            name="confirmPassword"
            placeholder="●●●●●●●●"
            value={inputs.confirmPassword}
            onChange={handleChange}
            className="mb-2"
          />
          {errorMessage && (
            <span className="flex justify-center text-sm text-red-500">
              {errorMessage}
            </span>
          )}
          <ButtonForm
            type="submit"
            disabled={
              !inputs.name ||
              !inputs.email ||
              !inputs.nickname ||
              !inputs.password ||
              !inputs.confirmPassword
            }
            className={"my-4"}
          >
            SIGN UP
          </ButtonForm>
        </form>

        <div className="mt-2 text-sm flex justify-evenly items-center">
          <span className="text-textInactive">이미 계정이 있으신가요?</span>
          <Link href={"/login"} className="text-bold hover:underline">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
