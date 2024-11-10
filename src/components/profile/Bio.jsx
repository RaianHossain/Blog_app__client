import React from "react";
import CloseIcon from "../../assets/icons/close.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TickIcon from "../../assets/icons/tick.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

function Bio({ bio, profileId }) {
  const { auth } = useAuth();
  const isMe = auth?.user?.id === profileId;
  const [isEdit, setIsEdit] = React.useState(false);
  const [bioContent, setBioContent] = React.useState(bio);
  const [editBio, setEditBio] = React.useState(bio);
  const { api } = useAxios();

  const handleUpdateBio = async () => {
    if (editBio.length > 0) {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio: editBio }
      );
      console.log(response);
      if (response.status === 200) {
        setBioContent(response.data.user.bio);
        setIsEdit(!isEdit);
      }
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      {isEdit ? (
        <textarea
          className="w-full p-2 border border-slate-300 rounded-md text-gray-800"
          defaultValue={editBio}
          rows={5}
          cols={55}
          onChange={(e) => setEditBio(e.target.value)}
        />
      ) : (
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {bioContent}
          </p>
        </div>
      )}
      {isEdit && (
        <>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleUpdateBio}
          >
            <img src={TickIcon} alt="Edit" />
          </button>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setIsEdit(!isEdit)}
          >
            <img src={CloseIcon} alt="Close" />
          </button>
        </>
      )}
      {isMe && !isEdit && (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setIsEdit(!isEdit)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}

export default Bio;
