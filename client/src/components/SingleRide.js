import React from "react";
import "../styles/component-styles/single-ride.scss";

export default function SingleRide(props) {
  return (
    <section>
      <article className="single-ride">
        <div className="ride-info">
          <header>
            <img src={props.avatar} className="avatar" alt="driver" />
            <div>
              <h4>{props.first_name} {props.last_name}</h4>
              <div>{props.rating} <i class="fa-solid fa-star"></i> {props.trip_count} rides</div>
            </div>
          </header>
          <h3>{props.pickup} to {props.dropoff}</h3>
          <p>Leaving {props.departure}</p>
          <div>
            <div>Pickup: {props.pickup}</div>
            <div>Dropoff: {props.dropoff}</div>
            <div>2 seats left - ${props.cost} per seat</div>
          </div>
          <p className="ride-description">{props.description}</p>
        </div>
        <div className="car-info">
          <img src={props.car_image} className="car-pic" alt="driver's car"/>
          <h4>{props.car_make} {props.car_model}</h4>
          <div className="ride-conditions">
            <div className="condition-item">
              <div className="icon">
                <i class="fa-solid fa-dog"></i>
              </div>
              Pets
            </div>
            <div className="condition-item">
              <div className="icon">
              <i class="fa-solid fa-suitcase"></i>
              </div>
              <div>Oversize</div>
            </div>
            <div className="condition-item">
              <div className="icon">
              <i class="fa-solid fa-person-skiing"></i> 
              </div>
              Skis
            </div>
            <div className="condition-item">
              <div className="icon">
              <i class="fa-solid fa-bicycle"></i>
              </div>
              Bikes
            </div>
          </div>
        </div>
      </article>
      <button onClick={() => props.onSubmit(props.id, props.user_id)}>Book Trip</button>
      <button onClick={() => props.goBack()}>Back to results</button>
    </section>
  );
}
