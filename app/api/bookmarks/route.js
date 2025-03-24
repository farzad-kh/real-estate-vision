import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";



// export const dynamic = "force-dynamic";
export async function POST(req) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const { id } = await req.json();


        let isBookMarked = null
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                userId: serverSession.user.id,
                propertyId: id
            },
        });


        if (!existingBookmark) {
            await prisma.bookmark.create({
                data: {
                    userId: serverSession.user.id,
                    propertyId: id
                }
            })
            isBookMarked = true
        } else {
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            })
            isBookMarked = false
        }
        revalidatePath("/dashboard/bookmarks");

        return NextResponse.json(isBookMarked, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}



export async function GET(req) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });

        const allBookmarks = await prisma.bookmark.findMany({
            where: {
                userId: serverSession.user.id
            }
        })



        // revalidatePath("/","layout"); 
        revalidatePath("/dashboard/bookmarks");
        return NextResponse.json(allBookmarks, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}




