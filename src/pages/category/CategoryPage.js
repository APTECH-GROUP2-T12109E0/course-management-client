import React from "react";
import Carousel_9 from "../../assets/blog_image/Carousel_9.jpg";
import { BreadcrumbCom } from "../../components/breadcrumb";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { categoryItems } from "../../constants/config";
import { CategoryGridMod, CategoryItemMod } from "../../modules/category";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/helper";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";

const sliderData = [
  {
    url: Carousel_9,
  },
];

const CategoryPage = () => {
  const imageUrl = sliderData[0]?.url;
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="w-full h-full object-cover relative ">
        {/**** Image and Sidebar ****/}
        {imageUrl && (
          <img src={imageUrl} alt="/" className="w-full h-60 object-cover" />
        )}

        {user && user.role !== 'ADMIN' && (
          <nav className="flex justify-end space-x-20 h-16 bg-white">
            <Link
              to="/categories/categoryList"
              className="flex items-center text-blue-600 hover:text-blue-800 text-xl hover:font-bold hover:border-b-2"
            >
              <FaCog className="mr-1" />
              Management Category
            </Link>
            
          </nav>
        )}
      </div>
      <div className="flex justify-between items-center">
        <HeadingH1Com number={formatNumber(4)}>All Categories</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Home",
              slug: "/",
            },
            {
              title: "Category",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <CategoryGridMod>
        {categoryItems.map((item) => (
          <CategoryItemMod key={item.value} item={item}></CategoryItemMod>
        ))}
      </CategoryGridMod>
    </>
  );
};

export default CategoryPage;
