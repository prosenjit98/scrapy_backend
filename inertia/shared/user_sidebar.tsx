import {
  AppBar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import GarageIcon from '@mui/icons-material/Garage'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import LogoutIcon from '@mui/icons-material/Logout'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import { useForm, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'

const drawerWidth = 240


export default function Sidebar() {
  const { url } = usePage();
  
  // Check if any inquiry sub-tab is selected and auto-open the collapsible
  const isInquirySubTabSelected = url === '/my_inquiries' || url === '/others_inquiries'
  const [inquiriesOpen, setInquiriesOpen] = useState(isInquirySubTabSelected)
  

  const handleInquiriesClick = () => {
    setInquiriesOpen(!inquiriesOpen)
  }

  // Auto-open collapsible when navigating to inquiry sub-tabs
  useEffect(() => {
    if (isInquirySubTabSelected && !inquiriesOpen) {
      setInquiriesOpen(true)
    }
  }, [url, isInquirySubTabSelected, inquiriesOpen])

  console.log(url)

  return (
    <>
      
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1200, // Below top bar (1300) but above content
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: 1200, // Ensure the paper also has lower z-index
            marginTop: '64px', // Account for fixed AppBar height
            height: 'calc(100vh - 64px)', // Adjust height to fit below AppBar
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton href='dashboard' selected={'/admin/dashboard' === url ? true : false}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            
            {/* Inquiries Main Tab with Sub-tabs */}
            <ListItemButton onClick={handleInquiriesClick}>
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText primary="Inquiries" />
              {inquiriesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={inquiriesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton 
                  href='/my_inquiries' 
                  selected={'/my_inquiries' === url ? true : false}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="My Inquiries" />
                </ListItemButton>
                <ListItemButton 
                  href='/others-inquiries' 
                  selected={'/others-inquiries' === url ? true : false}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon><GroupIcon /></ListItemIcon>
                  <ListItemText primary="Others Inquiries" />
                </ListItemButton>
              </List>
            </Collapse>
            
            <ListItemButton href='/orders' selected={'/admin/orders' === url ? true : false}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton href='/proposals' selected={'/admin/proposals' === url ? true : false}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Proposals" />
            </ListItemButton>          
      
          </List>
        </Box>
      </Drawer>
    </>
  )
}
