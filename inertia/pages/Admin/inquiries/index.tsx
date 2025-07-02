import Root from '~/shared/root'
import ServerPaginatedTable from '~/shared/server_paginated_table'

function InquiriesIndex() {
  return (
    <Root>
      <ServerPaginatedTable
        fetchUrl="/admin/inquiries/list"
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'User Name', key: 'user_full_name' },
          { label: 'Vehicle Make', key: 'vehicleMake' },
          { label: 'Vehicle Model', key: 'vehicleModel' },
          { label: 'Year', key: 'year' },
          { label: 'Status', key: 'status' },
        ]}
        // rowLink={(inquiry: { id: number }) => `/admin/inquiries/${inquiry.id}`}
      />
    </Root>
  )
}

export default InquiriesIndex
