import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserProperty from "@/app/components/template/UserProperty";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { cache } from "react";



const getUserProperty =cache (async (session, searchParams,pageSize) => {
  const pageParams = Number(searchParams.page) || 1;
 

  if (!session) return null;
  const userId = session?.user?.id;

  const [userProperty, userPropertyTotal] = await Promise.all([
    await prisma.property.findMany({
      skip: (pageParams - 1) * pageSize,
      take: pageSize,
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        images: true,
        location: true,
        bedrooms: true,
        bathrooms: true,
        square_cm: true,
        sleeps: true,
        description: true,
      },
      orderBy: { updatedAt: "desc" },
    }),
    await prisma.property.count({
      where: {
        userId: userId,
      },
    }),
  ]);

  return {userProperty, userPropertyTotal}
})
const page = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const pageSize = 12;
  const {userProperty, userPropertyTotal} = await getUserProperty(session, searchParams,pageSize);

  return <UserProperty userProperty={userProperty} userPropertyTotal={userPropertyTotal} pageSize={pageSize}/>;
};

export default page;
export const metadata = {
  title: 'My Properties - Manage Your Listings | Home Vision',
  description: 'View, edit, and manage your property listings on Home Vision. Keep track of your posted properties and make updates easily.',
  robots: 'noindex, nofollow',
};
