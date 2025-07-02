import { useState } from 'react'
import { IconButton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'
import VehicleMakeFormModal from './vehicle_make_form_modal'

interface VehicleMake {
  id?: number
  name: string
}

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<VehicleMake | undefined>(undefined)

  const handleEdit = (make: VehicleMake) => {
    setEditUser(make)
    setModalOpen(true)
  }

  return (
    <Root>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setModalOpen(true)}>
        Add Vehicle Make
      </Button>

      <ServerPaginatedTable
        fetchUrl="/admin/vehicle_makes/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
        ]}
        actions={(make: VehicleMake) => (
          <>
            <IconButton onClick={() => handleEdit(make)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      />

      <VehicleMakeFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditUser(undefined)
        }}
        initialData={editUser}
      />
    </Root>
  )
}


