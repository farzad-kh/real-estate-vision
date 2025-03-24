import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PropertiForm from "@/app/components/module/PropertiForm";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
 

const Edit = async ({ params: { id } }) => {
  const serverSession = await getServerSession(authOptions);
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });
  if (serverSession?.user.id !== property.userId) return null;

  return <PropertiForm property={property} />;
};

export default Edit;
