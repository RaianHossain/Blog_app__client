import React, {useState} from "react";
import { Link } from "react-router-dom";
import OptionsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

function BlogCard({ blog }) {
  const { title, content, thumbnail, author, likes } = blog;
  const { auth } = useAuth();
  const isMe = auth.user ? auth?.user?.id === author?.id : false;
  const navigate = useNavigate();
  const {state, dispatch} = useBlogs();
  const {state:profileState, dispatch: profileDispatch} = useProfile();
  const {api} = useAxios();
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  }

  const handleDelete = async(id) => {
    const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`);

    if(response.status === 200) {
      dispatch({type: actions.blogs.DATA_DELETED, payload: id});
      profileDispatch({type: actions.profile.BLOG_DELETED, payload: id})
    }
  }


  return (
    <>
      {/*<Link to={`/blog/${blog.id}`} className="blog-card">*/}
      <div className="blog-card">
        {blog.thumbnail && (
          <img
            className="blog-thumb"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
              blog.thumbnail
            }`}
            alt=""
          />
        )}
        <div className="mt-2 relative">
          <Link to={`/blog/${blog.id}`}>
            <h3 className="text-slate-300 text-xl lg:text-2xl">
              <Link to={`/blog/${blog.id}`}>{title}</Link>
            </h3>
          
            <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>
          </Link>
          <div className="flex justify-between items-center">
          <Link to={`/profile/${author?.id}`}>
            <div className="flex items-center capitalize space-x-2">
              
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">{author?.firstName[0]}</span>
                </div>

                <div>
                  <h5 className="text-slate-500 text-sm">
                    
                      {author?.firstName} {author?.lastName}
                    
                  </h5>
                  <div className="flex items-center text-xs text-slate-700">
                    <span>June 28, 2018</span>
                  </div>
                </div>
              
            </div>
          </Link>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>{likes.length}</span>
            </div>
          </div>

          {isMe && (
            <div className="absolute right-0 top-0">
              <button onClick={() => setIsOptionOpen(prev => !prev)}>
                <img src={OptionsIcon} alt="3dots of Action" />
              </button>

              {isOptionOpen && (<div className="action-modal-container">
                  <button className="action-menu-item hover:text-lwsGreen" onClick={(e) => handleEdit(blog.id)}>
                    <img src={EditIcon} alt="Edit" />
                    Edit
                  </button>
                  <button className="action-menu-item hover:text-red-500" onClick={() => handleDelete(blog.id)}>
                    <img src={DeleteIcon} alt="Delete" />
                    Delete
                  </button>
                </div>)}
            </div>
          )}
        </div>
      </div>
      {/*</Link>*/}
    </>
  );
}

export default BlogCard;
