import CloseIcon from "../assets/icons/close.svg";
import { useRef, useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import useAxios from "../hooks/useAxios";
import {Link, useNavigate} from "react-router-dom";

const SearchModal = ({ onClose }) => {
	const searchFieldRef = useRef();
	const [blogs, setBlogs] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const {api} = useAxios();
	const navigate = useNavigate();

	useEffect(() => {
		// console.log(searchFieldRef.current);
		searchFieldRef.current.focus();
	}, []);

	const handleSearch = async() => {
		if(searchTerm.length > 0) {
			const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${searchTerm}`);
			if(response.status = 200) {
				console.log(response);
				setBlogs(response.data.data);
			}
		} else {
			setBlogs([])
		}
	}

	const handleClick =(blogId)=> {
		onClose();
		navigate(`/blog/${blogId}`);
	}


	return (
		<section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
	      {/*<!-- Search Container -->*/}
	      <div
	        className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10"
	      >
	        {/*<!-- Search -->*/}
	        <div>
	          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">Search for Your Desire Blogs</h3>
	          <input
	          	ref={searchFieldRef}
	            type="text"
	            placeholder="Start Typing to Search"
	            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
	            value={searchTerm}
	            onChange={(e) => setSearchTerm(e.target.value)}
	            onKeyUp={e => e.key === 'Enter' && handleSearch()}
	          />
	        </div>

	        {/*<!-- Search Result -->*/}
	        {blogs.length > 0 ? 
	        	(<div className="">
    	          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
    	          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
    	            {blogs.map(blog => (
    	            	<div className="flex gap-6 py-2 hover:cursor-pointer" key={blog.id} onClick={() => handleClick(blog.id)}>
    	            	
    	            		{/*<img className="h-28 object-contain" src={ImageCheck} alt="" />*/}
	    	              <img className="h-28 object-contain" src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog.thumbnail}`} alt="" />
	    	              <div>
	    	                <h3 className="text-slate-300 text-xl font-bold">{blog.title}</h3>
	    	                {/*<!-- Meta Informations -->*/}
	    	                <p className="mb-6 text-sm text-slate-500 mt-1 h-10 overflow-hidden">
	    	                  {blog.content}
	    	                </p>
	    	              </div>
	    	            </div>
    	            ))}
    	          </div>
    	        </div>)
	        	:
	        	(<p className="text-slate-300 mt-4">Press <i>Enter</i> to search</p>)
	        }

	        <button onClick={onClose}>
	          <img src={CloseIcon} alt="Close" className="absolute right-2 top-2 cursor-pointer w-8 h-8" />
	        </button>
	      </div>
	    </section>
	)
}

export default SearchModal;