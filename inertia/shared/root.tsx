import { Head } from '@inertiajs/react'
import {
  Box,
  CssBaseline,
  Toolbar
} from '@mui/material'

import Flash from '~/shared/flash'
import Sidebar from '~/shared/sidebar'

export default function Root(props:any) {
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
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </>
  )
}
