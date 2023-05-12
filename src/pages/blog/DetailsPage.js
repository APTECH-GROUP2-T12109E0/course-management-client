import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { blog } from "../../assets/blog_data/data";
import LayoutHome from "../../layouts/LayoutHome";
import { HeadingH2Com } from "../../components/heading";

const DetailsPage = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    let blogs = blog.find((blogs) => blogs.id === parseInt(id));
    if (blogs) {
      setBlogs(blogs);
    }
  }, []);

  return (
       <LayoutHome>
      {blogs ? (
        <section className=" bg-white max-w-[1240px] mx-auto py-10 px-24 ">
          <div className="container">
            <div className="flex justify-center">
              <img
                className="w-full h-full rounded-2xl"
                src={require("../../assets/blog_image/" + blogs.cover)}
                alt=""
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-end">
                <button className="ml-5 border-none">
                  <BsPencilSquare />
                </button>
                <button className="ml-5 border-none">
                  <AiOutlineDelete />
                </button>
              </div>
              <h1 className="text-3xl font-medium">{blogs.title}</h1>
              <HeadingH2Com className="my-5 text-lg capitalize leading-7">{blogs.desc}</HeadingH2Com>
              <p className="my-5 text-lg capitalize leading-7">
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure, but because those who do not
                know how to pursue pleasure rationally encounter consequences
                that are extremely painful. Nor again is there anyone who loves
                or pursues or desires to obtain pain of itself, because it is
                pain, but because occasionally circumstances occur in which toil
                and pain can procure him some great pleasure. To take a trivial
                example, which of us ever undertakes laborious physical
                exercise, except to obtain some advantage from it? But who has
                any right to find fault with a man who chooses to enjoy a
                pleasure that has no annoying consequences, or one who avoids a
                pain that produces no resultant pleasure?" Section 1.10.33 of
                "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At
                vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat."
              </p>
              <p className="my-5 text-lg capitalize leading-7">
                Author: {blogs.author}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </LayoutHome>
  );
};

export default DetailsPage;
