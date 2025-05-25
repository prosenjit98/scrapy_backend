import {
  Typography,
} from '@mui/material'
import Root from '~/shared/root'

export default function Dashboard() {
  return (
    <>
      <Root>
        <Typography variant="h4" gutterBottom>
          Welcome, Admin
        </Typography>
        <Typography>
          This is your dashboard overview. Here you can manage users, view statistics, and perform administrative tasks.
        </Typography>
      </Root>
    </>
  )
}
