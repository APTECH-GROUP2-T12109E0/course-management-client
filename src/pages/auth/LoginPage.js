import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
//*** Nguyễn Code***
// import { useDispatch, useSelector } from "react-redux";
//***END Nguyễn Code***
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AlertAntCom } from "../../components/ant/index";
import { ButtonCom } from "../../components/button";
import FormGroupCom from "../../components/common/FormGroupCom";
import { HeadingFormH1Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import {
  MESSAGE_EMAIL_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_VERIFY_SUCCESS,
} from "../../constants/config";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";
import { onLogin } from "../../store/auth/authSlice";
//*** Nguyễn Code***
// import { selectLoginIsSuccess } from "../../store/login/selector";
//*** END Nguyễn Code***
import OAuth2Page from "./OAuth2Page";

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED ?? "This fields is required")
    .email(MESSAGE_EMAIL_INVALID ?? "Invalid email"),
  password: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED ?? "This fields is required"),
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

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const isVerify = searchParams.get("verify"); //=== "verified";
  const { value: isRemember, handleToggleBoolean: handleToggleRemember } =
    useClickToggleBoolean();

  const handleLogin = (values) => {
    setIsLoading(!isLoading);
    dispatch(onLogin(values));

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2300);
  };

  return (
    <>
      {!isVerify ? null : isVerify === "success" ? (
        <AlertAntCom type="success" msg={MESSAGE_VERIFY_SUCCESS} />
      ) : (
        <AlertAntCom type="success" msg="Email have already actived" />
      )}
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
        <OAuth2Page />
        <p className="mt-4 mb-0">
          Don't have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
