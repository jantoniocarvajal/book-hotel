import { Application, Request, Response } from "express";
import { HotelRepository } from "../repositories/hotel";

export function configureHotelRoutes(app: Application, repository: HotelRepository): void {
  app.route("/api/hotels").get(getHotels);

  app.route("/api/hotels/:hotelId").get(getHotel);

  async function getHotels(req: Request, res: Response) {
    const hotels = await repository.getAll();
    res.status(200).send(hotels);
  }

  async function getHotel(req: Request, res: Response) {
    const id = req.params.hotelId;
    const hotel = await repository.get(id);
    if (hotel) {
      res.status(200).send(hotel);
    } else {
      res.status(400).send(`Hotel ID:${id} not found.`);
    }
  }
}
