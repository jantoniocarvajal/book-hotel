import cors from "cors";
import express, { Application } from "express";
import { HotelRepository } from "./repositories/hotel";
import { configureHotelRoutes } from "./routes/hotel";
import { configureIndexRoutes } from "./routes/index";

class Server {
  public app: Application;

  constructor() {
    this.app = express();

    this.config();
    this.configureRoutes();
  }

  private config(): void {
    this.app.set("port", process.env.PORT || process.env.port || 4000);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private configureRoutes(): void {
    const hotelsRespository = new HotelRepository();

    configureHotelRoutes(this.app, hotelsRespository);
    configureIndexRoutes(this.app);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port ", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
