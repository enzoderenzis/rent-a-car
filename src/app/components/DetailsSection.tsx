"use client";
import React, { useState, useEffect } from 'react';

import CarType, {CarStatus} from '@/app/types/CarType';
import CarAutocomplete from "@/app/components/CarAutocomplete";
import Location from '@/app/types/Location';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReturnCarModal from './ReturnCarModal';
import RentCarModal from './RentCarModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


interface DetailsProps {
    allCars: CarStatus[];
}

function positionToString(pos: Location) {
    return `[${pos.lat.toFixed(4)} - ${pos.long.toFixed(4)}]`;
}

function dateToString(date: number) : string {
    return new Date(date).toLocaleDateString("eau");
}

export default function DetailsSection({allCars} : DetailsProps) {
    const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
    const [filteredCars, setFilterCars] = useState<CarStatus[]>(allCars);

    const [openReturnModal, setOpenReturnModal] = useState<boolean>(false);
    const [openRentModal, setOpenRentModal] = useState<boolean>(false);


    useEffect(() => {
        let filtered : CarStatus[];
        if(selectedCar) {
            filtered = allCars.filter( (c : CarStatus) => c.car.code === selectedCar.code );
        } else {
            filtered = allCars;
        }
        setFilterCars(filtered);
    }, [selectedCar])


    const carSelected = (car : CarType | null) => {
        setSelectedCar(car);
    };

    const returnCar = (carStatus : CarStatus) => {
        setSelectedCar(carStatus.car);
        setOpenReturnModal(true);
    }

    const rentCar = (carStatus : CarStatus) => {
        setSelectedCar(carStatus.car);
        setOpenRentModal(true);
    }

    const onCloseReturnModal = () => {
        setSelectedCar(null);
        setOpenReturnModal(false);
    }

    const onCloseRentModal = () => {
        setSelectedCar(null);
        setOpenRentModal(false);
    }

    return (
        <div className="flex flex-col w-full z-10 p-2">
            <ReturnCarModal open={openReturnModal} onclose={onCloseReturnModal} car={selectedCar} />
            <RentCarModal open={openRentModal} onclose={onCloseRentModal} car={selectedCar}  />
            <div className="flex flex-row w-full">
                <CarAutocomplete onSelect={carSelected} />
            </div>
            <div className="flex flex-col w-full">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Car Model</StyledTableCell>
                    <StyledTableCell align="center">Available</StyledTableCell>
                    <StyledTableCell align="left">Booked by</StyledTableCell>
                    <StyledTableCell align="left">Booked Date</StyledTableCell>
                    <StyledTableCell align="left">Location</StyledTableCell>
                    <StyledTableCell align="left">Base Location</StyledTableCell>
                    <StyledTableCell align="center">-</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredCars.map((cs) => (
                    <StyledTableRow key={cs.car.code}>
                        <StyledTableCell component="th" scope="row">
                            {cs.car.label}
                        </StyledTableCell>
                        <StyledTableCell align="center">{cs.booked ? "NO" : "YES"}</StyledTableCell>
                        <StyledTableCell align="left">{cs.booked ? cs.booked.by.name : null}</StyledTableCell>
                        <StyledTableCell align="left">{cs.booked ? dateToString(cs.booked.fromDate) : null}</StyledTableCell>
                        <StyledTableCell align="left">{cs.booked ? positionToString(cs.position) : positionToString(cs.position)}</StyledTableCell>
                        <StyledTableCell align="left">{cs.booked ? positionToString(cs.position) : positionToString(cs.position)}</StyledTableCell>
                        <StyledTableCell align="center">
                            <div className="flex flex-row w-full items-center justify-center">
                                    {cs.booked ?
                                    <Button color="secondary" variant="contained" size="small" onClick={() => returnCar(cs) } >Return</Button>
                                    :
                                    <Button color="success" variant="contained" size="small" onClick={() => rentCar(cs)}>Rent</Button> }
                            </div>
                        </StyledTableCell>

                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>

        </div>
    );
}