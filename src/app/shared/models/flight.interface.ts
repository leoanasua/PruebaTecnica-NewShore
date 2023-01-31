import { Transport } from "./transport.interface";

export interface Flight {
  destination: string;
  origin: string;
  price: number;
  transport: Transport;
}