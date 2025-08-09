import {
  Box,
  CssBaseline,
  Toolbar
} from '@mui/material'

import Flash from '~/shared/flash'
import TopBar from '~/pages/public/top_bar'

interface User {
  name?: string
  avatar?: string
}

interface UserRootProps {
  user?: User | null
  children: React.ReactNode
}

export default function UserRoot(props: UserRootProps) {
  return (
    <>
      <TopBar user={props.user || null} />
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
          {props.children}
        </Box>
      </Box>
    </>
  )
}
