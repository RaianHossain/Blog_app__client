import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Comment from "../components/blog/Comment";
import MakeComment from "../components/blog/MakeComment";
import useAuth from "../hooks/useAuth";
import BlogActions from "../components/blog/BlogActions";


function BlogPage(props) {
  const location = useLocation();
  const { auth } = useAuth();
  const blogId = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fethchBlog = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId.blogId}`
        );
        console.log(response);
        if ((response.status = 200)) {
          setBlog(response.data);
          setComments(response.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fethchBlog();
  }, [blogId]);

  return (
    <>
      <main>
        {/* <!-- Begin Blogs --> */}
        <section>
          <div className="container text-center py-8">
            <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
            <div className="flex justify-center items-center my-4 gap-4">
              <Link to={`/profile/${blog?.author?.id}`}>
                <div className="flex items-center capitalize space-x-2">
                  <div className="avater-img bg-indigo-600 text-white">
                    <span className="">{blog.author?.firstName[0]}</span>
                  </div>
                  <h5 className="text-slate-500 text-sm">
                    {blog.author?.firstName} {blog.author?.lastName}
                  </h5>
                </div>
              </Link>
              <span className="text-sm text-slate-700 dot">
                {blog?.createdAt}
              </span>
              <span className="text-sm text-slate-700 dot">
                {blog.likes?.length} Likes
              </span>
            </div>
            <img
              className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                blog.thumbnail
              }`}
              alt="thumbnail"
            />

            {/* <!-- Tags --> */}
            <ul className="tags">
              {blog.tags?.split(",").map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>

            {/* <!-- Content --> */}
            <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
              {blog.content}
            </div>
          </div>
        </section>
        {/* <!-- End Blogs --> */}

        {/* <!-- Begin Comments --> */}
        <section id="comments">
          <div className="mx-auto w-full md:w-10/12 container">
            {auth.user ? (
              <MakeComment
                blog={blog}
                comments={comments}
                setComments={setComments}
              />
            ) : (
              <p>
                <Link to="/login" state={{ from: location.pathname }}>
                  Sign in
                </Link>{" "}
                to make comments
              </p>
            )}
            {/* <!-- Comment One --> */}
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </main> 

      {blog.id && <BlogActions setBlog={setBlog} blogItem={ blog } />}     
    </>
  );
}

export default BlogPage;
