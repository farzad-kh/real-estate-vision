import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";






export async function PATCH(req) {


    try {
        const serverSession = await getServerSession(authOptions);

        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });

        const { id } = await req.json()

        const messageReadStatus = await prisma.message.update({
            where: { id },
            data: {
                readByOwner: true,
                readBySender: true,
                readAt: new Date(),
                notified: true
            }
        })


        return NextResponse.json(messageReadStatus, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
