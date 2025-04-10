
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";
export async function POST(req) {


    try {
        const serverSession = await getServerSession(authOptions);

        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const { requestData } = await req.json()
        const senderId = serverSession.user.id



        const propertyOwner = await prisma.property.findUnique({
            where: { id: requestData.propertyId },
            select: { userId: true }
        })
        console.log(propertyOwner);

        if (!propertyOwner) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }
        if (propertyOwner.userId === senderId) {
            return NextResponse.json({ error: "You cannot send a message to yourself" }, { status: 400 });
        }

        const data = { senderId: senderId, ownerId: propertyOwner.userId, ...requestData }

        const message = await prisma.message.create({
            data
        })
        const unreadCount = await prisma.message.count({
            where: {
                ownerId: propertyOwner.userId,
                readByOwner: false,
                deleted: false,
            },
        });
        const socketId = global.users?.get(propertyOwner.userId);
        if (global.io && socketId) {
            global.io.to(socketId).emit("new_message", {
                message,
                unreadCount,
            });
        }
        return NextResponse.json({ message: "message" }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const pageParams = searchParams.get("page") ? Number(searchParams.get("page")) : 1
    const statusParams = searchParams.get("status") ? searchParams.get("status") : undefined

    const readByOwner = statusParams ? statusParams === "read" ? true : false : undefined




    const pageSize = 3
    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });

        const ownerId = serverSession.user.id



        const [messageData, messageTotal] = await Promise.all([
            await prisma.message.findMany({
                where: { ownerId, deleted: false, readByOwner },
                skip: (pageParams - 1) * pageSize,
                take: pageSize,
                include: {
                    property: {
                        select: {
                            images: true, name: true

                        }
                    },
                },
                orderBy: { createdAt: 'desc' }
            }),
            await prisma.message.count({
                where: { ownerId, deleted: false, readByOwner },

            })
        ])
        return NextResponse.json({ messageData, messageTotal }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}

export async function DELETE(req) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });

        const { id } = await req.json()

        await prisma.message.update({
            where: { id },
            data: {
                deleted: true,
                readByOwner: true
            },
        });

        return NextResponse.json({ message: "Message deleted" }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
