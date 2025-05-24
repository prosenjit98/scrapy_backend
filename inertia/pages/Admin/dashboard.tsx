import { Head } from '@inertiajs/react'
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material'
import Flash from '~/shared/flash'
import Sidebar from '~/shared/sidebar'

const drawerWidth = 240

export default function Dashboard() {
  return (
    <>
      <Head title="Admin Dashboard" />
      <Flash />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* App Bar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`,
          }}
        >
          <Toolbar />
          <Typography variant="h4" gutterBottom>
            Welcome, Admin
          </Typography>
          <Typography>
            This is your dashboard overview. Here you can manage users, view statistics, and perform administrative tasks.
          </Typography>
        </Box>
      </Box>
    </>
  )
}
