import { useState } from 'react'
import { IconButton, Button, Chip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'
import CategoryFormModal from './category_form_modal'

interface Category {
  id?: number
  name: string
  slug: string
  parent?: {
    id: number
    name: string
  }
  isActive: boolean
  position: number
}

interface CategoriesPageProps {
  parents: Category[]
}

export default function CategoriesPage({ parents }: CategoriesPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | undefined>(undefined)

  const handleEdit = (category: Category) => {
    setEditCategory(category)
    setModalOpen(true)
  }

  return (
    <Root>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setModalOpen(true)}
      >
        Add Category
      </Button>

      <ServerPaginatedTable
        fetchUrl="/admin/categories/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Slug', key: 'slug' },
          {
            label: 'Parent',
            key: 'parent',
            render: (row: Category) =>
              row.parent ? row.parent.name : '—',
          },
          {
            label: 'Status',
            render: (row: Category) =>
              row.isActive ? (
                <Chip label="Active" color="success" size="small" />
              ) : (
                <Chip label="Inactive" color="default" size="small" />
              ),
          },
          { label: 'Position', key: 'position' },
        ]}
        actions={(category: Category) => (
          <IconButton onClick={() => handleEdit(category)}>
            <EditIcon />
          </IconButton>
        )}
      />
      <CategoryFormModal
        open={modalOpen}
        initialData={editCategory}
        parents={parents}
        onClose={() => {
          setModalOpen(false)
          setEditCategory(undefined)
        }}
      />

    </Root>
  )
}
