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

export default function InquiryEdit({ inquiry }: Props) {
  return (
    <>
      <Head title="Edit Inquiry" />
      <div>
        <h1>Edit Inquiry #{inquiry.id}</h1>
        <p>Edit form for inquiry will go here</p>
        <pre>{JSON.stringify(inquiry, null, 2)}</pre>
      </div>
    </>
  )
}
