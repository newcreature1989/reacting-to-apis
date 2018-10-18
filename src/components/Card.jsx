import React from "react";

const Card = props => {
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">{props.age}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
