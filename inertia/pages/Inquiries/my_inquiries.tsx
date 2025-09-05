import Inquiry from "#models/inquiry";
import InquiryPost from "../Inquiries/inquiry"
import UserRoot from '~/shared/user_root'
import UserSidebar from '~/shared/user_sidebar'




interface MyInquiriesProps {
  inquiries: Inquiry[];
  user?: { id?: number; name?: string; email?: string; address?: string; phoneNumber?: string; role?: 'buyer' | 'vendor' ; avatar?: string | null } | null;
}

export default function MyInquiries({ inquiries, user }: MyInquiriesProps) {
  // Debug log to see the structure
  console.log('Inquiries data:', inquiries);
  console.log('First inquiry attachments:', inquiries[0]?.attachments);
  
  return (
    <UserRoot user={user}>
      <UserSidebar />
      {inquiries.map((inquiry) => (
        <InquiryPost
          key={inquiry.id}
          inquiry={{
            vehicleMake: inquiry.vehicleMake,
            vehicleModel: inquiry.vehicleModel,
            partDescription: inquiry.partDescription,
            year: inquiry.year?.toString() || '',
            attachments: inquiry.attachments?.map(att => ({
              url: att.file?.url || '',
              name: att.file?.name || 'Unknown file'
            })) || []
          }}
          user={user}
        />
      ))}
    </UserRoot>
  );
}
