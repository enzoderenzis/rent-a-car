"use client"
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer,  Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';


import CarType, {CarStatus} from '@/app/types/CarType';
import Store from '@/app/types/Stores';
import ReturnCarModal from './ReturnCarModal';
import RentCarModal from './RentCarModal';


const abu_dabi_position = [24.377360, 54.602550];
const dubai_position = [25.13286256541258, 55.227426776289924];


//
export default function CarMap({availableCars, stores} : { availableCars: CarStatus[], stores: Store[]} ) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentStore, setCurrentStore] = useState<string | null>(null);

  const [openRentModal, setOpenRentModal] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);


  const onReturnClick = (storeName : string) => {
    setOpenModal(true);
    setCurrentStore(storeName);
  }

  const onRentClick = (car: CarType) => {
    setOpenRentModal(true);
    setSelectedCar(car);
  }

  const onModalClose = () => {
    setOpenModal(false);
    setCurrentStore(null);
  };

  const onRentModalClose = () => {
    setOpenRentModal(false);
    setSelectedCar(null);
  };



  return (
    <div className="grid w-full z-20 h-screen">
      <ReturnCarModal open={openModal} onclose={onModalClose} store={currentStore} />
      <RentCarModal open={openRentModal} onclose={onRentModalClose} car={selectedCar} store={null} />
      <MapContainer center={dubai_position} zoom={11} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {availableCars.map((cs: CarStatus, idx : number) =>  (
          <Marker key={cs.car.code} position={[cs.position.lat, cs.position.long]} >
            <Popup>
              <div className="flex flex-col w-full">
                <label>{cs.car.label} {cs.car.color}</label>
                <Button variant="contained" onClick={() => onRentClick(cs.car)}  size="small" color="success" >Rent this Car</Button>
              </div>
            </Popup>
          </Marker>
        ))}
        {stores.map( (s: Store, idx: number) => (
          <Marker key={idx} position={[s.location.lat, s.location.long]} >
            <Popup>
              <div className="flex flex-col" >
                <label>{s.name}</label>
                <Button variant="contained" onClick={() => onReturnClick(s.name)}  size="small" color="secondary" >Return a Car</Button>
              </div>
            </Popup>
          </Marker>
        ) )}
      </MapContainer>
    </div>
  );
}