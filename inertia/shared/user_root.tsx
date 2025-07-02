import {
  Box,
  CssBaseline,
  Toolbar
} from '@mui/material'

import Flash from '~/shared/flash'
import TopBar from '~/pages/public/top_bar'


export default function UserRoot(props:any) {
  return (
    <>
      <TopBar user={props.user} />
      <Flash />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* App Bar */}

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
