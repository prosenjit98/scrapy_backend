import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import GarageIcon from '@mui/icons-material/Garage'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import LogoutIcon from '@mui/icons-material/Logout'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import { useForm, usePage } from '@inertiajs/react'

const drawerWidth = 240


export default function Sidebar() {
  const { post } = useForm()
  const { url } = usePage();
  const handleLogout = () => {
   post('/admin/logout') // Or use Inertia form post
  }

  console.log(url)

  return (
    <>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton href='dashboard' selected={'/admin/dashboard' === url ? true : false}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton href='orders' selected={'/admin/orders' === url ? true : false}>
              <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton href='users' selected={'/admin/users' === url ? true : false}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton href='vendors' selected={'/admin/vendors' === url ? true : false}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Vendors" />
            </ListItemButton>
            <ListItemButton href='vehicles' selected={'/admin/vehicles' === url ? true : false}>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Vehicles" />
            </ListItemButton>
            <ListItemButton href='parts' selected={'/admin/parts' === url ? true : false}>
              <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
              <ListItemText primary="Parts" />
            </ListItemButton>
            <ListItemButton href='proposals' selected={'/admin/proposals' === url ? true : false}>
              <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
              <ListItemText primary="Proposals" />
            </ListItemButton>
            <ListItemButton href='inquiries' selected={'/admin/inquiries' === url ? true : false}>
              <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
              <ListItemText primary="Inquiries" />
            </ListItemButton>
            <Divider />
            <ListItemButton href='vehicle_makes' selected={'/admin/vehicle_makes' === url ? true : false}>
              <ListItemIcon><GarageIcon /></ListItemIcon>
              <ListItemText primary="Makes" />
            </ListItemButton>
            <ListItemButton href='vehicle_models' selected={'/admin/vehicle_models' === url ? true : false}>
              <ListItemIcon><SettingsRemoteIcon /></ListItemIcon>
              <ListItemText primary="Models" />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
