import { Typography, Paper, TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Root from '~/shared/root'
import { router } from '@inertiajs/react'

interface InquiryProps {
  inquiry: {
    id: number
    user_full_name: string
    vehicleMake: string
    vehicleModel: string
    year: number
    partDescription: string
    status: string
    createdAt: string
    updatedAt: string
  }
}

function InquiriesShow({ inquiry }: InquiryProps) {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    router.put(`/admin/inquiries/${inquiry.id}`, Object.fromEntries(formData as any))
  }

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Inquiry Details
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid size= {{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1">
              <b>User:</b> {inquiry.user_full_name}
            </Typography>
          </Grid>
          <Grid size = {{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1">
              <b>Vehicle:</b> {inquiry.year} {inquiry.vehicleMake} {inquiry.vehicleModel}
            </Typography>
          </Grid>
          <Grid size = {{ xs: 12}}>
            <Typography variant="subtitle1">
              <b>Part Description:</b> {inquiry.partDescription}
            </Typography>
          </Grid>
          <Grid size= {{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1">
              <b>Created At:</b> {inquiry.createdAt}
            </Typography>
          </Grid>
          <Grid size= {{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1">
              <b>Updated At:</b> {inquiry.updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Update Status
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid size= {{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                defaultValue={inquiry.status}
                variant="outlined"
              />
            </Grid>
            <Grid size= {{ xs: 12, sm: 6 }}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Root>
  )
}

export default InquiriesShow