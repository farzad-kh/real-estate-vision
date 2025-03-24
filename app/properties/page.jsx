import { getServerSession } from "next-auth";
import ProppertieContainer from "../components/template/ProppertieContainer";
import prisma from "@/prisma/client";
import { authOptions } from "../api/auth/[...nextauth]/route";
// user: { connect: { id: session?.user?.id } },
// 676dca7f80b04e41a075ae87

const Propperties = async () => {
 
const properties= await prisma.property.findMany({
  orderBy:{createdAt: 'desc'}
})
 
  return <ProppertieContainer properties={properties} />;
};

export default Propperties;
  export const dynamic = "force-dynamic";
 