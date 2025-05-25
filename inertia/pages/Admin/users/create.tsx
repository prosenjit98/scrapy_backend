import { useForm } from '@inertiajs/react'
import { Button, TextField, Typography } from '@mui/material'
import Root from '~/shared/root'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    fullName: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    post('/admin/users')
  }

  return (
    <Root>
      <Typography variant="h4" gutterBottom>Create User</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={data.fullName}
          onChange={(e) => setData('fullName', e.target.value)}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" disabled={processing}>
          Save
        </Button>
      </form>
    </Root>
  )
}
