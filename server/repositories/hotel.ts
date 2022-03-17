import { Hotel } from "../../src/api/model";
import { findById } from "./helper";

export class HotelRepository {
  private hotels: Hotel[] = [];

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
}
