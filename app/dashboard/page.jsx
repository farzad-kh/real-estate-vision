 
import DashboardContainer from "../components/template/DashboardContainer";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
 

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  
 
 
  return <DashboardContainer user={session.user}  />;
};

export default page;
 

export const metadata = {
  title: 'Dashboard - Home Vision',
  description: 'View and manage your account information, bookings, and preferences on Home Vision.',
  robots: 'noindex, nofollow', 
};


 