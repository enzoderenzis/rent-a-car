import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAllBookedCars } from '../api/cars';
import CarType, { CarStatus } from '../types/CarType';
import RentConfirmationDialog from './RentConfirmationDialog';


interface RentCarModalProps {
    open: boolean;
    store?: string | null;
    car: CarType | null;
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



export default function RentCarModal({open, store, car, onclose}  : RentCarModalProps) {
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

    const handleClose = () => onclose();
    const handleRent = () => setConfirmationOpen(true);
    const handleRentClose = (success?: boolean) => {
        setConfirmationOpen(false);
        if(success) {
            handleClose();
        }
    }
    // const onSelectedCar = (car: CarType | null) => setSelectedCar(car);
    const carLabel = car?.label ?? "";

    return (
        <React.Fragment>
            <RentConfirmationDialog open={confirmationOpen} car={car} onClose={handleRentClose}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Rent this Car
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {carLabel}
                </Typography>

                <div className="flex flex-row w-full justify-end items-between">
                    <Button onClick={handleRent} color="success" >Rent</Button>
                    <Button onClick={handleClose} color="secondary" >Close</Button>
                </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}