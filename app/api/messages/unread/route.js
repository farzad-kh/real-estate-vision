import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
 


export const dynamic = "force-dynamic";
export async function GET(req) {

   
    try {
        const serverSession = await getServerSession(authOptions);

        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });

      

        const unreadMessagesCount = await prisma.message.count({
            where: {
                ownerId: serverSession?.user.id,
                readByOwner : false,
                deleted:false
            }
        });


 
        
        return NextResponse.json(unreadMessagesCount, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
 