import React from "react";

function Field({ htmlFor, label, error, children }) {
  const labelId = htmlFor ?? getChildId(children);
  return (
    <div>
      {label && (
        <label htmlFor={labelId} className="block mb-2">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);
  return child.props.id;
};

export default Field;
