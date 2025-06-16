
import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { router } from '@inertiajs/react'
import axios from 'axios'
import VehicleMake from '#models/vehicle_make'

interface VehicleModel {
  id?: number
  name: string,
  vehicle_make_id?: number,
}

interface Props {
  open: boolean
  onClose: () => void
  initialData?: VehicleModel
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
  const [form, setForm] = useState<VehicleModel>({ name: '', vehicle_make_id: undefined })
  const [_, setMakeFetching] = useState(false);
  const [vMake, setVMake] = useState<VehicleMake[]>()

  useEffect(() => {
    setMakeFetching(true)
    console.log("00000000000")
    axios.get('/admin/vehicle_makes/list', {params: { limit: 10000 }},).then((res) => {
      console.log(res.data)
      setVMake(res.data.data)
      setMakeFetching(false)
    }).catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ name: '', vehicle_make_id: undefined })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name as string]: value });
  }

  const handleSubmit = () => {
    if (form.id) {
      router.put(`/admin/vehicle_models/${form.id}`, form as any, {
        onSuccess: () => onClose()
      })
    } else {
      router.post('/admin/vehicle_models', form as any, {
        onSuccess: () => onClose(),
        preserveState: false
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {form.id ? `Edit Vehicle Model` : `Add Vehicle Model`}
        </Typography>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="vehicle-make-label">Vehicle Make</InputLabel>
            <Select
              labelId="vehicle-make-label"
              name='vehicle_make_id'
              id="vehicle_make"
              value={form.vehicle_make_id}
              label="Vehicle Make"
              onChange={handleSelectChange}
            >
              {vMake && vMake.map((element: VehicleMake) => {
                return <MenuItem value={element.id}>{element.name}</MenuItem>
              })
              }
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
