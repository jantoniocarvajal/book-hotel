import React, { useState } from "react";
import { Hotel, HotelFilter, Room } from "../api/model";
import { useRestApiClient } from "../components/Context";
import { Filter } from "../components/Filter";
import { RoomCard } from "../components/RoomCard";
import "./availability.scss";

export function Availability() {
  const apiClient = useRestApiClient();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelSelected, setHotelSlected] = useState<Hotel>();
  const [filter, setFilter] = useState<HotelFilter>();
  const [rooms, setRooms] = useState<Room[]>([]);

  React.useEffect(() => {
    apiClient.getHotels().then(setHotels);
  }, []);

  function apply(filter: HotelFilter) {
    setHotelSlected(hotels.find((hotel) => hotel.id === filter.code));
    setFilter(filter);
    apiClient.getAvailability(filter).then(setRooms);
  }

  function getDays() {
    if (filter && filter.from && filter.to) {
      return Math.round((filter.to.getTime() - filter.from.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  return (
    <div>
      <header>
        <h1>Booking Availability</h1>
      </header>
      <hr />
      <Filter hotels={hotels} onApply={apply} />
      {rooms.length > 0 ? (
        <div className="results">
          <p className="title">
            {rooms.length} types of rooms available at {hotelSelected?.name}
          </p>
          <p className="subtitle">
            From {filter?.from?.toISOString().substr(0, 10)} to {filter?.to?.toISOString().substr(0, 10)} ({getDays()} nights)
          </p>
          {rooms.map((room) => (
            <RoomCard room={room} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p className="title">CHECK AVAILABILITY</p>
          <p className="subtitle">Select a Hote and tow dates and you will receive results</p>
        </div>
      )}
    </div>
  );
}
