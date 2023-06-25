import { Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { BreadcrumbCom } from "../../components/breadcrumb";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
import { categoryItems, LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { onCourseLoading } from "../../store/course/courseSlice";
import { convertStrToSlug, formatNumber } from "../../utils/helper";

const CategoryDetailPage = () => {
  const dispatch = useDispatch();
  const { startIndex, endIndex, currentPage, handleChangePage } =
    usePagination(1);
  const { slug } = useParams();
  const categoryDetail = categoryItems.find((item) => item.slug === slug);

  const { data } = useSelector((state) => state.course);

  const coursesByCategorySlug = data.filter(
    (item, index) => convertStrToSlug(item.category_name) === slug
  );

  useEffect(() => {
    dispatch(onCourseLoading());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com
          number={
            coursesByCategorySlug && formatNumber(coursesByCategorySlug.length)
          }
        >
          {categoryDetail.label}
        </HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Home",
              slug: "/",
            },
            {
              title: "Category",
              slug: "/categories",
            },
            {
              title: categoryDetail.label,
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <CourseGridMod>
        {coursesByCategorySlug && coursesByCategorySlug.length > 0 ? (
          coursesByCategorySlug.map((item, index) => {
            if (index >= startIndex && index < endIndex) {
              return (
                <CourseItemMod
                  key={v4()}
                  isPaid={false}
                  isMyCourse={false}
                  course={item}
                  url={`/courses/${item?.slug}`}
                ></CourseItemMod>
              );
            }
            return null;
          })
        ) : (
          <HeadingH2Com className="text-black text-4xl text-center py-10">
            No data
          </HeadingH2Com>
        )}
      </CourseGridMod>
      {coursesByCategorySlug.length > LIMIT_PAGE && (
        <Pagination
          current={currentPage}
          defaultPageSize={LIMIT_PAGE}
          total={data.length}
          onChange={handleChangePage}
          className="mt-[1rem] text-center"
        />
      )}
    </>
  );
};

export default CategoryDetailPage;
