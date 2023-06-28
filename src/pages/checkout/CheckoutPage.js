import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH3Com } from "../../components/heading";
import { InputReadOnly } from "../../components/input";
import { LabelCom } from "../../components/label";
import { TextAreaCom } from "../../components/textarea";

// **** Mui ****
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DividerCom from "../../components/common/DividerCom";
import { MESSAGE_FIELD_REQUIRED, NOT_FOUND_URL } from "../../constants/config";
import { selectAllCourseState } from "../../store/course/courseSelector";
import { convertIntToStrMoney, showMessageError } from "../../utils/helper";
import { API_CHECKOUT_URL } from "../../constants/endpoint";
import { axiosBearer } from "../../api/axiosInstance";
import { toast } from "react-toastify";

const schemaValidation = yup.object().shape({
  payment_method: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .oneOf(["MOMO", "PAYPAL"], "Only accept payment method: MOMO or PAYPAL"),
});

const CheckoutPage = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [paymentMethod, setPaymentMethod] = useState("MOMO");

  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector(selectAllCourseState);
  const courseBySlug = data.find((item, index) => item.slug === slug);
  useEffect(() => {
    if (!courseBySlug) navigate(NOT_FOUND_URL);
  }, [courseBySlug]);

  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethod = (e) => {
    const selectedPaymentMethod = e.target.value;
    console.log("value: ", selectedPaymentMethod);
    setPaymentMethod(selectedPaymentMethod);
    setValue("payment_method", selectedPaymentMethod);
  };

  const handleSubmitForm = async (values) => {
    //API Thiếu Description
    console.log(values);
    try {
      setIsLoading(!isLoading);
      const res = await axiosBearer.post(API_CHECKOUT_URL, {
        amount:
          courseBySlug?.price === 0
            ? 0
            : courseBySlug?.net_price > 0
            ? courseBySlug?.net_price
            : courseBySlug?.price,
        userId: user?.id,
        courseId: courseBySlug?.id,
        paymentType: values.payment_method,
      });
      console.log("res: ", res);
      toast.success(`${res.data.message}`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeadingH1Com>Payment Details</HeadingH1Com>
      <GapYCom></GapYCom>
      <div className="card">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="card-body">
            <div className="row">
              <div className="checkout-user-detail col-xl-6 col-sm-12">
                {/* <div className="row">
                  <div className="col-sm-12">
                    <div className="title-box">
                      <h3 className="text-2xl font-bold text-[#444] pb-[1.25rem]">
                        Customer Details
                      </h3>
                      <hr className="text-gray-400"></hr>
                    </div>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom> */}
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom htmlFor="first_name">First Name</LabelCom>
                    <InputReadOnly name="first_name" value={user?.first_name} />
                    {/* <InputCom
                      type="text"
                      control={control}
                      name="first_name"
                      register={register}
                      placeholder="First Name"
                      errorMsg={errors.first_name?.message}
                      value={user?.first_name}
                    ></InputCom> */}
                  </div>
                  <div className="col-sm-6">
                    <LabelCom htmlFor="last_name">Last Name</LabelCom>
                    <InputReadOnly name="last_name" value={user?.last_name} />
                    {/* <InputCom
                      type="text"
                      control={control}
                      name="last_name"
                      register={register}
                      placeholder="Last Name"
                      errorMsg={errors.last_name?.message}
                      value={user?.last_name}
                    ></InputCom> */}
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  {/* <div className="col-sm-6">
                    <LabelCom htmlFor="phone">
                      Phone
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="phone"
                      register={register}
                      placeholder="0902xxxxxx"
                      errorMsg={errors.phone?.message}
                    ></InputCom>
                  </div> */}
                  <div className="col-sm-12">
                    <LabelCom htmlFor="email">Email</LabelCom>
                    <InputReadOnly name="email" value={user?.email} />
                    {/* <InputCom
                      type="text"
                      control={control}
                      name="email"
                      register={register}
                      placeholder="test123@gmail.com"
                      errorMsg={errors.email?.message}
                    ></InputCom> */}
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-12">
                    <LabelCom htmlFor="description">Noted</LabelCom>
                    <TextAreaCom
                      name="description"
                      control={control}
                      register={register}
                      placeholder="Write your noted..."
                    ></TextAreaCom>
                  </div>
                </div>
              </div>
              <div className="checkout-order-detail col-xl-6 col-sm-12">
                <div className="checkout-details">
                  <div className="order-box">
                    <div className="title-box">
                      <div className="checkbox-title items-center">
                        <h4>Course</h4>
                        <span>Total</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <HeadingH3Com className="bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent hover:text-black flex-1">
                        {courseBySlug?.name}
                      </HeadingH3Com>
                      <span>
                        {courseBySlug?.price === 0
                          ? "Free"
                          : courseBySlug?.net_price > 0
                          ? `$${convertIntToStrMoney(courseBySlug?.net_price)}`
                          : `$${convertIntToStrMoney(courseBySlug?.price)}`}
                      </span>
                    </div>
                    <DividerCom></DividerCom>
                    {/* <ul className="qty">
                      <li>
                        <h3 className="bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent !text-lg !font-bold">
                          Become Master PHP
                        </h3>
                        <span>$300</span>
                      </li>
                    </ul> */}
                    {/* <ul className="sub-total">
                      <li>
                        Subtotal <span className="count">$300</span>
                      </li>
                    </ul> */}
                    <ul className="sub-total total">
                      <li className="!font-bold">
                        Total{" "}
                        <span className="count !font-bold">
                          {courseBySlug?.price === 0
                            ? "Free"
                            : courseBySlug?.net_price > 0
                            ? `$${convertIntToStrMoney(
                                courseBySlug?.net_price
                              )}`
                            : `$${convertIntToStrMoney(courseBySlug?.price)}`}
                        </span>
                      </li>
                    </ul>
                    <div className="animate-chk">
                      <div className="row">
                        <div className="col">
                          {/* Radio Group Checkout Online */}
                          <FormControl>
                            <LabelCom htmlFor="payment_method">
                              Payment Methods
                            </LabelCom>
                            <RadioGroup
                              id="payment_method"
                              aria-labelledby="payment_method"
                              // defaultValue="MOMO"
                              name="radio-buttons-group"
                              value={paymentMethod}
                            >
                              <FormControlLabel
                                value="MOMO"
                                control={
                                  <Radio
                                    style={{ color: "#7366ff" }}
                                    onClick={handlePaymentMethod}
                                  />
                                }
                                label="Momo"
                              />
                              <FormControlLabel
                                value="PAYPAL"
                                control={
                                  <Radio
                                    style={{ color: "#7366ff" }}
                                    onClick={handlePaymentMethod}
                                  />
                                }
                                label="Paypal"
                              />
                            </RadioGroup>
                            <input
                              type="hidden"
                              value={paymentMethod}
                              {...register("payment_method")}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer flex justify-end gap-x-5">
            <ButtonCom type="submit" isLoading={isLoading}>
              Continue
            </ButtonCom>
            {/* <ButtonCom backgroundColor="danger" type="reset">
              Cancel
            </ButtonCom> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
