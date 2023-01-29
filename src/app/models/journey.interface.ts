import { Flight } from "./flight.interface";

export interface Journey {
    destination: string;
    flights: Flight[];
    origin: string;
    price: number;
}