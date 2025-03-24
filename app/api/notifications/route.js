import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";






export async function GET(req) {



    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const id = serverSession.user.id

        const notifications = await prisma.message.findMany({
            where: { senderId: id },
            select: { notified: true }

        })




        return NextResponse.json(notifications, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}

export async function PATCH(req) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const id = serverSession.user.id

        const notifications = await prisma.message.updateMany({
            where: { senderId: id },
            data: {
                notified: false
            }

        })

        return NextResponse.json({ message: "success" }, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
