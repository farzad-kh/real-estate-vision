export const revalidate = 30;



import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req) {
    try {
        const recently = await prisma.property.findMany({
            take: 8,
           orderBy:{ createdAt: "desc" }
        })
        const recentlyProperty = recently.map(item => ({
            ...item,
            images: [item.images[0]]
        })) || []
        return NextResponse.json(recentlyProperty, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
