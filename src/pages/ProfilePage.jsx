import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import BlogCard from "../components/home/BlogCard";
import Bio from "../components/profile/Bio";
import ProfileImage from "../components/profile/ProfileImage";
import useProfile from "../hooks/useProfile";
import useAxios from "../hooks/useAxios";

function ProfilePage(props) {
  const profileId = useParams();
  const { state: profileState, dispatch } = useProfile();
  const {api} = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId.profileId}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.DATA_FETCHED,
          data: response.data,
        });
      }
    };

    fetchProfile();
  }, [profileId]);


  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* <!-- profile image --> */}
          <ProfileImage
            avatar={profileState.profile?.avatar}
            profileId={profileState.profile?.id}
            firstName={profileState.profile?.firstName}
          />
          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {profileState.profile?.firstName} {profileState.profile?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">
              {profileState.profile?.email}
            </p>
          </div>

          {/* <!-- bio --> */}
          <Bio
            bio={profileState.profile.bio}
            profileId={profileState.profile.id}
          />
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Blogs</h4>
        <div className="my-6 space-y-4">
          {profileState.profile?.blogs &&
            profileState.profile.blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
