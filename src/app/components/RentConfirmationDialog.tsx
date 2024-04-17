import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CarType from '../types/CarType';
import {rentCar} from '@/app/api/cars';


interface RentConfirmationDialogProps {
    open: boolean;
    car: CarType;
    onClose: (success?: boolean) => void;
}

export default function RentConfirmationDialog( {open, car, onClose} : RentConfirmationDialogProps ) {

    const handleClose = (success?: true) => onClose(success);

    const carLabel = car?.label ?? '';
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const bookedBy = formJson.bookedBy;
                    console.log({bookedBy});
                    await rentCar(car, bookedBy);
                    handleClose(true);
                },
            }}
        >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are going to rent the following car "{carLabel}"
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="bookedBy"
                    label="Booked By"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Book it!</Button>
            </DialogActions>
        </Dialog>
    );
}