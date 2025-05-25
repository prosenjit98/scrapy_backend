import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box, CircularProgress
} from '@mui/material'
import axios from 'axios'

interface ServerPaginatedTableProps<T> {
  fetchUrl: string
  columns: { label: string; key: keyof T }[]
  actions?: (row: T) => React.ReactNode
}

export default function ServerPaginatedTable<T>({
  fetchUrl,
  columns,
  actions,
}: ServerPaginatedTableProps<T>) {
  const [rows, setRows] = useState<T[]>([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const res = await axios.get(fetchUrl, {
      params: { page: page + 1, limit },
    })
    setRows(res.data.data)
    setTotal(res.data.meta.total)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [page, limit])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box mt={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)}>{col.label}</TableCell>
              ))}
              {actions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {String(row[col.key])}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(row)}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}
