import { useEffect, useState } from "react";
import Carousel_9 from "../../assets/blog_image/Carousel_9.jpg";
import { BsFillPersonVcardFill, BsPatchPlusFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { FaBlog, FaCog, FaPlug } from "react-icons/fa";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "antd";
import { LIMIT_PAGE } from "../../constants/config";
import { HeadingFormH1Com } from "../../components/heading";
import { AiOutlineClockCircle, AiOutlineTags } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { axiosBearer, axiosPrivate } from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import moment from "moment/moment";

const sliderData = [
  {
    url: Carousel_9,
  },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const imageUrl = sliderData[0]?.url;
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { startIndex, endIndex, currentPage, handleChangePage } = usePagination(
    1,
    LIMIT_PAGE
  );
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosBearer.get(
          `/blog/blogs?_start=${startIndex}&_end=${endIndex}`
        );
        // setBlogs(response.data);
        // const formattedBlogs = response.data.map((blog) => ({
        //   ...blog,
        //   created_at: moment(blog.created_at).format("DD/MM/YYYY"), // Format the date
        // }));
        const formattedBlogs = response.data
          .filter((blog) => blog.status === 1)
          .map((blog) => ({
            ...blog,
            created_at: moment(blog.created_at).format("DD/MM/YYYY"), // Format the date
          }));
        setBlogs(formattedBlogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [startIndex, endIndex]);

  return (
    <>
      {/* <BlogCarouselPage />
        <BlogSelectPage /> */}

      <div className="w-full h-full object-cover relative ">
        {/**** Image and Sidebar ****/}
        {imageUrl && (
          <img src={imageUrl} alt="/" className="w-full h-60 object-cover" />
        )}

        {user && user.role !== 'ADMIN' && (
          <nav className="flex justify-end space-x-20 h-16 bg-white">
            <Link
              to="/blogs/blogList"
              className="flex items-center text-blue-600 hover:text-blue-800 text-xl hover:font-bold hover:border-b-2"
            >
              <FaCog className="mr-1" />
              Management Blog
            </Link>
            
          </nav>
        )}
      </div>

      {/**** Body Blog ****/}
      <div className="max-w-[1240px] mx-auto py-6 px-4 text-center">
        <HeadingFormH1Com>LASTEST BLOG</HeadingFormH1Com>
        <h2 className="py-4">
          <div>
            We’ve got everything you need to deliver flexible and effective
            skills development for your entire workforce. <br />
            Teach what you know and help learners explore their interests, gain
            new skills, and advance their careers.
            <br />
            Publish the course you want, in the way you want, and always have
            control of your own content. <br />
            Expand your professional network, build your expertise, and earn
            money on each paid enrollment.
            <br />
          </div>
        </h2>
      </div>
      <section className="my-12">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            blogs.slice(startIndex, endIndex).map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <div
                  key={blog.id}
                  className="transition-all duration-[0.5s] border-solid border-[1px] border-[#e6e6e6] rounded-[12px] p-[20px] bg-white hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]"
                >
                  <div id="img">
                    <img
                      src={blog.image}
                      alt=""
                      className="w-full h-[250px] object-cover rounded-[10px] mb-[20px]"
                    />
                  </div>
                  <div className="flex items-center mb-3">
                    <AiOutlineTags className="mr-[10px] text-[25px]" />
                    <label className="block mr-[20px] mb-0 text-[#999] text-[15px]">
                      {blog.category_name}
                    </label>
                  </div>
                  <div id="details">
                    <div className="text-black border-none bg-none outline-none cursor-pointer no-underline list-none text-[17px]">
                      <h3 className="font-[500]">{blog.name}</h3>
                    </div>
                    {/* <p className="text-[#999] font-[400] my-[20px] text-[17px] leading-[25px]">
                      {ReactHtmlParser(blog.description.slice(0, 50))}
                    </p> */}
                    <p
                      className="text-[#999] font-[400] my-[20px] text-[17px] leading-[25px]"
                      dangerouslySetInnerHTML={{
                        __html: blog.description.slice(0, 50),
                      }}
                    ></p>

                    <div id="date" className="flex items-center mt-3">
                      <div className="flex items-center">
                        <AiOutlineClockCircle className="mr-[10px] text-[35px]" />
                        <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                          {blog.created_at}
                        </label>
                      </div>
                      <div className="flex items-center ml-auto">
                        <FaEye className="mr-[10px] text-[35px]" />
                        <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                          {blog.view_count}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
      <Pagination
        current={currentPage}
        onChange={handleChangePage}
        total={blogs.length}
        defaultPageSize={LIMIT_PAGE}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default BlogPage;
