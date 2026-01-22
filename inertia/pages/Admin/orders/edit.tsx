import { useForm } from '@inertiajs/react'
import { Button, TextField, MenuItem, Typography, Stack, Box } from '@mui/material'
import Root from '~/shared/root'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { router } from '@inertiajs/react'

interface Order {
  id: number
  userId: number
  partId: number
  quantity: number
  proposalId: number
  unitPrice: number
  totalPrice: number
  status: string
  vendorId: number
  user?: { id: number; fullName: string; email: string }
  vendor?: { id: number; fullName: string; email: string }
  part?: { id: number; name: string; make?: { name: string }; model?: { name: string } }
  proposal?: { id: number; description: string }
}

interface Props {
  order: Order
  users: Array<{ id: number; fullName: string; email: string }>
  vendors: Array<{ id: number; fullName: string; email: string }>
  parts: Array<{ id: number; name: string; make: { name: string }; model: { name: string } }>
  proposals: Array<{ id: number; description: string }>
}

export default function EditOrder({ order, users, vendors, parts, proposals }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    userId: order.userId,
    partId: order.partId,
    quantity: order.quantity,
    proposalId: order.proposalId,
    unitPrice: order.unitPrice,
    totalPrice: order.totalPrice,
    status: order.status,
    vendorId: order.vendorId,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    put(`/admin/orders/${order.id}`, {
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
        Edit Order #{order.id}
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
          onChange={(e) => setData('userId', parseInt(e.target.value))}
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
          onChange={(e) => setData('vendorId', parseInt(e.target.value))}
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
          onChange={(e) => setData('partId', parseInt(e.target.value))}
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
          onChange={(e) => setData('proposalId', parseInt(e.target.value))}
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
          onChange={(e) => setData('quantity', parseInt(e.target.value))}
          error={!!errors.quantity}
          helperText={errors.quantity}
          inputProps={{ step: '1', min: '1' }}
        />

        <TextField
          fullWidth
          label="Unit Price"
          type="number"
          value={data.unitPrice}
          onChange={(e) => setData('unitPrice', parseFloat(e.target.value))}
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
          onChange={(e) => setData('totalPrice', parseFloat(e.target.value))}
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
            Update
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
