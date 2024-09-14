"use client";

import React, { useState } from 'react';
import { Grid, Typography, Button, TextField } from "@mui/material";
import dayjs from 'dayjs';
import DaySlider from './DaySlider'; // Ensure this path is correct
import StyledSlot from "./AppointmentCalendar.styles"; // Ensure this path is correct

const slots: string[] = [];
// Generate time slots from 08:00 to 21:00
for (let hour = 8; hour <= 21; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    );
  }
}

export default function BookAppointment() {
  const today = dayjs().startOf('day'); // Use dayjs for consistent date manipulation
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]); // Replace with actual appointment data source

  const isSlotBooked = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return appointments.some(
      (appt) =>
        dayjs(appt.appointmentDateTime).isSame(
          selectedDay.hour(hour).minute(minute),
          "minute"
        )
    );
  };

  const isSlotInPast = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const slotDateTime = selectedDay.hour(hour).minute(minute);
    return slotDateTime.isBefore(dayjs());
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime && name && phone) {
      setConfirmationMessage(`Appointment booked for ${name} at ${selectedTime} on ${selectedDay.format('YYYY-MM-DD')}.`);
      setName('');
      setPhone('');
      setSelectedDay(today);
      setSelectedTime(null);
    } else {
      setConfirmationMessage('Please fill out all fields and select a time slot.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Book an Appointment</h2>
      <DaySlider
        currentDay={selectedDay}
        setCurrentDay={setSelectedDay}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose a Time</h3>
          <Grid container spacing={2}>
            {slots.map((time) => (
              <Grid item xs={12} sm={6} lg={3} key={time}>
                <StyledSlot
                  elevation={3}
                  isBooked={isSlotBooked(time)}
                  isSelected={selectedTime === time}
                >
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => handleTimeSelect(time)}
                    disabled={isSlotBooked(time) || isSlotInPast(time)}
                  >
                    <Typography mr={1} variant="h6">
                      {time}
                    </Typography>
                    <Typography variant="body2">
                      {isSlotBooked(time) ? "Booked" : isSlotInPast(time) ? "Past Slot" : "Open Slot"}
                    </Typography>
                  </Button>
                </StyledSlot>
              </Grid>
            ))}
          </Grid>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
      {confirmationMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
}
