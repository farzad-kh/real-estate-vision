import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";
export async function GET(req) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });
        const userId = serverSession?.user.id;

        const select = {
          id: true,
          name: true,
          type: true,
          bathrooms: true,
          bedrooms: true,
          images: true,
          square_cm: true,
          location: true,
        };
        const bookmark = await prisma.bookmark.findMany({
          where: {
            userId,
          },
          select: {
            property: {
              select,
            },
          },
          orderBy: { createdAt: "desc" },
        });
        const modifiedBookmarks = bookmark.map((item) => ({
          ...item,
          property: { ...item.property, images: [item.property.images[0]] },
        }));
       


        return NextResponse.json(modifiedBookmarks, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    

}

