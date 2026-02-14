import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';

// 1. Create a styled component for the image
export const StyledImage = styled(Image)({
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em',
    height: 'auto',
});

// 2. Create a styled component for the button container
export const ButtonContainer = styled(Box)({
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
});