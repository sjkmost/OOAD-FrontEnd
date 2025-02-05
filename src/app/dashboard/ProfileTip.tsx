'use client'

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import logout from "./logoutHandler";
import { testCookie } from "../../cookie";

export const ProfileToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export default function ProfileTip() {
  const router = useRouter()
  return (
    <Stack>
      <List sx={{ paddingTop: 0 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText onClick={() => router.push('/dashboard/profile/edit')} primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Button component={Link} href="/" onClick={() => logout()} color="inherit" startIcon={<LogoutIcon />}>
        Log out
      </Button>
    </Stack>
  )
}