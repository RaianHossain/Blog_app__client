import { useForm } from "react-hook-form"
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import { actions } from "../actions";
import { useRef, useState } from "react";

const CreateBlog = () => {
	const {register, setError, handleSubmit, formState: { errors }} = useForm();
	const {api} = useAxios();
	const navigate = useNavigate();
	const { state, dispatch } = useBlogs();
	const fileUploaderRef = useRef();
	const [previewImage, setPreviewImage] = useState();
  	const [imageFile, setImageFile] = useState();

	const handleImageUpload = (event) => {
	    event.preventDefault();

	    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
	    fileUploaderRef.current.click();
	 };

	const updateImageDisplay = (event) => {
	  const files = event.target.files;
	  if (files && files[0]) {
	    setPreviewImage(URL.createObjectURL(files[0]));
	    setImageFile(files[0]); // Set the file to state
	  }
	};


	const onFormSubmit = async (formData) => {
	  const newFormData = new FormData();
	  
	  // Append form fields to FormData
	  newFormData.append("title", formData.title);
	  newFormData.append("tags", formData.tags);
	  newFormData.append("content", formData.content);

	  // Append image file if it exists
	  if (imageFile) {
	    newFormData.append("thumbnail", imageFile); // 'thumbnail' matches multer field name
	  }

	  // Send FormData with correct headers
	  try {
	    const response = await api.post(
	      `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
	      newFormData,
	      {
	        headers: { "Content-Type": "multipart/form-data" }
	      }
	    );

	    if (response.status === 201) {
	      dispatch({ type: actions.blogs.DATA_CREATED, payload: response.data.blog });
	      setTimeout(() => {
	        navigate(`/blog/${response.data.blog.id}`);
	      }, 1000);
	    }
	  } catch (error) {
	    console.error("Error uploading file:", error);
	  }
	};


	return (
		<main>
	      <section>
	        <div className="container">
	          {/*<!-- Form Input field for creating Blog Post -->*/}
	          <form className="createBlog" onSubmit={handleSubmit(onFormSubmit)}>
	            
	              	{!previewImage ? 
	              		(<div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
	              			<div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer" onClick={handleImageUpload}>
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
			  	        </div>)
	              		:
	              		(<div className="grid place-items-center rounded-md my-4">
	              			<img className="w-100 h-[250px]" src={previewImage} />
	              		</div>)
	          		}
	          		<input
			            type="file"
			            name="image"
			            id="thumbnail"
			            className="hidden"			            
			            ref={fileUploaderRef}
			            hidden
			        />
	              
	            
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
	              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
	            >
	              Create Blog
 	            </button>
	              
	          </form>
	        </div>
	      </section>
	    </main>
		)
}

export default CreateBlog;