import React from "react";
import { HeadingFormH1Com, HeadingH2Com } from "../../components/heading";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { AiOutlineTags, AiOutlineClockCircle } from "react-icons/ai";
import { blog } from "../../assets/blog_data/data";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useState } from "react";

const BlogSelectPage = () => {
  /**
   * Phân tích:
   * Nếu total items = 5, LIMIT = 3
   * - Đầu tiên nếu currentPage = 1 thì index của items ở page 1 sẽ là 0, 1, 2 ( 3 phần tử đầu tiên )
   * - OnChange, nếu CurrentPage = 2, thì index của items ở page 2 sẽ là 4,5 ( 2 phần tử cuối )
   * => Vậy vị trí bắt đầu của 1 items sẽ tính = (page hiện tại - 1) * LIMIT - Ví dụ: (1-1) = 0 * 3 = 0, ta có startOffSet = 0
   *    Vị trí kết thúc của 1 items sẽ tính endOffSet = startOffSet + LIMIT - Ví dụ 0 + 3 = 3
   * Tiếp tục nếu sang page 2, startOffset:(2-1) = 1 * 3 = 3, ta có startOffSet = 3
   *                      còn  endOffSet: 3 + 3 = 6
   * => page 2 sẽ có phần từ tử vị trí index 3 đến 6, vì items chỉ có 5 phần tử, nên sẽ chỉ chạy từ vị trí 3 đến vị trí 5, sẽ thiếu đi 1 item ở page 2
   * Nếu chỗ này đổi lại tên biến thành startIndex và endIndex thì đúng cho case này hơn.
   *
   * Công thức
   *   const startOffSet = (currentPage - 1) * parseInt(defaultPageSize);
   *   const endOffSet = startOffSet + parseInt(defaultPageSize);
   */

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  
  const onChange = (page) => {
    console.log("Page: ", page);
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);

  // Còn step cuối là vào vông lặp, check nếu index >= startIndex && index < endIndex thì hiện các items ra, còn ở ngoài thì return null thôi :3

  return (
    <>
      <div className="max-w-[1240px] mx-auto py-6 px-4 text-center">
        <HeadingFormH1Com>MY BLOG </HeadingFormH1Com>
        <h2 className="py-4">
          <div>
            We’ve got everything you need to deliver flexible and effective
            skills development for your entire workforce.
          </div>
          <div>
            Teach what you know and help learners explore their interests, gain
            new skills, and advance their careers.
          </div>
          <div>
            Publish the course you want, in the way you want, and always have
            control of your own content.
          </div>
          <div>
            Expand your professional network, build your expertise, and earn
            money on each paid enrollment.
          </div>
        </h2>
      </div>
      <section className="my-12">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {blog.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div className="transition-all duration-[0.5s] border-solid border-[1px] border-[#e6e6e6] rounded-[12px] p-[20px] bg-white hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]">
                <div id="img">
                  <img
                    src={require("../../assets/blog_image/" + blog.cover)}
                    alt=""
                    className="w-full h-[250px] object-cover rounded-[10px] mb-[20px]"
                  />
                </div>
                <div className="flex items-center mb-3">
                  <AiOutlineTags className="mr-[10px] text-[25px]" />
                  <label className="block mr-[20px] mb-0 text-[#999] text-[15px]">
                    {blog.category}
                  </label>
                </div>

                <div id="details">
                  {/* <Link to={`/blogs/${blog.id}`}> */}
                  <div className="text-black border-none bg-none outline-none cursor-pointer no-underline list-none text-[17px]">
                    <h3 className="font-[500]">{blog.title}</h3>
                  </div>
                  {/* </Link> */}
                  <p className="text-[#999] font-[400] my-[20px] text-[17px] leading-[25px]">
                    {blog.desc}...
                  </p>
                  <div id="date" className="flex items-center mt-3">
                    <AiOutlineClockCircle className="mr-[10px] text-[40px]" />
                    <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                      {blog.date}
                    </label>
                    <BsFillPersonVcardFill className="mr-[10px] text-[40px]" />
                    <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                      {blog.author}
                    </label>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Pagination
        current={currentPage} // Page hiện tại đang đứng
        onChange={onChange}
        total={5} // Tổng Items: total
        defaultPageSize={limit} // Tổng số items trong 1 Page hay còn gọi là LIMIT
      />
    </>
  );
};

export default BlogSelectPage;
