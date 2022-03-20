import { Breakdown, Hotel, Room } from "../../src/api/model";
import { findById } from "./helper";

export const initialHotels: Hotel[] = [
  {
    id: "001",
    name: "Hotel 001",
  },
  {
    id: "002",
    name: "Hotel 002",
  },
  {
    id: "003",
    name: "Hotel 003",
  },
];

export const initialRooms: Room[] = [
  {
    name: "Room 10",
    rates: [
      {
        name: "Rate 101",
      },
      {
        name: "Rate 102",
      },
      {
        name: "Rate 103",
      },
    ],
  },
  {
    name: "Room 20",
    rates: [
      {
        name: "Rate 201",
      },
      {
        name: "Rate 202",
      },
      {
        name: "Rate 203",
      },
    ],
  },
  {
    name: "Room 30",
    rates: [
      {
        name: "Rate 301",
      },
      {
        name: "Rate 302",
      },
      {
        name: "Rate 303",
      },
    ],
  },
];

export class HotelRepository {
  private hotels: Hotel[] = initialHotels;
  private rooms: Room[] = initialRooms;

  public getAll(): Promise<Hotel[]> {
    return Promise.resolve(this.hotels.map((hotel) => ({ ...hotel })));
  }

  public get(id: string): Promise<Hotel> {
    const hotel = findById(id, this.hotels);
    if (hotel) {
      return Promise.resolve({ ...hotel });
    } else {
      throw new Error(`Hotel ID:${id} not found.`);
    }
  }

  private price_random(min: number, max: number, decimals: number = 2) {
    const random = Math.random() * (max - min) + min;
    const power = Math.pow(10, decimals);
    return Math.floor(random * power) / power;
  }

  public getAviability(hotelId: string, from: Date, to: Date): Room[] {
    const days = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

    const result = this.rooms.map((room) => {
      const ratesTemp = room.rates.map((rate) => {
        const breakdownsTemp: Breakdown[] = [];
        const priceTemp = this.price_random(25, 200);
        for (let i = 0; i <= days; i++) {
          const dateTemp = new Date(from);
          const breakdown: Breakdown = {
            date: new Date(dateTemp.setDate(dateTemp.getDate() + i)),
            price: priceTemp,
            allotment: Math.floor(Math.random() * 5) + 1,
          };
          breakdownsTemp.push(breakdown);
        }

        return {
          ...rate,
          total_price: breakdownsTemp.reduce((total, breakdown) => total + breakdown.price, 0),
          breakdowns: breakdownsTemp,
        };
      });

      return {
        ...room,
        rates: ratesTemp,
      };
    });

    return result;
  }
}
