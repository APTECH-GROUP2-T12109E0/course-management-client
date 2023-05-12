import React from "react";
import { HeadingFormH1Com, HeadingH2Com } from "../../components/heading";
import { BsFillPersonVcardFill,BsArrowLeftSquareFill,BsArrowRightSquareFill } from "react-icons/bs";
import { AiOutlineTags, AiOutlineClockCircle } from "react-icons/ai";
import { blog } from "../../assets/blog_data/data";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

const BlogSelectPage = () => {
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
            Expand your professional network, build your expertise, and earn money on each paid enrollment.
          </div>
        </h2>
      </div>
      <section className="my-12">
        <div className="max-w-[95%] m-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {blog.map((blog) => (
            <div
              key={blog.id}
              className="transition-all duration-[0.5s] border-solid border-[1px] border-[#e6e6e6] rounded-[12px] p-[20px] bg-white hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]"
            >
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
                <Link to={`/details/${blog.id}`}>
                  <div className="text-black border-none bg-none outline-none cursor-pointer no-underline list-none text-[17px]">
                    <h3 className="font-[500]">{blog.title}</h3>
                  </div>
                </Link>
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
          ))}
        </div>
      </section>

        <Stack spacing={2} >
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pagination 
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous:  BsArrowLeftSquareFill , next: BsArrowRightSquareFill }}
                {...item}
              />
            )}
          />
          </div>
        </Stack>

    </>
  );
};

export default BlogSelectPage;
