export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
 
import { authOptions } from "../../auth/[...nextauth]/route";




export async function GET(req) {


    try {
        const serverSession = await getServerSession(authOptions);

        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const propertyId = searchParams.get("propertyId");


        const messageStatus = await prisma.message.findFirst({
            where: { senderId: serverSession.user.id, propertyId },
            select: {  readBySender: true, readAt: true, }
        })

        if (!messageStatus) {
            return NextResponse.json({ message: "No message found" }, { status: 404 });
          }

        return NextResponse.json(messageStatus, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
 