import { Head } from '@inertiajs/react'
import { Container, Paper, Typography } from '@mui/material'
import InquiryForm from '~/pages/Inquiries/form'
import UserRoot from '~/shared/user_root'
interface Props {
  vehicleMakes: { id: number; name: string }[]
  vehicleModels: { id: number; name: string }[]
  user: { id?: number; name?: string; email?: string; address?: string; phoneNumber?: string; role?: 'buyer' | 'vendor' | null; avatar?: string | null };
}

export default function InquiryNew({ vehicleMakes, vehicleModels, user }: Props) {
  return (
    <>
      <UserRoot user={user ? { ...user, role: user.role === null ? undefined : user.role } : user}>
        <Head title="New Inquiry" />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
              Create New Inquiry
            </Typography>
            
            <InquiryForm 
              vehicleMakes={vehicleMakes}
              vehicleModels={vehicleModels}
              submitButtonText="Create Inquiry"
              showCancelButton={true}
            />
          </Paper>
        </Container>
      </UserRoot>
    </>
  )
}
