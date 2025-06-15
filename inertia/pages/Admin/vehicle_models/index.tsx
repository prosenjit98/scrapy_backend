import { useState } from 'react'
import { IconButton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'
import VehicleMakeFormModal from './vehicle_model_form_modal'

interface VehicleModel {
  id?: number
  name: string
}

export default function VehicleModelsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<VehicleModel | undefined>(undefined)

  const handleEdit = (make: VehicleModel) => {
    setEditUser(make)
    setModalOpen(true)
  }

  return (
    <Root>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setModalOpen(true)}>
        Add Vehicle Model
      </Button>

      <ServerPaginatedTable
        fetchUrl="/admin/vehicle_models/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
        ]}
        actions={(make: VehicleModel) => (
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


