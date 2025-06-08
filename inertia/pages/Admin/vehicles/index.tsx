// import { useState } from 'react'
// import { IconButton, Button } from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
// import { router } from '@inertiajs/react'
import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'
// import UserFormModal from './user_form_modal'

// interface User {
//   id: number
//   fullName: string
//   email: string,
//   role: 'user' | 'vendor'
// }

export default function UsersPage() {
  // const [modalOpen, setModalOpen] = useState(false)
  // const [editUser, setEditUser] = useState<User | undefined>(undefined)

  // const handleEdit = (user: User) => {
  //   setEditUser(user)
  //   setModalOpen(true)
  // }

  // const handleDelete = (user: User) => {
  //   if (confirm(`Delete ${user.fullName}?`)) {
  //     router.delete(`/admin/users/${user.id}`)
  //   }
  // }

  return (
    <Root>
      {/* <Button variant="contained" sx={{ mb: 2 }} onClick={() => setModalOpen(true)}>
        Add User
      </Button> */}

      <ServerPaginatedTable
        fetchUrl="/admin/vehicles/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Make', key: 'make' },
          { label: 'Model', key: 'model' },
          { label: 'Year', key: 'year' },
          { label: 'Vendor', key: 'vendor_full_name' },
        ]}
        // actions={(user: User) => (
        //   <>
        //     <IconButton onClick={() => handleEdit(user)}>
        //       <EditIcon />
        //     </IconButton>
        //     <IconButton color="error" onClick={() => handleDelete(user)}>
        //       <DeleteIcon />
        //     </IconButton>
        //   </>
        // )}
      />

      {/* <UserFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditUser(undefined)
        }}
        initialData={editUser}
        userRole='user'
      /> */}
    </Root>
  )
}


