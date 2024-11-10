import axios from "axios";
import React, { useEffect, useState } from "react";
import SpecialPostCard from "./SpecialPostCard";

function PopularBlogs(props) {
  const [popularBlogs, setPopularBlogs] = useState([]);
  useEffect(() => {
    const fetchPopularBlogs = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular?limit=5`
      );
      console.log(response);
      if (response.status === 200) {
        setPopularBlogs(response.data.blogs);
      }
    };

    fetchPopularBlogs();
  }, []);

  if (popularBlogs.length === 0) return <p>No popular blog</p>;

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {popularBlogs &&
          popularBlogs.map((blog, index) => (
            <SpecialPostCard blog={blog} key={blog.id} />
          ))}
      </ul>
    </div>
  );
}

export default PopularBlogs;
