import React from "react";
import EditIcon from "../../assets/icons/edit.svg";
import useAuth from "../../hooks/useAuth";

function ProfileImage({ avatar, profileId, firstName }) {
  const { auth } = useAuth();
  const isMe = auth?.user?.id === profileId;
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {avatar ? (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          {/* <!-- User's first name initial --> */}
          <img
            src={`${
              import.meta.env.VITE_SERVER_BASE_URL
            }/uploads/avatar/${avatar}`}
            alt="avatar"
            className="w-[120px] h-[120px] rounded-full"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          {/* <!-- User's first name initial --> */}
          <span className="">{firstName && firstName[0]}</span>
        </div>
      )}

      {isMe && (
        <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
          <img src={EditIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}

export default ProfileImage;
