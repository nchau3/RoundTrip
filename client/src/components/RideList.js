import React from "react";

//Components
import RideListItem from "./RideListItem";

//import './styles/ride.scss';

export default function RideList(props) {

  const searchResults = props.rides.map((ride) => {
    return (
      <RideListItem
        key={ride.id}
        first_name={ride.first_name}
        last_name={ride.last_name}
        car_model={ride.car_model}
        car_make={ride.car_make}
        car_color={ride.car_color}
        pickup={ride.pickup}
        dropoff={ride.dropoff}
        departure={ride.departure_date_time}
        cost={ride.cost_per_seat}
      />
    );
  });

  return (
    <ul>
      {searchResults}
    </ul>
  );
}