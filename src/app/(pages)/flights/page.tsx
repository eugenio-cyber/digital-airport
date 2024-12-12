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
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flightsData);

  function formateTime(date: string): string {
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
    function testSort() {
      const sortedFlights = filteredFlights.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA.getTime() - timeB.getTime();
      });

      setFilteredFlights(sortedFlights);
    }

    testSort();
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
        <Table sx={{ minWidth: 650, border: 0 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F4F6F8' }}>
              <TableCell sx={{ color: '#004490', fontSize: '1rem', border: 0 }}>
                Hora
              </TableCell>
              <TableCell sx={{ color: '#004490', fontSize: '1rem', border: 0 }}>
                Destino
              </TableCell>
              <TableCell sx={{ color: '#004490', fontSize: '1rem', border: 0 }}>
                Voo
              </TableCell>
              <TableCell sx={{ color: '#004490', fontSize: '1rem', border: 0 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: '#004490', fontSize: '1rem', border: 0 }}>
                Portão
              </TableCell>
              <TableCell
                sx={{ color: '#004490', fontSize: '1rem', border: 0 }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights.map((row) => (
              <TableRow
                key={row.gate}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  color: '#212B36',
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: 0, borderBottom: '1px dashed #919EAB33' }}
                >
                  {formateTime(row.time)}
                </TableCell>
                <TableCell
                  sx={{ border: 0, borderBottom: '1px dashed #919EAB33' }}
                >
                  {row.destination}
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                    borderBottom: '1px dashed #919EAB33',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {row.number}
                  <Image
                    src={row.airlineLogo}
                    height={20}
                    width={60}
                    alt={row.airlineName}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                    borderBottom: '1px dashed #919EAB33',
                    color: row.status === 'Atrasado' ? '#FF3134' : '#212B36',
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell
                  sx={{ border: 0, borderBottom: '1px dashed #919EAB33' }}
                >
                  {row.gate}
                </TableCell>
                <TableCell
                  sx={{ border: 0, borderBottom: '1px dashed #919EAB33' }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#004490',
                      fontSize: '12px',
                      textTransform: 'none',
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
