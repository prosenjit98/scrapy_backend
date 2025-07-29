import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button, Stack} from '@mui/material'
import { router } from '@inertiajs/react'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'


interface Inquiry {
  id?: number
  userId?: number
  vehicleMake: number
  vehicleModel: number
  partDescription: string
  year: string
}

interface Props {
  open: boolean
  onClose: () => void
  initialData?: Inquiry
  vehicleMakes: { id: number; name: string }[]

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

export default function InquiryFormModal({ open, onClose, initialData, vehicleMakes }: Props) {

  const [form, setForm] = useState<Inquiry>({ vehicleMake: 0, vehicleModel: 0, partDescription: '', year: '' })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ vehicleMake: 0, vehicleModel: 0, partDescription: '', year: '' })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (form.id) {
      router.put(`/inquiries/${form.id}`, form as any, {
        onSuccess: () => onClose()
      })
    } else {
      router.post('/inquiries', form as any, {
        onSuccess: () => onClose(),
        preserveState: false
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {form.id ? 'Edit Inquiry' : 'Add Inquiry'}
        </Typography>
        <Stack spacing={2}>
          <InputLabel id="vehicle-make-label">Vehicle Make</InputLabel>
          <Select
            labelId="vehicle-make-label"
            label="Vehicle Make"
            name="vehicleMake"
            value={form.vehicleMake}
            onChange={e => setForm({ ...form, vehicleMake: Number(e.target.value) })}
          >
            {(vehicleMakes || []).map(make => (
              <MenuItem key={make.id} value={make.id}>
                {make.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Vehicle Model"
            name="vehicleModel"
            value={form.vehicleModel}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Part Description"
            name="partDescription"
            value={form.partDescription}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}