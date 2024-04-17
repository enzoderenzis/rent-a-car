import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import CarAutocomplete from './CarAutocomplete';
import { getAllBookedCars } from '../api/cars';
import CarType, { CarStatus } from '../types/CarType';


interface ReturnCarModalProps {
    open: boolean;
    store?: string | null;
    car?: CarType | null;
    onclose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ReturnCarModal({open, store, car, onclose}  : ReturnCarModalProps) {
    const [bookedCars, setBookedCars] = useState<CarStatus[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarType | null | undefined>(car);
    const [selectedStore, setSelectedStore] = useState<string | null | undefined>(store);
    const [disabledReturnButton, setDisabledReturnButton] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const booked = await getAllBookedCars();
            setBookedCars(booked);
        })();
    }, []);


    useEffect(() => {
        const disabled = !selectedCar || !selectedStore;
        console.log({selectedCar, selectedStore, disabled})
        if(disabled !== disabledReturnButton) {
            setDisabledReturnButton(disabled);
        }
    }, [selectedStore,selectedCar]);

    const handleClose = () => {
        clean();
        onclose();
    }
    const onSelectedCar = (car: CarType | null) => setSelectedCar(car);
    const handleStoreChange = (event: SelectChangeEvent) => {
        setSelectedStore(event.target.value as string);
    };

    const clean = () => {
        setSelectedCar(car);
        setSelectedStore(store);
        setDisabledReturnButton(true);
    }

    const filterCarsInUse = ( car : any ) => bookedCars.map(bc => bc.car.code).includes(car.code);
    return (
        <React.Fragment>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Return a Car {store ? `to ${store}` : ''}
            </Typography>
            <div className="flex flex-col w-full justify-start ml-4 mt-4 p-1">
            <InputLabel id="store-select">Store</InputLabel>
            <Select
                    labelId="store-select"
                    id="store-select"
                    value={selectedStore}
                    label="Store"
                    onChange={handleStoreChange}
                    >
                    <MenuItem value={'Dubai Store'}>Dubai Store</MenuItem>
                    <MenuItem value={'Abu Dabi Store'}>Abu Dabi Store</MenuItem>
            </Select>
            </div>

            <div className="flex flex-col w-full justify-start ml-4 mt-4 p-1">
                <InputLabel id="car-select">Car</InputLabel>
                <CarAutocomplete onSelect={onSelectedCar}
                                filterItemFn={filterCarsInUse}
                                disabled={selectedCar ? true : false}
                                value={selectedCar}
                                />
            </div>
            <div className="flex flex-row w-full justify-end items-between">
                <Button disabled={disabledReturnButton}  onClick={handleClose} color="success" >Return</Button>
                <Button onClick={handleClose} color="secondary" >Close</Button>
            </div>
            </Box>
        </Modal>
        </React.Fragment>
    );
}