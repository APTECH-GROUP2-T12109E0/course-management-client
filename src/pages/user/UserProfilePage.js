import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcComments, FcLike } from "react-icons/fc";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import * as yup from "yup";
import Carousel_6 from "../../assets/blog_image/Carousel_6.jpg";
import { ImageCropUploadAntCom } from "../../components/ant";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingFormH5Com } from "../../components/heading";
import {
  IconClockCom,
  IconEmailCom,
  IconRemoveCom,
  IconUserCom,
} from "../../components/icon";
import { ImageCom } from "../../components/image";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import {
  AVATAR_DEFAULT,
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
} from "../../constants/config";
import { onUserUpdateProfile } from "../../store/auth/authSlice";
import { onMyCourseLoading } from "../../store/course/courseSlice";
import { getToken } from "../../utils/auth";
import { convertDateTime, sliceText } from "../../utils/helper";

const schemaValidation = yup.object().shape({
  first_name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME, `Maximum ${MAX_LENGTH_NAME} letters`),
  last_name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME, `Maximum ${MAX_LENGTH_NAME} letters`),
});

const UserProfilePage = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const { user, isLoading } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState([]);

  const resetValues = () => {
    reset();
    Object.keys(user).forEach((key) => {
      setValue(key, user[key]);
    });
    const resImage = user.imageUrl;
    const imgObj = [
      {
        uid: v4(),
        name: resImage?.substring(resImage.lastIndexOf("/") + 1),
        status: "done",
        url: resImage,
      },
    ];

    setImage(imgObj);
  };

  useEffect(() => {
    if (user) {
      dispatch(onMyCourseLoading(user.id));
      resetValues();
      if (isOpen) setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [coverImage, setCoverImage] = useState(Carousel_6);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = (values) => {
    const { id, first_name, last_name, imageUrl } = values;
    const { access_token } = getToken();
    dispatch(
      onUserUpdateProfile({
        id,
        first_name,
        last_name,
        imageUrl,
        access_token,
      })
    );
  };

  // ************** Edit Profile **************************
  const handleEdit = () => {
    setIsOpen(true);
    resetValues();
  };

  return (
    <div className="mx-auto py-6 px-4">
      <div className="relative h-96 rounded-b flex justify-center rounded-lg">
        <img
          src={coverImage}
          className="image_cover object-cover w-full h-full rounded-b rounded-lg"
          alt="cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
          <label
            htmlFor="upload-cover-image"
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white"
            title="Edit Cover Image"
          >
            <FaEdit />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
            id="upload-cover-image"
          />
        </div> */}
        <div className="absolute -bottom-10">
          <img
            srcSet={user.imageUrl ? user.imageUrl : AVATAR_DEFAULT}
            className="image_avatar object-cover border-4 border-white w-40 h-40 rounded-full object-center"
            alt={user.name ?? "avatar-user"}
          />
          {/* <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
            <label
              htmlFor="upload-cover-image"
              className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white"
              title="Edit Cover Image"
            >
              <FaEdit />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
              id="upload-cover-image"
            />
          </div> */}
        </div>
      </div>
      <div className="text-center mt-12 text-3xl font-bold text-fBlack">
        {user?.name}
      </div>
      <div className="border border-fGrey mt-6 mb-6 border-opacity-10" />

      {/* End Timeline Header */}
      <div className=" grid grid-cols-12 pt-8">
        <div className="col-span-12 md:col-span-5 row-start-2 md:row-start-1 space-y-4">
          {/* Start User profile */}
          <div className="shadow-fb  w-full bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-fBlack">My Profile</div>
              <button
                className="transition-all duration-300 text-tw-primary hover:opacity-60"
                onClick={() => handleEdit()}
              >
                Edit
              </button>
            </div>
            <div className="mt-4 flex items-center">
              <IconUserCom></IconUserCom>
              <span className="ml-2">{user && user.name}</span>
            </div>
            <div className="mt-4 flex items-center">
              <IconEmailCom></IconEmailCom>
              <span className="ml-2">{user && user.email}</span>
            </div>
            {/* <div className="mt-4 flex items-center">
              <IconPhoneCom></IconPhoneCom>
              <span className="ml-2">091900909</span>
            </div> */}
            <div className="mt-4 flex items-center">
              <IconClockCom></IconClockCom>
              <span className="ml-2">
                Registered at: {convertDateTime(user?.created_at)}
              </span>
            </div>
          </div>
          {/* Start User profile */}

          {/* Start Activity */}
          <div className="w-full shadow-fb bg-white rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-fBlack">Activity</div>
            </div>
            <div className="shadow-fb rounded w-full bg-white p-4">
              <div className="mt-4 flex items-center">
                <img
                  src="https://petdep.net/wp-content/uploads/2022/11/gia-meo-anh-long-dai-.jpg"
                  alt="img"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-2">FPT Aptech </span>
                <FcLike />
                <span className="ml-2">Hung Nguyen's post</span>
              </div>

              <div className="border border-fGrey mt-6 mb-6 border-opacity-10" />
              <div className="mt-4 flex items-center">
                <img
                  src="https://petdep.net/wp-content/uploads/2022/11/gia-meo-anh-long-dai-.jpg"
                  alt="img"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-2">FPT Aptech </span>
                <FcComments />
                <span className="ml-2">Duy Truong's post</span>
              </div>
            </div>
          </div>
        </div>
        {/* End Activity */}

        {/* Start Courses attended*/}
        <div className="flex-row row-start-1 col-span-12 md:col-span-7 md:col-start-7 space-y-4 rounded-lg">
          <div>
            <div className="w-full shadow-fb rounded bg-white p-4">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-fBlack">
                  Courses Enrolled
                </div>
                <Link
                  to="/my-courses"
                  className="transition-all duration-300 text-tw-primary hover:opacity-60"
                >
                  See all
                </Link>
              </div>
              {data &&
                data.length > 0 &&
                data.slice(0, 4).map((item, index) => (
                  <Link key={item.slug} to={`/learn/${item.slug}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 mt-4 transition-all duration-300 hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]">
                      <div className="h-28">
                        <ImageCom srcSet={item?.image} alt={item.slug} />
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-bold">{item.name}</p>
                        <p
                          className="mt-1"
                          dangerouslySetInnerHTML={{
                            __html: sliceText(item?.description, 200),
                          }}
                        ></p>
                      </div>
                    </div>
                  </Link>
                ))}
              {/* End Courses attended */}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="modal-overplay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={`modal-content scroll-hidden  max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg outline-none transition-all duration-300 ${
          isOpen ? "w-50" : "w-0"
        }`}
      >
        <div className="card-header bg-tw-primary flex justify-between text-white">
          <HeadingFormH5Com className="text-2xl">Edit Profile</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom
              className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"
              onClick={() => setIsOpen(false)}
            ></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Profile hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="first_name" isRequired>
                    First Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="first_name"
                    register={register}
                    placeholder="Input first name"
                    errorMsg={errors.first_name?.message}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="last_name" isRequired>
                    Last Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="last_name"
                    register={register}
                    placeholder="Input last name"
                    errorMsg={errors.last_name?.message}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-6 offset-5 relative">
                  <LabelCom htmlFor="image" isRequired>
                    Avatar
                  </LabelCom>
                  <div className="absolute w-full">
                    <ImageCropUploadAntCom
                      name="imageUrl"
                      onSetValue={setValue}
                      errorMsg={errors.imageUrl?.message}
                      editImage={image}
                      aspect={4 / 4}
                    ></ImageCropUploadAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="imageUrl"
                      register={register}
                    ></InputCom>
                  </div>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
            </div>
            <div className="card-footer flex justify-end gap-x-5 mt-20">
              <ButtonCom type="submit" isLoading={isLoading}>
                Save
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default UserProfilePage;
