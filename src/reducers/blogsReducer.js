import {actions} from "../actions";

const initialState = {
	blogs: [],
	loading: false,	
}

const blogsReducer = (state, action) => {
	switch(action.type) {
		case actions.blogs.DATA_FETCHING: {
			return {
				...state,
				loading: true
			}
		}

		case actions.blogs.DATA_FETCHED: {
			console.log(action.payload);
			return {
				...state,
				blogs: [...state.blogs, ...action.payload],
				loading: false
			}
		}

		case actions.blogs.DATA_EDITED: {
			return {
				...state,
				blogs: state.blogs.map(blod => {
					if(blod.id == action.payload.id) {
						return action.payload;
					} else {
						return blog;
					}
				})
			}
		}

		case actions.blogs.DATA_DELETED: {
			return {
				...state,
				blogs: state.blogs.filter(blog => blog.id !== action.payload)
			}
		}

		case actions.blogs.DATA_CREATED: {
			return {
				...state,
				blogs: [...state.blogs, action.payload]
			}
		}

	case actions.blogs.BLOG_LIKED: {
		console.log(action.payload);
		return {
			...state,
			blogs: state.blogs.map(blg => {
				if(blg.id === action.payload.id) {
					return {
						...blg,
						likes: action.payload.likes
					};
				} else {
					return blg;
				}
			})
		}
	}
	}
}

export { blogsReducer, initialState };