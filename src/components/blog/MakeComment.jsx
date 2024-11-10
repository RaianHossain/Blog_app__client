import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";

// const MakeComment = forwardRef(({ blog, setComments }, ref) => {
const MakeComment = ({ blog, setComments }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { api } = useAxios();

  const handleSubmitComment = async () => {
    setError(null);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/comment`,
        { content }
      );
      if (response.status === 200) {
        setContent("");
        setComments([...response.data.comments]);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold my-8">
        Comments ({blog.comments?.length})
      </h2>
      <div className="flex items -center space-x-4">
        <div className="avater-img bg-indigo-600 text-white">
          <span className="">S</span>
        </div>
        <div className="w-full">
          <textarea
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
            placeholder="Write a comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="flex justify-end mt-4">
            <button
              className={`${
                content.length === 0 ? "bg-slate-500" : "bg-indigo-600"
              } text-white px-6 py-2 md:py-3 rounded-md ${
                content.length != 0 &&
                "hover:bg-indigo-700 transition-all duration-200"
              }`}
              disabled={content.length === 0}
              onClick={handleSubmitComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeComment;
