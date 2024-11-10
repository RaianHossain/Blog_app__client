import { useParams } from "react-router-dom";
import  { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const EditBlogPage = () => {
	const { blogId } = useParams();
	const [blog, setBlog] = useState();
	const {register, setErrors, formState: {errors, isDirty}, handleSubmit, reset}  = useForm();
	const {api} = useAxios();

	useEffect(() => {
		const fetchBlog = async() => {
			const response = await axios(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`);
			console.log(response);
			setBlog(response.data);
			reset({
				title: response.data.title,
				content: response.data.content,
				tags: response.data.content
			})
		}

		fetchBlog();
	}, [])

	const onFormSubmit = async(formData) => {
		const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`, formData);
		if(response.status === 200){
			reset({
				title: response.data.title,
				content: response.data.content,
				tags: response.data.tags
			})
			alert("Success");
		}
		

	}

	

	return (
		<main>
	      <section>
	        <div className="container">
	          {/*<!-- Form Input field for creating Blog Post -->*/}
	          <form className="createBlog" onSubmit={handleSubmit(onFormSubmit)}>
	            <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
	              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
	                <svg
	                  xmlns="http://www.w3.org/2000/svg"
	                  fill="none"
	                  viewBox="0 0 24 24"
	                  strokeWidth="1.5"
	                  stroke="currentColor"
	                  className="w-6 h-6"
	                >
	                  <path
	                    strokeLinecap="round"
	                    strokeLinejoin="round"
	                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
	                  />
	                </svg>
	                <p>Upload Your Image</p>
	              </div>
	            </div>
	            <div className="mb-6">
	              <input {...register("title", {required: "Title is required"})} type="text" id="title" name="title" placeholder="Enter your blog title" 
	               />
	              {!!errors.title && <p role="alert" className="text-red-600 mt-2">{errors.title.message}</p>}
	            </div>

	            <div className="mb-6">
	              <input
	              	{...register('tags')}
	                type="text"
	                id="tags"
	                name="tags"
	                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
	                
	              />
	            </div>

	            <div className="mb-6">
	              <textarea {...register('content', {required: "Content is required"})} id="content" name="content" placeholder="Write your blog content" rows="8"></textarea>
	              {!!errors.content && <p role="alert" className="text-red-600 mt-2">{errors.content.message}</p>}
	            </div>

	            <button
	              className={isDirty ? "bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200" 
	              						: "bg-gray-600 text-white px-6 py-2 md:py-3 rounded-md "}
	              type="submit"
	              disabled={isDirty ? false : true}
	            >
	              Update Blog
 	            </button>	
	          </form>
	          
	        </div>
	      </section>
	    </main>
	)
}

export default EditBlogPage;