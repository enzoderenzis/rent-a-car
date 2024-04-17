"use client"
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import { getAllCars } from '@/app/api/cars';
import CarType, {CarStatus} from '@/app/types/CarType';

interface CarAutocompleteProps {
    value?: CarType | undefined | null,
    disabled?: boolean,
    onSelect: (car: CarType | null) => void;
    filterItemFn?: (car: any) => boolean;
}

export default function CarAutocomplete( { onSelect, value, disabled, filterItemFn } : CarAutocompleteProps ) {
    const [cars, setCars] =  useState<CarType[]>([]);
    useEffect(() => {
        (async () => {
            let _cars = await getAllCars();
            if(filterItemFn) {
                _cars = _cars.filter(filterItemFn);
            }
            setCars(_cars);
        })();

    }, []);

    return (
        <Autocomplete
            id="car-search-autocomplete"
            sx={{ width: 300 }}
            disabled={disabled}
            options={cars}
            value={value}
            autoHighlight
            getOptionLabel={(option: CarType) => `${option.label} (${option.color})`}
            renderOption={(props: any, option: CarType) => <Box key={option.code} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.label} ({option.color})
            </Box>}
            renderInput={(params: any) => <TextField
                {...params}
                label="Choose a car..."
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
            />}

            onChange={(event: any, newValue: CarType | null) => {
                onSelect(newValue);
            }}

            />
    );

}