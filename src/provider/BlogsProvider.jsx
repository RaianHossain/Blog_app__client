import React, { useReducer } from "react";
import { BlogsContext } from "../context";
import { initialState, blogsReducer } from "../reducers/blogsReducer";

const BlogsProvider = ({children}) => {
	const [state, dispatch] = useReducer(blogsReducer, initialState);

	return (
		<BlogsContext.Provider value={{state, dispatch}}>
			{children}
		</BlogsContext.Provider>
	);
}

export default BlogsProvider;