import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Box, TextField, Button, Typography, Alert, Container, Paper } from '@mui/material'

interface Flash {
  success?: string
  errors?: {
    email?: string
  }
}

const SignUp = ({ flash }: { flash: Flash }) => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
  })

  interface FormState {
    full_name: string
    email: string
    password: string
  }

  interface ChangeEvent {
    target: {
      name: keyof FormState
      value: string
    }
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    Inertia.post('/sign-up', form)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>

          {flash?.success && <Alert severity="success">{flash.success}</Alert>}
          {flash?.errors?.email && <Alert severity="error">{flash.errors.email}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default SignUp