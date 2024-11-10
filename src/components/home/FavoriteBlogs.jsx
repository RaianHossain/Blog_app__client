import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SpecialPostCard from "./SpecialPostCard";

function FavoriteBlogs(props) {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const { api } = useAxios();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );
        console.log(response);
        if (response.status === 200) {
          setFavoriteBlogs(response.data.blogs);
        }
      } catch (error) {
        console.log(error);
        if (error.status === 404) {
          // setFavoriteBlogs([]);
          setError(error);
        }
      }
    };

    fetchFavoriteBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      {error && (
        <p className="text-gray-300 font-medium mt-3">No favorite blog 😟</p>
      )}

      {favoriteBlogs.length > 0 && (
        <ul className="space-y-5 my-5">
          {favoriteBlogs.map((blog) => (
              <SpecialPostCard blog={blog} key={blog.id} fav={true}/>
            ))}
          {/* <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">#tailwindcss, #server, #ubuntu</p>
        </li> */}
        </ul>
      )}
    </div>
  );
}

export default FavoriteBlogs;
