import Location from "./Location";

export default interface CarType {
    code: string;
    label: string;
    color: string;
}


export interface CarStatus {
    car: CarType;
    position: Location;
    booked?: BookData;
}


export interface BookData {
    by: Client;
    fromDate: number;
    toDate?: number;
    returned?: Location;
}

export interface Client {
    id: number;
    name: string;
}