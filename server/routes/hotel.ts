import { Application, Request, Response } from "express";
import { HotelRepository } from "../repositories/hotel";

export function configureHotelRoutes(app: Application, repository: HotelRepository): void {
  app.route("/api/hotels").get(getHotels);

  app.route("/api/availability/:hotelId/:from/:to/").get(getAvailability);

  async function getHotels(req: Request, res: Response) {
    const hotels = await repository.getAll();
    res.status(200).send(hotels);
  }

  async function getAvailability(req: Request, res: Response) {
    const hotelId = req.params.hotelId;
    const from = new Date(req.params.from);
    const to = new Date(req.params.to);

    const rooms = repository.getAviability(hotelId, from, to);

    if (rooms) {
      res.status(200).send(rooms);
    } else {
      res.status(400).send(`Not found.`);
    }
  }
}
