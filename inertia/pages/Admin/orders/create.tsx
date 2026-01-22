import { useForm } from '@inertiajs/react'
import { Button, TextField, MenuItem, Typography, Stack, Box } from '@mui/material'
import Root from '~/shared/root'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { router } from '@inertiajs/react'

interface Props {
  users: Array<{ id: number; fullName: string; email: string }>
  vendors: Array<{ id: number; fullName: string; email: string }>
  parts: Array<{ id: number; name: string; make: { name: string }; model: { name: string } }>
  proposals: Array<{ id: number; description: string }>
}

export default function CreateOrder({ users, vendors, parts, proposals }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    userId: '',
    partId: '',
    quantity: '',
    proposalId: '',
    unitPrice: '',
    totalPrice: '',
    status: 'pending',
    vendorId: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    post('/admin/orders', {
      onSuccess: () => {
        router.visit('/admin/orders')
      }
    })
  }

  const handleCancel = () => {
    router.visit('/admin/orders')
  }

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
          maxWidth: 1000,
        }}
      >
        <TextField
          select
          fullWidth
          label="Customer"
          value={data.userId}
          onChange={(e) => setData('userId', e.target.value)}
          error={!!errors.userId}
          helperText={errors.userId}
          required
        >
          <MenuItem value="">-- Select Customer --</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName} ({user.email})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Vendor"
          value={data.vendorId}
          onChange={(e) => setData('vendorId', e.target.value)}
          error={!!errors.vendorId}
          helperText={errors.vendorId}
          required
        >
          <MenuItem value="">-- Select Vendor --</MenuItem>
          {vendors.map((vendor) => (
            <MenuItem key={vendor.id} value={vendor.id}>
              {vendor.fullName} ({vendor.email})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Part"
          value={data.partId}
          onChange={(e) => setData('partId', e.target.value)}
          error={!!errors.partId}
          helperText={errors.partId}
        >
          <MenuItem value="">-- Select Part --</MenuItem>
          {parts.map((part) => (
            <MenuItem key={part.id} value={part.id}>
              {part.name} ({part.make?.name} {part.model?.name})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Proposal"
          value={data.proposalId}
          onChange={(e) => setData('proposalId', e.target.value)}
          error={!!errors.proposalId}
          helperText={errors.proposalId}
        >
          <MenuItem value="">-- Select Proposal --</MenuItem>
          {proposals.map((proposal) => (
            <MenuItem key={proposal.id} value={proposal.id}>
              {proposal.description}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Quantity"
          type="number"
          value={data.quantity}
          onChange={(e) => setData('quantity', e.target.value)}
          error={!!errors.quantity}
          helperText={errors.quantity}
          inputProps={{ step: '1', min: '1' }}
        />

        <TextField
          fullWidth
          label="Unit Price"
          type="number"
          value={data.unitPrice}
          onChange={(e) => setData('unitPrice', e.target.value)}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
          inputProps={{ step: '0.01', min: '0' }}
          required
        />

        <TextField
          fullWidth
          label="Total Price"
          type="number"
          value={data.totalPrice}
          onChange={(e) => setData('totalPrice', e.target.value)}
          error={!!errors.totalPrice}
          helperText={errors.totalPrice}
          inputProps={{ step: '0.01', min: '0' }}
          required
        />

        <TextField
          select
          fullWidth
          label="Status"
          value={data.status}
          onChange={(e) => setData('status', e.target.value)}
          error={!!errors.status}
          helperText={errors.status}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>

        <Stack direction="row" spacing={2} sx={{ gridColumn: { xs: '1 / -1' }, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={processing}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            disabled={processing}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Root>
  )
}
