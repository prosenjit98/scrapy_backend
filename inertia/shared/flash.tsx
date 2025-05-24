import { usePage } from '@inertiajs/react'


type FlashProps = {
  flash?: {
    success?: string;
    error?: string;
  };
};

const Flash = () => {
  const { flash } = usePage().props as FlashProps;
  return (
    <>
      {flash?.success && <div className="alert alert-success">{flash.success}</div>}
      {flash?.error && <div className="alert alert-danger">{flash.error}</div>}
    </>
  )
}

export default Flash

