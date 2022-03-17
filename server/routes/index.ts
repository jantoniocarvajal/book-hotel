import { Application, Request, Response } from "express";

export function configureIndexRoutes(app: Application): void {
  app.route("/api").get(async (req: Request, res: Response) => {
    res.status(200).send({
      product: "Book Hotel",
      builtBy: "Juan Antonio Carvajal",
    });
  });
}
