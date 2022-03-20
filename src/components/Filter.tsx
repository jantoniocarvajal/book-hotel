import React from "react";
import { Hotel, HotelFilter } from "../api/model";
import "./filter.scss";

interface FilterProps {
  hotels: Hotel[];
  onApply(filter: HotelFilter): void;
}

export function Filter({ hotels, onApply }: FilterProps) {
  const [hotelSelected, setHotelSelected] = React.useState<string>();
  const [dateFrom, setDateFrom] = React.useState<Date>(new Date());
  const [dateTo, setDateTo] = React.useState<Date>(new Date());

  const apply = () => {
    onApply({ code: hotelSelected || "", from: dateFrom, to: dateTo });
  };

  return (
    <div className="filter">
      <div className="column">
        <label>Hotel</label>
        <select value={hotelSelected} onChange={(ev) => setHotelSelected(ev.target.value)}>
          <option key="0"></option>
          {hotels.map((h) => {
            return (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="column">
        <label>From</label>
        <input type="date" value={dateFrom.toISOString().substr(0, 10)} onChange={(ev: any) => setDateFrom(new Date(ev.target.value))} />
      </div>
      <div className="column">
        <label>To</label>
        <input type="date" value={dateTo.toISOString().substr(0, 10)} onChange={(ev: any) => setDateTo(new Date(ev.target.value))} />
      </div>
      <div className="column">
        <button disabled={!hotelSelected} onClick={apply}>
          Filter
        </button>
      </div>
    </div>
  );
}
