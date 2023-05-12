import BlogCarouselPage from "./BlogCarouselPage";
import BlogSelectPage from "./BlogSelectPage";
import LayoutHome from "../../layouts/LayoutHome";

const BlogPage = () => {
  return (
    <div>
      <LayoutHome>
        <BlogCarouselPage />
        <BlogSelectPage />
      </LayoutHome>
    </div>
  );
};

export default BlogPage;
