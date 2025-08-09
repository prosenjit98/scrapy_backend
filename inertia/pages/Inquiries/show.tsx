import { Head } from '@inertiajs/react'

interface Props {
  inquiry: {
    id: number
    vehicleMake: string
    vehicleModel: string
    partDescription: string
    year: number
    status: string
    user: {
      fullName: string
      email: string
    }
  }
}

export default function InquiryShow({ inquiry }: Props) {
  return (
    <>
      <Head title={`Inquiry #${inquiry.id}`} />
      <div>
        <h1>Inquiry #{inquiry.id}</h1>
        <p><strong>User:</strong> {inquiry.user.fullName} ({inquiry.user.email})</p>
        <p><strong>Vehicle Make:</strong> {inquiry.vehicleMake}</p>
        <p><strong>Vehicle Model:</strong> {inquiry.vehicleModel}</p>
        <p><strong>Year:</strong> {inquiry.year}</p>
        <p><strong>Part Description:</strong> {inquiry.partDescription}</p>
        <p><strong>Status:</strong> {inquiry.status}</p>
      </div>
    </>
  )
}
