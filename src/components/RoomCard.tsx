import { Room } from "../api/model";
import "./roomCard.scss";

interface Props {
  room: Room;
}

export function RoomCard({ room }: Props) {
  return (
    <div className="card">
      <p className="card-title">{room.name}</p>
      {room.rates.map((rate) => {
        return (
          <div className="info-panel">
            <p className="fare">Fare: {rate.name}</p>
            <p className="price">Price: {rate.total_price} €</p>
          </div>
        );
      })}
    </div>
  );
}
