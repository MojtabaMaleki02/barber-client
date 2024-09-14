import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface StyledSlotProps {
  isBooked: boolean;
  isSelected: boolean;
}

const StyledSlot = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isBooked' && prop !== 'isSelected' })<StyledSlotProps>(({ isBooked, isSelected }) => ({
  backgroundColor: isBooked ? 'lightgray' : isSelected ? 'lightblue' : 'white',
  cursor: 'pointer',
  border: isSelected ? '2px solid blue' : '1px solid gray',
  opacity: isBooked ? 0.5 : 1,
}));

export default StyledSlot;
