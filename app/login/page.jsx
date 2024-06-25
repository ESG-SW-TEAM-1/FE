"use client";

import ButtonForm from "@/components/buttonForm";
import InputForm from "@/components/inputForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LogInPage = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(inputs.email)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (inputs.password.length < 8) {
      setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }
    setErrorMessage("");

    // console.log(inputs);
    // router.push("/");
    alert("로그인 준비 중입니다.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        <form onSubmit={handleLogin} className="flex flex-col justify-center">
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
            label="PASSWORD"
            type="password"
            name="password"
            placeholder="●●●●●●●●"
            value={inputs.password}
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
            disabled={!inputs.email || !inputs.password}
            className="my-4"
          >
            LOGIN
          </ButtonForm>
        </form>

        <div className="mt-2 text-sm flex justify-evenly items-center">
          <span className="text-textInactive">아직 계정이 없으신가요?</span>
          <Link href={"/signup"} className="text-bold hover:underline">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
