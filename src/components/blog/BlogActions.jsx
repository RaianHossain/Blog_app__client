import LikeIcon from "../../assets/icons/like.svg";
import LikeFilledIcon from "../../assets/icons/like-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import HeartFilledIcon from "../../assets/icons/heart-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useBlogs from "../../hooks/useBlogs";
import { actions } from "../../actions";

const BlogActions = ({ setBlog, blogItem }) => {	
	const { auth } = useAuth();
	console.log(blogItem.id);
	
	const [isLiked, setIsLiked] = useState(false);
	const {state, dispatch} = useBlogs();

	const [favorites, setIsFavorites] = useState([]);

	
	const [isFavorite, setIsFavorite] = useState(false);
	const { api } = useAxios();

	useEffect(() => {
		setIsLiked(blogItem?.likes?.find(blg => blg.id === auth?.user?.id) != undefined ? true : false);
		console.log(auth);
		
	}, [blogItem])

	useEffect(() => {
		const fetchFavorite = async() => {
			const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`);
			console.log(response);
			if(response.status === 200) {
				const isFav = response.data.blogs.find(blg => blg.id === blogItem.id);
				console.log(isFav);
				if(isFav) {
					setIsFavorite(true);
				}
			}
		}
		fetchFavorite();
	}, [])

	const handleLike = async() => {
		const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogItem.id}/like`);
		console.log(response);
		
		if(response && response.status === 200) {
			dispatch({type: actions.blogs.BLOG_LIKED, payload: {id: blogItem.id, likes: response.data.likes}});
			setBlog({...blogItem, likes: response.data.likes});
			setIsLiked(response.data.isLiked);
			
		}		
	}

	const handleFavorite = async() => {
		const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogItem.id}/favourite`);
		console.log(response);
		
		if(response && response.status === 200) {
			setIsFavorite(response.data.isFavourite);			
		}
	}

	return (
		<div className="floating-action">
	        <ul className="floating-action-menus">
	          <li>
	          {isLiked ? (<img src={LikeFilledIcon} alt="like" onClick={handleLike}/>) : (<img src={LikeIcon} alt="like" onClick={handleLike}/>)}
	            
	            <span>{blogItem?.likes?.length}</span>
	          </li>

	          <li>
	            {isFavorite ? (<img src={HeartFilledIcon} alt="Favourite" onClick={handleFavorite} />) : (<img src={HeartIcon} alt="Favourite" onClick={handleFavorite} />)}
	          </li>
	          <a href="#comments">
	            <li>
	              <img src={CommentIcon} alt="Comments" />
	              <span>{blogItem?.comments?.length}</span>
	            </li>
	          </a>
	        </ul>
	    </div>
	)
}

export default BlogActions;