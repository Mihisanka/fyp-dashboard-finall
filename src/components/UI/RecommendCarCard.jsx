// import React from "react";
import CarItem from "./CarItem";
import React, { useState, useEffect } from "react";
import { db_admin, ref, onValue } from "../../firebase.js";

const RecommendCarCard = (props) => {
  // const { carName, retweet, imgUrl, rentPrice, percentage } = props.item;

  const [InputValues, setInputValues] = useState([]);

  useEffect(() => {
    onValue(ref(db_admin), (snapshot) => {
      setInputValues([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((carName) => {
          setInputValues((oldArray) => [...oldArray, carName]);
        });
      }
    });
  }, [setInputValues]);

  return (
    <div className="recommend__car-card">
      <div className="recommend__car-top">
        {/* <h5>
          <span>
            <i class="ri-refresh-line"></i>
          </span>
          {percentage}% Recommended
        </h5> */}
      </div>

      <div className="recommend__car-img">
        {/* <img src={imgUrl} alt="" /> */}
      </div>
      <div className="recommend__car-bottom">
        {/* <h4>{carName}</h4> */}
        <div className="recommend__car-other">
          <div className="recommend__icons">
            <p>
              <i class="ri-repeat-line"></i>
              {/* {retweet}k */}
            </p>
            <p>
              <i class="ri-settings-2-line"></i>
            </p>
            <p>
              <i class="ri-timer-flash-line"></i>
            </p>
          </div>
          {/* <span>rs.{rentPrice}/h</span> */}
        </div>
      </div>
   
        <div className="AllParkings__list" >
          {InputValues?.map((car) => (
            <CarItem item={car} key={car.carName} />
          ))}
        </div>
    </div>
  );
};

export default RecommendCarCard;
