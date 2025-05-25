import { usePage } from '@inertiajs/react'
import { Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react';

type FlashProps = {
  flash?: {
    success?: string;
    error?: string;
  };
};

const Flash = () => {
  const { flash } = usePage().props as FlashProps;
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (flash?.success || flash?.error) {
      if(flash.success)
        setSuccessMessage(flash.success)
      else if(flash.error) setErrorMessage(flash.error)
      setOpen(true)
    }
  }, [flash])

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
      <Alert severity={flash?.success ? 'success' : "error"} onClose={() => setOpen(false)}>
        {errorMessage || successMessage}
      </Alert>
    </Snackbar>
  )
}

export default Flash

