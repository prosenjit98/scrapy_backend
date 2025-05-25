
import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button, Stack} from '@mui/material'
import { router } from '@inertiajs/react'

interface User {
  id?: number
  fullName: string
  email: string
  password?: string
  role: 'user' | 'vendor'
}

interface Props {
  open: boolean
  onClose: () => void
  initialData?: User
  userRole?: 'user' | 'vendor' 
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

export default function UserFormModal({ open, onClose, initialData, userRole = 'user' }: Props) {
  const [form, setForm] = useState<User>({ fullName: '', email: '', password: '', role: userRole })

  const isVendor = userRole == 'vendor';

  useEffect(() => {
    if (initialData) {
      console.log(initialData)
      setForm(initialData)
    } else {
      setForm({ fullName: '', email: '', password: '', role: userRole })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (form.id) {
      router.put(`/admin/users/${form.id}`, form as any, {
        onSuccess: () => onClose()
      })
    } else {
      router.post('/admin/users', form as any, {
        onSuccess: () => onClose(),
        preserveState: false
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {form.id ? `Edit ${isVendor ? 'Vendor' : 'User'}` : `Add ${isVendor ? 'Vendor' : 'User'}` }
        </Typography>
        <Stack spacing={2}>
          <TextField
            name="fullName"
            label="Name"
            fullWidth
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            fullWidth
            value={form.password}
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
