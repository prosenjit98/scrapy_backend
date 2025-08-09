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
  Paper,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ShoppingCart as ShoppingCartIcon,
  CardMembership as CardMembershipIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useForm } from '@inertiajs/react'


const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { post } = useForm()

  const handleLogout = () => {
    post('/logout') // Or use Inertia form post
   }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Hi! Avijit kuila
      </Typography>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>AV</Avatar>
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
        <Typography variant="subtitle1" sx={{ px: 2, pt: 1 }}>
          Welcome!
        </Typography>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => setModalOpen(true)}>
          <ListItemIcon>
            <QuestionAnswerIcon fontSize="small" />
          </ListItemIcon>
          Inquiries
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Buy Leads
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CardMembershipIcon fontSize="small" />
          </ListItemIcon>
          My Membership
        </MenuItem>

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
