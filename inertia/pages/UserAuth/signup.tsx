import React from 'react'
import { Box, TextField, Button, Typography, Alert, Container, Paper } from '@mui/material'
import { useForm } from '@inertiajs/react'

interface Flash {
  success?: string
  errors?: {
    email?: string
  }
}

// interface FormState {
//   full_name: string
//   email: string
//   password: string
// }

const SignUp = ({ flash }: { flash: Flash }) => {
  const { data: form, setData, post, processing } = useForm({
    full_name: '',
    email: '',
    password: '',
  })



  const handleChange = (e: any) => {
    const { name, value } = e.target
    setData({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/sign-up')
  }

  console.log("Flash:", flash)

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
              disabled={processing}
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