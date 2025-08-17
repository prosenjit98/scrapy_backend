import Inquiry from "#models/inquiry";
import  InquiryComp from  "./inquiry"
import UserRoot from '~/shared/user_root'
import UserSidebar from '~/shared/user_sidebar'




interface MyInquiriesProps {
  inquiries: Inquiry[];
  user?: { id?: number; name?: string; email?: string; address?: string; phoneNumber?: string; role?: 'buyer' | 'vendor' ; avatar?: string | null } | null;
}

export default function MyInquiries({ inquiries, user }: MyInquiriesProps) {
  return (
    <UserRoot user={user}>
      <UserSidebar />
      {inquiries.map((inquiry) => (
        <InquiryComp key={inquiry.id} inquiry={inquiry} />
      ))}
    </UserRoot>
  );
}
