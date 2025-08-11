import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import {
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useForm } from '@inertiajs/react'

interface UserDropdownProps {
  user: {
    name?: string;
    avatar?: string;
  } | null;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { post } = useForm()

  const handleLogout = () => {
    post('/logout') // Or use Inertia form post
   }

  // Get user initials for avatar
  const getUserInitials = (name?: string) => {
    if (!name) return 'U'
    const nameParts = name.split(' ')
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return name[0].toUpperCase()
  }

  const initials = getUserInitials(user?.name)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>{initials}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 250,
            borderRadius: 3,
            overflow: 'visible',
            filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <QuestionAnswerIcon fontSize="small" />
          </ListItemIcon>
          Inquiries
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Buy Leads
        </MenuItem> */}
        

        <Divider />

        <Box sx={{ px: 2, py: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default UserDropdown
