import React, { useState } from "react";
import * as yup from "yup";
import {
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_UPLOAD_REQUIRED,
} from "../../../constants/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showMessageError } from "../../../utils/helper";
import { HeadingH1Com } from "../../../components/heading";
import GapYCom from "../../../components/common/GapYCom";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import { ButtonCom } from "../../../components/button";
import { useSelector } from "react-redux";
import {
  ImageCropUploadAntCom,
} from "../../../components/ant";
import { TextEditorQuillCom } from "../../../components/texteditor";
import { axiosBearer } from "../../../api/axiosInstance";
import { BreadcrumbCom } from "../../../components/breadcrumb";
/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED)
});
const AdminCategoryCreatePage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  /********* API Area ********* */
  // const [tagItems, setTagItems] = useState([]);
  /********* END API Area ********* */
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const [categorySelected, setCategorySelected] = useState(null);
  const [description, setDescription] = useState("");
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(true);

  const resetValues = () => {
    reset();
    setDescription("");
  };

  /********* Get Category ID from API  ********* */

  const handleSubmitForm = async (values) => {
    console.log(values);
    const user_id = user.id; console.log(user_id);
    try {
      setIsLoading(!isLoading);
      const res = await axiosBearer.post(`/category`, {
        ...values,
        user_id,
      });
      toast.success(`${res.data.message}`);
      resetValues();

      navigate(`/admin/categories`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /********* Library Function Area ********* */
  const handleChangeCategory = (value) => {
    setValue("category_id", value);
    setError("category_id", { message: "" });
    setCategorySelected(value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Create Category</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/",
            },{
              title: "Category",
              slug: "/admin/categories",
            },
            {
              title: "Create",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <form
              className="theme-form"
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom htmlFor="name" isRequired>
                      Title
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="name"
                      register={register}
                      placeholder="Input Category name"
                      errorMsg={errors.name?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-2 relative">
                    <LabelCom htmlFor="image" isRequired>
                      Image
                    </LabelCom>
                    <div className="absolute w-full">
                      <ImageCropUploadAntCom
                        name="image"
                        onSetValue={setValue}
                        errorMsg={errors.image?.message}
                      ></ImageCropUploadAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="image"
                        register={register}
                      ></InputCom>
                    </div>
                  </div>
                  <GapYCom className="mt-20"></GapYCom>
                  <div className="row">
                    <LabelCom htmlFor="description" isRequired>
                      Description
                    </LabelCom>
                    <TextEditorQuillCom
                      value={description}
                      onChange={(newDescription) => {
                        setValue("description", newDescription);

                        setDescription(newDescription);
                        setIsDescriptionEmpty(newDescription.trim() === "");
                      }}
                      placeholder={
                        isDescriptionEmpty ? "Describe your category ..." : ""
                      }
                    />
                  </div>
                  <div className="mt-10 " style={{ color: "red" }}>
                    {errors.description?.message}
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
                </ButtonCom>
                <ButtonCom backgroundColor="danger" onClick={resetValues}>
                  Reset
                </ButtonCom>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategoryCreatePage;
