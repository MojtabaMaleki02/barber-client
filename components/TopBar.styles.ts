// components/TopBar.styles.ts
import { styled } from "@mui/material/styles";
import Link from 'next/link';

export const TopBarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: `0 2px 4px ${theme.palette.grey[500]}`,
}));

export const IconText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

export const IconStyled = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.common.white,
}));

export const LinkIcon = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(2),
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export const LinkIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const HorizontalLine = styled('hr')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
