import React, { useState } from "react";
import Carousel_6 from "../../assets/blog_image/Carousel_6.jpg";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaEdit,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { FcLike, FcComments } from "react-icons/fc";
import {
  IconClockCom,
  IconEmailCom,
  IconPhoneCom,
  IconUserCom,
} from "../../components/icon";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
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

  return (
    <div className="max-w-[1240px] mx-auto py-6 px-4">
      <div className="relative h-96 rounded-b flex justify-center rounded-lg">
        <img
          src={coverImage}
          className="image_cover object-cover w-full h-full rounded-b rounded-lg"
          alt="cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
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
        </div>
        <div className="absolute -bottom-10">
          <img
            src="https://petdep.net/wp-content/uploads/2022/11/gia-meo-anh-long-dai-.jpg"
            className="image_avatar object-cover border-4 border-white w-40 h-40 rounded-full"
            alt="cover"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
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
          </div>
        </div>
      </div>
      <div className="text-center mt-12 text-3xl font-bold text-fBlack">
        Ronald Oliver
      </div>
      <div className="border border-fGrey mt-6 mb-6 border-opacity-10" />

      {/* End Timeline Header */}
      <div className=" grid grid-cols-12 pt-8">
        <div className="col-span-12 md:col-span-5 row-start-2 md:row-start-1 space-y-4">
          {/* Start User profile */}
          <div className="shadow-fb  w-full bg-white p-4 rounded-lg">
            <div className="text-xl font-bold text-fBlack">User Profile</div>
            <div className="mt-4 flex items-center">
              <IconUserCom></IconUserCom>
              <span className="ml-2">FPT Aptech </span>
            </div>
            <div className="mt-4 flex items-center">
              <IconEmailCom></IconEmailCom>
              <span className="ml-2">{user && user.email}</span>
            </div>
            <div className="mt-4 flex items-center">
              <IconPhoneCom></IconPhoneCom>
              <span className="ml-2">091900909 </span>
            </div>
            <div className="mt-4 flex items-center">
              <IconClockCom></IconClockCom>
              <span className="ml-2">From 2019 To Present </span>
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
              </div>
              {Array(4)
                .fill(0)
                .map((item, index) => (
                  <Link key={v4()} to={`/courses/learn-${++index}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 mt-4 hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]">
                      <div>
                        <img src={Carousel_6} alt="" className="w-full" />
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-bold">Build Website With Reactjs</p>
                        <p className="mt-1">
                          ReactJS is an open-source JavaScript library created
                          by Facebook's Jordan Walke to make user interfaces for
                          both web and mobile systems. React was first used in
                          2011 on Facebook's newsfeed.
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              {/* End Courses attended */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;