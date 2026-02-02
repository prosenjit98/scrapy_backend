import React, { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  MenuItem,
} from '@mui/material'
import { router } from '@inertiajs/react'

interface Category {
  id?: number
  name: string
  slug: string
  parentId?: number | null
  isActive: boolean
  position: number
}

interface ParentCategory {
  id: number
  name: string
}

interface Props {
  open: boolean
  onClose: () => void
  initialData?: Category
  parents?: ParentCategory[] // pass from backend
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export default function CategoryFormModal({
  open,
  onClose,
  initialData,
  parents = [],
}: Props) {
  const [form, setForm] = useState<Category>({
    name: '',
    slug: '',
    parentId: null,
    isActive: true,
    position: 0,
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        parentId: initialData.parentId ?? null,
      })
    } else {
      setForm({
        name: '',
        slug: '',
        parentId: null,
        isActive: true,
        position: 0,
      })
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    if (form.id) {
      router.put(`/admin/categories/${form.id}`, form as any, {
        onSuccess: () => onClose(),
      })
    } else {
      router.post('/admin/categories', form as any, {
        onSuccess: () => onClose(),
        preserveState: false,
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {form.id ? 'Edit Category' : 'Add Category'}
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            name="slug"
            label="Slug"
            fullWidth
            value={form.slug}
            onChange={handleChange}
          />

          <TextField
            select
            name="parentId"
            label="Parent Category"
            fullWidth
            value={form.parentId ?? ''}
            onChange={(e) =>
              setForm({
                ...form,
                parentId: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
          >
            <MenuItem value="">None</MenuItem>
            {parents.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="position"
            label="Position"
            type="number"
            fullWidth
            value={form.position}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />
            }
            label="Active"
          />

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
