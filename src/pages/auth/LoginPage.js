import React, { useState } from "react";
import LayoutAuthentication from "../../layouts/LayoutAuthentication";
import { HeadingFormH1Com, HeadingFormH5Com } from "../../components/heading";
import FormGroupCom from "../../components/common/FormGroupCom";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { CheckBoxCom } from "../../components/checkbox";
import { ButtonCom, ButtonSocialCom } from "../../components/button";
import { IconFacebookCom, IconGmailCom } from "../../components/icon";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AlertAntCom } from "../../components/ant";

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    )
    .email(process.env.REACT_APP_MESSAGE_EMAIL ?? "Invalid email"),
  password: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
});

const LoginPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values;
    setIsError(false);
    setIsLoading(!isLoading);
    // If Login correct
    if (email === "admin@gmail.com" && password === "123456") {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    }

    // If Login Wrong, remove loading
    setTimeout(() => {
      setIsLoading(false);
      setIsError(true);
    }, 1000);
  };

  return (
    <LayoutAuthentication>
      {isError && <AlertAntCom type="error" message="Invalid Username or Password !"></AlertAntCom>}
      <form className="theme-form" onSubmit={handleSubmit(handleLogin)}>
        {/* <HeadingFormH1Com className="text-center !text-[#818cf8] font-tw-primary font-light mb-3">
          Sign in your account
        </HeadingFormH1Com> */}
        {/* <HeadingFormH5Com>Login your account</HeadingFormH5Com> */}
        <HeadingFormH1Com>Login Page</HeadingFormH1Com>
        <FormGroupCom>
          <LabelCom htmlFor="email">Email Address</LabelCom>
          <InputCom
            type="text"
            control={control}
            name="email"
            register={register}
            placeholder="test123@gmail.com"
            errorMsg={errors.email?.message}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="password">Password</LabelCom>
          <InputCom
            type="password"
            control={control}
            name="password"
            register={register}
            placeholder="Input your password"
            isTypePassword={true}
            errorMsg={errors.password?.message}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <div className="form-group mb-0">
            <div className="checkbox p-0">
              <input id="checkbox1" type="checkbox" />
              <label className="text-muted" htmlFor="checkbox1">
                Remember password
              </label>
            </div>
            <div>
              <a className="link" href="forget-password.html">
                Forgot password?
              </a>
            </div>
          </div>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Login
          </ButtonCom>
        </FormGroupCom>
        <h6 className="text-muted mt-4 or">Or login with</h6>
        <div className="social mt-4">
          <div className="btn-showcase">
            <ButtonSocialCom url="https://www.gmail.com/">
              <div className="flex justify-center items-center">
                <IconGmailCom></IconGmailCom>
                <span className="ml-1">Gmail</span>
              </div>
            </ButtonSocialCom>
            <ButtonSocialCom url="https://www.linkedin.com/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-linkedin txt-linkedin inline"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </ButtonSocialCom>

            <ButtonSocialCom url="https://www.facebook.com/" className="">
              <IconFacebookCom></IconFacebookCom>
              <span>Facebook</span>
            </ButtonSocialCom>
          </div>
        </div>
        <p className="mt-4 mb-0">
          Not yet have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </LayoutAuthentication>
  );
};

export default LoginPage;
