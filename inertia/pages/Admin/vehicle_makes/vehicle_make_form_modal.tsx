
import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button, Stack} from '@mui/material'
import { router } from '@inertiajs/react'

interface VehicleMake {
  id?: number
  name: string
}

interface Props {
  open: boolean
  onClose: () => void
  initialData?: VehicleMake
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export default function VehicleMakeFormModal({ open, onClose, initialData }: Props) {
  const [form, setForm] = useState<VehicleMake>({ name: ''})


  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ name: '' })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (form.id) {
      router.put(`/admin/vehicle_makes/${form.id}`, form as any, {
        onSuccess: () => onClose()
      })
    } else {
      router.post('/admin/vehicle_makes', form as any, {
        onSuccess: () => onClose(),
        preserveState: false
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {form.id ? `Edit Vehicle Make` : `Add Vehicle Make` }
        </Typography>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
