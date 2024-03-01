import React from "react";

const CarItem = (props) => {
  const defaultImageUrl = 'https://www.shutterstock.com/image-photo/empty-parking-lots-aerial-view-260nw-586368239.jpg';
  const { carparkName, address, price, capacity, availability } = props.item;
  
  // Define styles based on availability
  const availabilityStyle = {
    color: availability === "available" ? "#01d293" : "red",
    textTransform: 'capitalize'
  };

  return (
    <div className="park_item">
      <a href="../users/user" className={props.clicked === "user" ? "selected" : ""}>
        {" "} 
      </a>  

      <div className="park_item-top">
        <div className="park_item-tile">
          <h3>{carparkName}</h3>
          <span>
            <i className="ri-heart-line"></i>
          </span>
        </div>
        <p>{address}</p>
      </div>

      <div className="car__img">
        <img src={defaultImageUrl} alt="" />
      </div>

      <div className="park_item-bottom">
        <div className="car__bottom-left">
          <p>
            <i className="ri-user-line"></i> {capacity}
          </p>
          <p>
            <i className="ri-car-line"></i> <span style={availabilityStyle}>{availability}</span>
          </p>
          <p>
            <i className="ri-money-dollar-circle-line"></i>
            Rs.{price}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
