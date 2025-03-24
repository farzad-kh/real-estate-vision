import { createPropertiSchemaServer } from "@/zodvalidation/validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import cloudinary from "@/util/cloudinary";


export async function POST(req) {

  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const body = await req.json();


    const validation = createPropertiSchemaServer.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const { images } = validation.data;

    let uploadedImages = [];
    const chunkSize = 4;
    
    try {
      for (let i = 0; i < images.length; i += chunkSize) {
        const chunk = images.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(
          chunk.map((base64Image) =>
            cloudinary.uploader.upload(base64Image, {
              timeout: 600000  ,
              resource_type: "image",
              folder: "properties",
              transformation: [
                { width: 1340, height: 838 },
                { quality: "auto:low", fetch_format: "auto" },
              ],
            })
          )
        );
    
        
        uploadedImages.push(...chunkResults.map((result) => result.secure_url));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }


    const newData = validation.data


    newData.images = uploadedImages


    await prisma.property.create({
      data: {
        userId: serverSession.user.id,
        ...newData
      },
    })

    return NextResponse.json({ message: "Propertie created successfully!" }, { status: 201 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




// // const uploadedImages = [];
// // for (const base64Image of images) {

//  //  const result = await cloudinary.uploader.upload(base64Image, {
// //     resource_type: 'image',
//  //    folder: 'properties',          //name of folder to save images
// //     transformation: [
//  //      { width: 1340, height: 895, crop: "fit" },
//  //      { quality: "auto", fetch_format: "auto" }
//  //     ],
//   //  });
//  //   uploadedImages.push(result.secure_url);
// // }







// import { createPropertiSchema, createPropertiSchemaServer } from "@/zodvalidation/validationSchemas";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import prisma from "@/prisma/client";
// import cloudinary from "@/util/cloudinary";


// export async function POST(req) {

//   try {
//     const serverSession = await getServerSession(authOptions);
//     if (!serverSession)
//       return NextResponse.json({ error: "unauthorized" }, { status: 401 });
//     const body = await req.json();


//     const validation = createPropertiSchemaServer.safeParse(body);
//     if (!validation.success)
//       return NextResponse.json(validation.error.format(), { status: 400 });
//     const { images } = validation.data;



//     let uploadedImages;
//     try {
//       uploadedImages = await Promise.all(
//         images.map((base64Image) =>
//           cloudinary.uploader.upload(base64Image, {
//             resource_type: "image",
//             folder: "properties",
//             transformation: [
//               { width: 1340, height: 838 },
//               { quality: "auto", fetch_format: "auto" },
//             ],
//           })
//         )
//       ).then((results) => results.map((result) => result.secure_url));
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
//     }

//     const newData = validation.data


//     newData.images = uploadedImages


//     await prisma.property.create({
//       data: {
//         userId: serverSession.user.id,
//         ...newData
//       },
//     })

//     return NextResponse.json({ message: "Propertie created successfully!" }, { status: 201 });

//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }