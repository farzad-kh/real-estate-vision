
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import prisma from "@/prisma/client";
// import cloudinary from "@/util/cloudinary";
// import { createPropertiSchema, createPropertiSchemaServer } from "@/zodvalidation/validationSchemas";
// import { extractCloudinaryId, getBase64Strings } from "@/app/utils/helpers";


// export async function DELETE(req, { params: { id } }) {


//     try {
//         const serverSession = await getServerSession(authOptions);
//         if (!serverSession)
//             return NextResponse.json({ error: "unauthorized" }, { status: 403 });


//         const userProperty = await prisma.property.findUnique({
//             where: {
//                 id
//             },
//         })

//         if (userProperty.userId !== serverSession.user.id)
//             return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });

//         if (!userProperty) return NextResponse.json({ error: "Your access is restricted." }, { status: 401 });
//         const publicId = userProperty.images.map(extractCloudinaryId)

//         await prisma.property.delete({
//             where: {
//                 id: userProperty.id
//             },
//         })

//         setImmediate(() => {
//             Promise.all(
//                 publicId.map(id => cloudinary.uploader.destroy(`properties/${id}`))
//             ).catch(error => {
//                 console.error("Image deletion failed:", error);
//             });
//         }, 0);

//         return NextResponse.json({ message: "Property deleted successfully!" }, { status: 203 });

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }




// export async function PATCH(req, { params: { id } }) {


//     try {
//         const serverSession = await getServerSession(authOptions);
//         if (!serverSession)
//             return NextResponse.json({ error: "unauthorized" }, { status: 403 });


//         const userProperty = await prisma.property.findUnique({
//             where: {
//                 id
//             },
//         })
//         const existingImage = userProperty.images



//         if (!userProperty) return NextResponse.json({ error: "Your access is restricted." }, { status: 403 });

//         const body = await req.json();
//         // console.log(body);


//         const validation = createPropertiSchemaServer.safeParse(body);
//         if (!validation.success)
//             return NextResponse.json(validation.error.format(), { status: 400 });
//         const { images } = validation.data;




//         const cloudinaryLinks = images.filter(item =>
//             typeof item === "string" && item.startsWith("https://res.cloudinary.com")
//         );
//         const deletedImages = existingImage.filter(img => !cloudinaryLinks.includes(img))
//         const cloudinaryId = deletedImages.map(extractCloudinaryId)


//         try {
//             await Promise.all(
//                 cloudinaryId.map(id =>
//                     cloudinary.uploader.destroy(`properties/${id}`))
//             ).then((res) => console.log(res))

//         } catch (error) {
//             console.error("Image deletion failed:", error);

//         }


//         const updateData = validation.data
//         const base64Strings = getBase64Strings(images)



//         let uploadedImages = [];

//         if (base64Strings.length > 0) {
//             try {
//                 uploadedImages = await Promise.all(
//                     base64Strings.map((base64Image) =>
//                         cloudinary.uploader.upload(base64Image, {
//                             resource_type: "image",
//                             folder: "properties",
//                             transformation: [
//                                 { width: 1340, height: 838 },
//                                 { quality: "auto", fetch_format: "auto" },
//                             ],
//                         })
//                     )
//                 ).then((results) => results.map((result) => result.secure_url));
//             } catch (error) {
//                 console.error("Image upload failed:", error);
//                 return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
//             }



//         }
//         if (cloudinaryLinks.length > 0) {
//             uploadedImages.unshift(...cloudinaryLinks)
//         }

//         updateData.images = uploadedImages


//         await prisma.property.update({
//             where: {
//                 id
//             },
//             data: {
//                 ...updateData

//             }
//         })



//         return NextResponse.json({ message: "Update successfully!" }, { status: 201 });

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }



import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import cloudinary from "@/util/cloudinary";
import { createPropertiSchemaServer } from "@/zodvalidation/validationSchemas";
import { extractCloudinaryId, getBase64Strings } from "@/app/utils/helpers";


export async function DELETE(req, { params: { id } }) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });


        const userProperty = await prisma.property.findUnique({
            where: {
                id
            },
        })

        if (userProperty.userId !== serverSession.user.id)
            return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });

        if (!userProperty) return NextResponse.json({ error: "Your access is restricted." }, { status: 401 });
        const publicId = userProperty.images.map(extractCloudinaryId)

        await prisma.property.delete({
            where: {
                id: userProperty.id
            },
        })

        setImmediate(() => {
            Promise.all(
                publicId.map(id => cloudinary.uploader.destroy(`properties/${id}`))
            ).catch(error => {
                console.error("Image deletion failed:", error);
            });
        }, 0);

        return NextResponse.json({ message: "Property deleted successfully!" }, { status: 203 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}




export async function PATCH(req, { params: { id } }) {


    try {
        const serverSession = await getServerSession(authOptions);
        if (!serverSession)
            return NextResponse.json({ error: "unauthorized" }, { status: 403 });


        const userProperty = await prisma.property.findUnique({
            where: {
                id
            },
        })
        const existingImage = userProperty.images



        if (!userProperty) return NextResponse.json({ error: "Your access is restricted." }, { status: 403 });

        const body = await req.json();
        // console.log(body);


        const validation = createPropertiSchemaServer.safeParse(body);
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 });
        const { images } = validation.data;




        const cloudinaryLinks = images.filter(item =>
            typeof item === "string" && item.startsWith("https://res.cloudinary.com")
        );
        const deletedImages = existingImage.filter(img => !cloudinaryLinks.includes(img))
        const cloudinaryId = deletedImages.map(extractCloudinaryId)


        try {
            await Promise.all(
                cloudinaryId.map(id =>
                    cloudinary.uploader.destroy(`properties/${id}`))
            ).then((res) => console.log(res))

        } catch (error) {
            console.error("Image deletion failed:", error);

        }


        const updateData = validation.data
        const base64Strings = getBase64Strings(images)


        let uploadedImages = [];





        if (base64Strings.length > 0) {
            try {
                uploadedImages = await Promise.all(
                    base64Strings.map((base64Image) =>
                        cloudinary.uploader.upload(base64Image, {
                            resource_type: "image",
                            folder: "properties",
                            transformation: [
                                { width: 1340, height: 838 },
                                { quality: "auto", fetch_format: "auto" },
                            ],
                        })
                    )
                ).then((results) => results.map((result) => result.secure_url));
            } catch (error) {
                console.error("Image upload failed:", error);
                return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
            }



        }
        if (cloudinaryLinks.length > 0) {
            uploadedImages.unshift(...cloudinaryLinks)
        }

        updateData.images = uploadedImages


        await prisma.property.update({
            where: {
                id
            },
            data: {
                ...updateData

            }
        })



        return NextResponse.json({ message: "Update successfully!" }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


