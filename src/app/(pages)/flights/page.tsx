'use client';

import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from '@/components/SearchBar';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import flightsData from '../../../../flights.json';

interface Flight {
  _id: string;
  time: string;
  destination: string;
  number: string;
  airlineName: string;
  airlineLogo: string;
  status: string;
  gate: string;
  mapLink: string;
}

export default function FlightsPage() {
  const [filterText, setFilterText] = useState<string>('');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>();
  const tableHeadStyle = {
    color: '#004490',
    fontSize: {
      xs: '.75rem',
      sm: '1rem',
    },
    border: 0,
    p: {
      xs: '.75rem',
      sm: '1rem',
    },
  };
  const tableBodyStyle = {
    border: 0,
    p: {
      xs: '.75rem',
      sm: '1rem',
    },
    fontSize: {
      xs: '.75rem',
      sm: '1rem',
    },
  };

  function formatTime(date: string): string {
    const localDate = new Date(date);
    const hour = localDate.getHours();
    const minute = localDate.getMinutes();

    return `${hour}:${minute}`;
  }

  useEffect(() => {
    const flights = flightsData.filter((flight) =>
      flight.number.includes(filterText)
    );

    setFilteredFlights(flights);
  }, [filterText]);

  useEffect(() => {
    function sortFlights() {
      const sortedFlights = flightsData.sort((a, b) => {
        const firstTime = new Date(a.time);
        const secondTime = new Date(b.time);

        return firstTime.getTime() - secondTime.getTime();
      });

      setFilteredFlights(sortedFlights);
    }

    sortFlights();
  }, []);

  return (
    <Box sx={{ pt: '1.75rem' }}>
      <SearchBar
        placeholder="Buscar voo pelo número. Ex:. 2349"
        value={filterText}
        changeValue={setFilterText}
      />
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          boxShadow: '0px 51.72px 103.45px -17.24px #919EAB1F',
        }}
      >
        <Table
          sx={{ border: 0, borderCollapse: 'collapse' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F4F6F8' }}>
              <TableCell sx={tableHeadStyle}>Hora</TableCell>
              <TableCell sx={tableHeadStyle}>Destino</TableCell>
              <TableCell sx={tableHeadStyle}>Voo</TableCell>
              <TableCell sx={tableHeadStyle}>Status</TableCell>
              <TableCell sx={tableHeadStyle}>Portão</TableCell>
              <TableCell sx={tableHeadStyle} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights &&
              filteredFlights.map((flight) => (
                <TableRow
                  key={flight.gate}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    color: '#212B36',
                    borderBottom: '1px dashed #919EAB33',
                  }}
                >
                  <TableCell component="th" scope="flight" sx={tableBodyStyle}>
                    {formatTime(flight.time)}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {flight.destination}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      ...tableBodyStyle,
                    }}
                  >
                    {flight.number}
                    <Box
                      sx={{
                        position: 'relative',
                        height: {
                          xs: '16px',
                          sm: '20px',
                        },
                        width: {
                          xs: '50px',
                          sm: '60px',
                        },
                      }}
                    >
                      <Image
                        src={flight.airlineLogo}
                        alt={flight.airlineName}
                        fill
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        flight.status === 'Atrasado' ? '#FF3134' : '#212B36',
                      ...tableBodyStyle,
                    }}
                  >
                    {flight.status}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{flight.gate}</TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#004490',
                        fontSize: {
                          xs: '.5rem',
                          sm: '.75rem',
                        },
                        textTransform: 'none',
                        px: '.5rem',
                      }}
                    >
                      Ver no mapa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
