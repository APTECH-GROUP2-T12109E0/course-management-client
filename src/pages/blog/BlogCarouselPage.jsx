import React,{useState} from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Carousel_1 from "../../assets/blog_image/Carousel_1.jpg";
import Carousel_4 from "../../assets/blog_image/Carousel_4.jpg";
import Carousel_3 from "../../assets/blog_image/Carousel_3.jpg";
// "Opacity" trong trường hợp này là một thuộc tính CSS được sử dụng để điều chỉnh độ mờ của một phần tử HTML.
const sliderData = [

  {
    url: Carousel_4,
  },

];
const BlogCarouselPage = () => {
    const [slide, setSlide] = useState(0);
    const lenght = sliderData.length;
    const prevSlide = () =>{
        setSlide(slide === lenght -1 ? 0: slide + 1)
    }
    const nextSlide = () =>{
        setSlide(slide === 0 ? lenght -1: slide-1)
    }
  return (
    <div className='w-full h-full object-cover relative '>
        {/* <BsArrowLeftSquareFill onClick={prevSlide} className="absolute top-[50%] text-3xl text-white cursor-pointer left-8"/>
        <BsArrowRightSquareFill onClick={nextSlide} className="absolute top-[50%] text-3xl text-white cursor-pointer right-8"/> */}
      {sliderData.map((item, index) => (
        <div className={index === slide ? 'opacity-100 ' : 'opacity-0'} >
            {index === slide && (<img 
            src={item.url} 
            alt="/"
            className="w-full h-60 rounded-lg"
            />)}
            
        </div>

      ))}
      
    </div>


  );
};

export default BlogCarouselPage;