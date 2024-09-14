// components/DaySlider.tsx
import React from 'react';
import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from 'dayjs';

interface DaySliderProps {
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
}

const DaySlider: React.FC<DaySliderProps> = ({ currentDay, setCurrentDay }) => {
  const today = dayjs().startOf('day');

  const handlePreviousDay = () => {
    setCurrentDay(currentDay.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setCurrentDay(currentDay.add(1, 'day'));
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <IconButton onClick={handlePreviousDay} disabled={currentDay.isSame(today, 'day')}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6">
        {currentDay.format('dddd, DD MMMM YYYY')}
      </Typography>
      <IconButton onClick={handleNextDay}>
        <ArrowForward />
      </IconButton>
    </Grid>
  );
};

export default DaySlider;
