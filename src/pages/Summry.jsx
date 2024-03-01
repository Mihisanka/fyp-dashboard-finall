import React from "react";
import summry from "../assets/images/summry.png";
import "../styles/summry.css";
import TrackingChart from "../charts/TrackingChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Summry = () => {
  const percentage = 55;
  const percentage02 = 45;
  return (
    <div className="summry">
      <div className="sell__car-wrapper">
        <h2 className="summry-title">Totall parkings of the day</h2>
        <div className="summry-top">
          <div className="summry-img">
            <h2></h2>
            <img src={summry} alt="" />
          </div>

          <div className="parking__history">
            <h3>Parking  History</h3>
            <TrackingChart />
          </div>
        </div>

        <div className="offer__wrapper">
          <div className="offer__top">
            <h2 className="Summry-title">Offers</h2>
          </div>

          <div className="offer__list">
            <div className="offer__item">
              <div className="box__01">
                <h3 className="client__name">City Park</h3>
                <h6 className="avg__price">
                  400 <span>average vehicle</span>
                </h6>

                <h6 className="market__price">Total vehicle</h6>
                <span className="arrow__key">
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>Impression Share</h4>
              </div>

              <div className="box__03">
                <span className="model__spend-icon">
                  <i class="ri-car-line"></i>
                </span>
                <h6 className="spend__amount">1174</h6>
                <p className="spend__title">Totall count</p>
              </div>

              <div className="box__04">
                <span className="model__spend-icon">
                  <i class="ri-share-forward-line"></i>
                </span>
                <h6 className="spend__amount">174</h6>
                <p className="spend__title">Per Day</p>
              </div>

              <div className="box__05">
                <span className="model__spend-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </span>
                <h6 className="spend__amount">Rs 5000</h6>
                <p className="spend__title">Cost</p>
              </div>
            </div>
            <div className="offer__item">
              <div className="box__01">
                <h3 className="client__name">Viharamahadevi Park</h3>
                <h6 className="avg__price">
                  400 <span>average vehicle</span>
                </h6>

                <h6 className="market__price">Market average is $11,244</h6>
                <span className="arrow__key">
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={percentage02}
                    text={`${percentage02}%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>Impression Share</h4>
              </div>

              <div className="box__03">
                <span className="model__spend-icon">
                  <i class="ri-car-line"></i>
                </span>
                <h6 className="spend__amount">1174</h6>
                <p className="spend__title">Totall count</p>
              </div>

              <div className="box__04">
                <span className="model__spend-icon">
                  <i class="ri-share-forward-line"></i>
                </span>
                <h6 className="spend__amount">1174</h6>
                <p className="spend__title">Per Day</p>
              </div>

              <div className="box__05">
                <span className="model__spend-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </span>
                <h6 className="spend__amount">Rs.5000</h6>
                <p className="spend__title">Cost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summry ;
