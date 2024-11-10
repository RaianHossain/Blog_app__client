import React from "react";
import BlogList from "../components/home/BlogList";
import FavoriteBlogs from "../components/home/FavoriteBlogs";
import PopularBlogs from "../components/home/PopularBlogs";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const { auth } = useAuth();
  // console.log(auth.user.id);

  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogList />

            <div className="md:col-span-2 h-full w-full space-y-5">
              <PopularBlogs />
              {auth.user?.id && <FavoriteBlogs />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
