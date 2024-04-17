import Store from "@/app/types/Stores";

const abu_dabi_position = [24.377360, 54.602550];
const dubai_position = [25.13286256541258, 55.227426776289924];

export async function getAllStores() : Promise<Store[]> {
    return [
        {
            name: "Dubai Store",
            location: {
                lat: dubai_position[0],
                long: dubai_position[1],
            }
        },
        {
            name: "Abu Dabi Store",
            location: {
                lat: abu_dabi_position[0],
                long: abu_dabi_position[1],
            }
        },
    ];
}