
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import cloudinary from "@/util/cloudinary";
import { createPropertiSchema } from "@/zodvalidation/validationSchemas";
import { getBase64Strings } from "@/app/utils/helpers";

export async function DELETE(req, { params: { id } }) {

    const imageId = id
   
    
    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });


        setImmediate(() => {
            cloudinary.uploader.destroy(`properties/${imageId}`)
                .then((res) => console.log(res)
                 )
                .catch((error) => {
                    console.error("Image deletion failed:", error);
                });
        });


        return NextResponse.json({ message: "Image deleted successfully!" }, { status: 203 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

