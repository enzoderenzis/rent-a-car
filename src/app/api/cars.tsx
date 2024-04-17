import CarType, {CarStatus} from "@/app/types/CarType";

export async function getAllCars() {

    const cars: CarType[] = [
    {
        code: "1",
        label: "Tesla Model 3",
        color: "blue",
    },
    {
        code: "2",
        label: "Volkswagen Golf",
        color: "red",
    },
    {
        code: "3",
        label: "Volkswagen Polo",
        color: "green",
    },
    {
        code: "4",
        label: "Volkswagen Polo",
        color: "blue",
    },
    {
        code: "5",
        label: "Volkswagen Polo",
        color: "white",
    },
    {
        code: "6",
        label: "Range Rover",
        color: "black",
    },
    {
        code: "7",
        label: "Porsche 911",
        color: "gray",
    }
    ];
    return cars;
}

const abu_dabi_position = [24.377360, 54.602550];
const dubai_position = [25.13286256541258, 55.227426776289924];

export async function getAllCarsStatus() : Promise<CarStatus[]> {
    return [
        {
            car: {
                code: "1",
                label: "Tesla Model 3",
                color: "blue",
            },
            position: {
                lat: 24.908868452287095,
                long: 55.15189577042853
            },
            booked: {
                by: {
                    id: 1,
                    name: "Joe Smith",
                },
                fromDate: new Date().getTime(),
            }

        },
        {
            car: {
                code: "2",
                label: "Volkswagen Golf",
                color: "red",
            },
            position: {
                lat: 25.227314891143102,
                long: 55.49247194231265,
            },
            booked: {
                by: {
                    id: 2,
                    name: "Max Power",
                },
                fromDate: new Date().getTime(),
            }

        },
        {
            car: {
                code: "3",
                label: "Volkswagen Polo",
                color: "green",
            },
            position: {
                lat: 24.42961371020738,
                long: 54.42659757917384
            },
            booked: {
                by: {
                    id: 4,
                    name: "Homer Simpson",
                },
                fromDate: new Date().getTime(),
            }
        },
        {
            car: {
                code: "4",
                label: "Volkswagen Polo",
                color: "blue",
            },
            position: {
                lat: 24.493973972688174,
                long: 54.38008681953114,
            },
            booked: {
                by: {
                    id: 14,
                    name: "Otto",
                },
                fromDate: new Date().getTime(),
            }
        },
        {
            car: {
                code: "5",
                label: "Volkswagen Polo",
                color: "white",
            },
            position: {
                lat: abu_dabi_position[0],
                long: abu_dabi_position[1],
            }
        },
        {
            car: {
                code: "6",
                label: "Range Rover",
                color: "black",
            },
            position: {
                lat: dubai_position[0],
                long: dubai_position[1],
            }
        },
        {
            car: {
                code: "7",
                label: "Porsche 911",
                color: "gray",
            },
            position: {
                lat: abu_dabi_position[0],
                long: abu_dabi_position[1],
            }
        }
        ];
}


export async function getAllBookedCars() : Promise<CarStatus[]> {
    return [
        {
            car: {
                code: "1",
                label: "Tesla Model 3",
                color: "blue",
            },
            position: {
                lat: 24.908868452287095,
                long: 55.15189577042853
            },
            booked: {
                by: {
                    id: 1,
                    name: "Joe Smith",
                },
                fromDate: new Date().getTime(),
            }

        },
        {
            car: {
                code: "2",
                label: "Volkswagen Golf",
                color: "red",
            },
            position: {
                lat: 25.227314891143102,
                long: 55.49247194231265,
            },
            booked: {
                by: {
                    id: 2,
                    name: "Max Power",
                },
                fromDate: new Date().getTime(),
            }

        },
        {
            car: {
                code: "3",
                label: "Volkswagen Polo",
                color: "green",
            },
            position: {
                lat: 24.42961371020738,
                long: 54.42659757917384
            },
            booked: {
                by: {
                    id: 4,
                    name: "Homer Simpson",
                },
                fromDate: new Date().getTime(),
            }
        },
        {
            car: {
                code: "4",
                label: "Volkswagen Polo",
                color: "blue",
            },
            position: {
                lat: 24.493973972688174,
                long: 54.38008681953114,
            },
            booked: {
                by: {
                    id: 14,
                    name: "Otto",
                },
                fromDate: new Date().getTime(),
            }
        },
        ];
}


export async function rentCar(car: CarType, bookedBy : string ) {
     return;
}