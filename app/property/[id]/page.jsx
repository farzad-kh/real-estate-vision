import ProperyId from "@/app/components/template/PropertiId";
import prisma from "@/prisma/client";
import React, { cache } from "react";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Loading from "./loading";

const getProperty = cache(async (id, session) => {
  
  const [property, user] = await Promise.all([
    prisma.property.findUnique({
      where: { id: id.toString() },
    }),
    session
      ? prisma.user.findUnique({
          where: { id: session?.user?.id },
          select: { sentMessages: { select: { propertyId: true } } },
        })
      : null,
  ]);
  return { property, user };
});

const page = async ({ params: { id } }) => {
  if (!ObjectId.isValid(id)) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const { property, user } = await getProperty(id, session);

  if (!property) return notFound();
  let hasSentMessage =
    user?.sentMessages?.some((item) => item.propertyId === property.id) ||
    false;

  const isOwner = property.userId === session?.user?.id;

  return (
    // <ProperyId
    //   isOwner={isOwner}
    //   property={property}
    //   hasSentMessage={hasSentMessage}
    // />
    <Loading/>
  );
};

export default page;

export async function generateMetadata({ params: { id } }) {
  const { property } = await getProperty(id);

  if (!property) {
    return {
      title: "Property Not Found | Home Vision",
      description: "The property you are looking for does not exist.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${property?.name} - ${property?.location?.city}, ${property?.location?.country}, ${property.type} | Home Vision`,
    description: `Discover ${property?.name}, a ${property?.type} with ${
      property?.bedrooms || 0
    } bedrooms and ${property?.bathrooms || 0} bathrooms, located in ${
      property?.location?.city
    }, ${
      property?.location?.country
    }. Enjoy modern amenities and a comfortable stay.`,
    keywords: `${property?.name}, ${property?.type}, ${property?.location?.city}, ${property?.location?.country}, luxury stay, rental property, vacation home`,
    openGraph: {
      title: `${property?.name} - ${property?.location?.city}, ${property?.location?.country} | Home Vision`,
      description: `Discover ${property?.name}, a ${property?.type} with ${
        property?.bedrooms || 0
      } bedrooms and ${
        property?.bathrooms || 0
      } bathrooms. Book your stay now!`,
      images: property?.images?.length
        ? property.images[0]
        : "/default-image.jpg",
      type: "website",
    },
    robots: "index, follow",
  };
}
