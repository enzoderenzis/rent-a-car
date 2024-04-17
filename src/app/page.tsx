import Image from "next/image";
import React from 'react';
import dynamic from 'next/dynamic';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import DetailsSection from "@/app/components/DetailsSection";
import { getAllCarsStatus } from "@/app/api/cars";
import { getAllStores } from "@/app/api/stores";

const DynamicMap = dynamic(() => import('@/app/components/CarMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})



export default async function Home() {

  const allCars = await getAllCarsStatus();
  const stores = await getAllStores();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CssBaseline />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Rent a Car
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer" >
            By{" "} Enzo
          </a>
        </div>
      </div>

      <div className="relative w-full mt-3 flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">

        <Container maxWidth="xl">
          <div className="flex flex-row w-full border z-1">
            <div className="flex flex-row w-1/2 border">
                <DynamicMap availableCars={allCars} stores={stores} />
            </div>
            <div className="flex flex-row w-1/2 border">
                <DetailsSection allCars={allCars} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
