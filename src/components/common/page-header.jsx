import React from "react";

const PageHeader = ({ title, desc }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-4">
          <h1 className="display-4">{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
