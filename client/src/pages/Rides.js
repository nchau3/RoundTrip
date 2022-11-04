import React, { useState } from "react";
import axios from "axios";

import RideList from "../components/RideList";
import SearchRides from "../components/SearchRides";
import SingleRide from "../components/SingleRide";

export default function Rides() {
  const [ride, setRide] = useState();
  const [rides, setRides] = useState([]);
  const user_id = localStorage.getItem("user_id");

  function searchRides(params) {
    axios.get("/api/rides/search", { params: params })
    .then(response => {
        setRides(response.data)
      });
  }

  function displayRide(ride_id) {
    axios.get(`api/rides/${ride_id}`)
    .then(response => {
      setRide(response.data[0]);
    })
  }

  function bookTrip(ride_id, user_id) {
    axios.post(`api/trips/${ride_id}/${user_id}`)
    .then(response => {
    if (response.status === 201) {
      console.log("booked!")
    } 
    })
  }

  return (
    <div className="page-container">
      {ride ? 
      <div>
        <SingleRide
        key={ride.id}
        id={ride.id}
        user_id={user_id}
        first_name={ride.first_name}
        last_name={ride.last_name}
        avatar={ride.avatar}
        car_model={ride.car_model}
        car_make={ride.car_make}
        car_color={ride.car_color}
        pickup={ride.pickup}
        dropoff={ride.dropoff}
        departure={ride.departure_date_time}
        cost={ride.cost_per_seat}
        rating={ride.rating}
        trip_count={ride.trip_count}
        description={ride.description}
        onClick={bookTrip}
        />
      </div>
        :
        rides.length > 0 ? 
          <div className="listings-container">
            <h1>Search results:</h1>
            <RideList rides={rides} onClick={displayRide}/>
          </div>
          :
          <SearchRides onSubmit={searchRides} />
      }

    </div>
  );
}