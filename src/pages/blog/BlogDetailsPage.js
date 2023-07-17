import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosBearer } from "../../api/axiosInstance";
import { SpinAntCom } from "../../components/ant";
import { BreadcrumbCom } from "../../components/breadcrumb";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { ImageCom } from "../../components/image";
import { NOT_FOUND_URL } from "../../constants/config";
import { getBlogViewCount, setBlogViewCount } from "../../utils/authBlog";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [viewCount, setViewCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateViewCount(); // Call updateViewCount to update new view_count
        const response = await axiosBearer.get(`/blog/${slug}`);

        if (response.data.user_id !== user?.id && response.data.status !== 1) {
          navigate(NOT_FOUND_URL);
        }

        setBlog({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
          view_count: response.data.view_count,
          status: response.data.status,
          slug: response.data.slug,
          user_id: response.data.user_id,
          created_at: response.data.created_at
            ? moment(response.data.created_at).format("DD/MM/YYYY")
            : "", // Format the date
        });
      } catch (error) {
        if (error?.response?.status === 404) {
          toast.error(error.response?.data?.message);
          navigate(NOT_FOUND_URL);
        }
        console.log(error);
      }
    };

    fetchData();
  }, [slug]);

  const updateViewCount = async () => {
    try {
      const cookieViewCount = getBlogViewCount(slug);
      if (cookieViewCount === 0) {
        await axiosBearer.put(`/blog/view-count/${slug}`, {
          view_count: viewCount + 1,
        });
        setViewCount((prevCount) => prevCount + 1);
        setBlogViewCount(slug, viewCount + 1); // Tạo cookie mới
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Blog detail</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Home",
              slug: "/",
            },
            {
              title: "Blog",
              slug: "/blogs",
            },
            {
              title: "Detail",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      {blog ? (
        <section className="bg-white max-w-[1240px] mx-auto py-10 px-24">
          <div className="container">
            <div className="flex justify-center">
              <div className="w-full h-80 relative">
                {blog.status === 2 && (
                  <span className="text-white px-3 py-2 bg-tw-warning absolute top-3 right-0">
                    Proccessing
                  </span>
                )}
                <ImageCom srcSet={blog.image} alt={blog.slug}></ImageCom>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                  <AiOutlineClockCircle className="mr-[10px] text-[20px]" />
                  <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                    Date: {blog.created_at}
                  </label>
                </div>
                <div className="flex justify-end">
                  <FaEye className="mr-[10px] text-[20px]" />
                  <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                    {blog.view_count}
                  </label>
                </div>
              </div>

              <h1 className="text-3xl font-medium">{blog.name}</h1>
              <h3 className="my-5 text-lg capitalize leading-7">
                {/* {ReactHtmlParser(blog.description)} */}
                <div
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></div>
              </h3>
            </div>
          </div>
        </section>
      ) : (
        <SpinAntCom loadingText={"Loading ..."} />
      )}
    </>
  );
};

export default BlogDetailsPage;
