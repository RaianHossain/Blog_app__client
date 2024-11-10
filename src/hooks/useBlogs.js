import { BlogsContext } from "../context";
import { useContext } from "react";

const useBlogs = () => {
	return useContext(BlogsContext);
}

export default useBlogs;