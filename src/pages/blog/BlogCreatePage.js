import React, { useState } from "react";
import ButtonBackCom from "../../components/button/ButtonBackCom";
import * as yup from "yup";
import {
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_UPLOAD_REQUIRED,
  categoryItems,
} from "../../constants/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { API_COURSE_URL } from "../../constants/endpoint";
import { toast } from "react-toastify";
import { showMessageError } from "../../utils/helper";
import { HeadingH1Com } from "../../components/heading";
import GapYCom from "../../components/common/GapYCom";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { ButtonCom } from "../../components/button";
import { useSelector } from "react-redux";
import {
  ImageCropUploadAntCom,
  SelectSearchAntCom,
} from "../../components/ant";
import { TextEditorQuillCom } from "../../components/texteditor";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  status: yup.number().default(2),
  // image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
  // category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
});
const BlogCreatePage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  /********* API Area ********* */
  // const [tagItems, setTagItems] = useState([]);
  /********* END API Area ********* */
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [categorySelected, setCategorySelected] = useState(null);
  const [description, setDescription] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const resetValues = () => {
    reset();
    setCategorySelected(null);
    setDescription("");
  };

  /********* Get Blog ID from API  ********* */
  const handleSubmitForm = async (values) => {
    // console.log(values);
    const { name, description} = values;
    const status = values.status || 2;
    const user_id = user.id;
    console.log("user_id",user_id);
    try {
      setIsLoading(!isLoading);
      const res = await axiosPrivate.post(`/blog`, {
        name,
        description,
        status,
        user_id,
      });
      toast.success(`${res.data.message}`);
      navigate(`/blogs`);
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
        <HeadingH1Com>Create Blog</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <form
              className="theme-form"
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              {/* <div className="card-header">
                    <h5>Form Create Course</h5>
                    <span>Lorem ipsum dolor sit amet consectetur</span>
                  </div> */}
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom htmlFor="name" isRequired>
                      Blog Name
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="name"
                      register={register}
                      placeholder="Input Blog name"
                      errorMsg={errors.name?.message}
                    ></InputCom>
                  </div>

                  {!isHidden && (
                    <div className="col-sm-6">
                      <LabelCom htmlFor="status" isRequired>
                        User Status
                      </LabelCom>
                      <InputCom
                        type="num"
                        control={control}
                        name="status"
                        register={register}
                        defaultValue={2}
                        errorMsg={errors.status?.message}
                      ></InputCom>
                    </div>
                    
                  )}
                  {!isHidden && (
                    <div className="col-sm-6">
                      <LabelCom htmlFor="user_id" isRequired>
                        User ID
                      </LabelCom>
                      <InputCom
                        type="num"
                        control={control}
                        name="user_id"
                        register={register}
                        defaultValue={user.id}
                        errorMsg={errors.user_id?.message}
                      ></InputCom>
                    </div>
                    
                  )}

                  {/* <div className="col-sm-4">
                    <LabelCom htmlFor="category_id" isRequired>
                      Choose Category
                    </LabelCom>
                    <div>
                      <SelectSearchAntCom
                        selectedValue={categorySelected}
                        listItems={categoryItems}
                        onChange={handleChangeCategory}
                        className="w-full py-1"
                        status={
                          errors.category_id &&
                          errors.category_id.message &&
                          "error"
                        }
                        errorMsg={errors.category_id?.message}
                        placeholder="Input category to search"
                      ></SelectSearchAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="category_id"
                        register={register}
                      ></InputCom>
                    </div>
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
                  </div> */}
                  <GapYCom className="mb-10"></GapYCom>
                  <div className="row">
                    <div className="col-sm-12">
                      <LabelCom htmlFor="description">Description</LabelCom>
                      <TextEditorQuillCom
                        value={description}
                        onChange={(description) => {
                          setValue("description", description);
                          setDescription(description);
                        }}
                        placeholder="Describe your course ..."
                      ></TextEditorQuillCom>
                    </div>
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

export default BlogCreatePage;