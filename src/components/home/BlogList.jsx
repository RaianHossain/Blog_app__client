import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import useAxios from "../../hooks/useAxios";
import useBlogs from "../../hooks/useBlogs";
import { actions } from "../../actions";

function BlogList() {
  const { state, dispatch } = useBlogs();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const {api} = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
        );
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.total === state.blogs.length) {
            setHasMore(false);
          } else {
            dispatch({type: actions.blogs.DATA_FETCHED, payload: response.data.blogs})
            setPage(response.data.page + 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchData();
      }
    };
    

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [page, hasMore]);

  

  return (
    <div className="space-y-3 md:col-span-5">
      {state.blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}

      {hasMore && <div ref={loaderRef}>Loading...</div>}
      {!hasMore && <div>You are all caught up</div>}
    </div>
  );
}

export default BlogList;
