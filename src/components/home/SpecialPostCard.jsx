import React from "react";
import { Link } from "react-router-dom";

function SpecialPostCard({ blog, fav=false }) {
  return (
    <li>
      <Link to={`/blog/${blog.id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {blog?.title}
        </h3>
      </Link>
      {!fav && <p className="text-slate-600 text-sm">
              by
              <Link to={`/profile/${blog?.author?.id}`}>
                {" "}
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
              <span>·</span> {blog?.likes?.length} Likes
            </p>}
    </li>
  );
}

export default SpecialPostCard;
