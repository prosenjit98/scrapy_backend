import { useState } from 'react'
import { IconButton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { router } from '@inertiajs/react'
import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'

interface Order {
  id: number
  user_name: string
  user_email: string
  vendor_name: string
  part_name: string
  make_name: string
  model_name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: string
}

export default function OrdersPage() {
  const handleEdit = (order: Order) => {
    router.visit(`/admin/orders/${order.id}/edit`)
  }

  const handleDelete = (order: Order) => {
    if (confirm(`Delete order #${order.id}?`)) {
      router.delete(`/admin/orders/${order.id}`)
    }
  }

  const handleCreate = () => {
    router.visit('/admin/orders/create')
  }

  return (
    <Root>
      <Button 
        variant="contained" 
        sx={{ mb: 2 }} 
        startIcon={<AddIcon />}
        onClick={handleCreate}
      >
        Add Order
      </Button>

      <ServerPaginatedTable
        fetchUrl="/admin/orders/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Customer', key: 'user_name' },
          { label: 'Vendor', key: 'vendor_name' },
          { label: 'Part', key: 'part_name' },
          { label: 'Make', key: 'make_name' },
          { label: 'Model', key: 'model_name' },
          { label: 'Quantity', key: 'quantity' },
          { label: 'Unit Price', key: 'unitPrice' },
          { label: 'Total Price', key: 'totalPrice' },
          { label: 'Status', key: 'status' },
        ]}
        actions={(order: Order) => (
          <>
            <IconButton onClick={() => handleEdit(order)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(order)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </Root>
  )
}
