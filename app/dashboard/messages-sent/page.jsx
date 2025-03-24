import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingMessageContainer from "@/app/components/template/BookingMessageContainer";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import React, { cache } from "react";
// if after  building have any bug remove cache fnc
const getBookingMessage = cache(
  async (session, statusParams, pageSize, pageParams) => {
    const id = session?.user?.id;
    const status =
      statusParams === "reviewed"
        ? true
        : statusParams === "unreviewed"
        ? false
        : undefined;

    const [messageSent, messageSentCount] = await Promise.all([
      prisma.message.findMany({
        skip: (pageParams - 1) * pageSize,
        take: pageSize,
        where: {
          senderId: id,
          ...(statusParams && { readBySender: status }),
        },

        include: {
          property: {
            select: {
              images: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.message.count({
        where: {
          senderId: id,
          ...(statusParams && { readBySender: status }),
        },
      }),
    ]);

    return { messageSent, messageSentCount };
  }
);

const page = async ({ searchParams }) => {
  const statusParams = searchParams.status;
  const pageParams = searchParams.page || 1;
  const pageSize = 10;
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const { messageSent, messageSentCount } = await getBookingMessage(
    session,
    statusParams,
    pageSize,
    pageParams
  );

  return (
    <BookingMessageContainer
      messageSentCount={messageSentCount}
      messageSent={messageSent || []}
      pageSize={pageSize}
      statusParams={statusParams}
    />
  );
};

export default page;
export const revalidate = 120;
export const metadata = {
  title: 'Messages sent - Home Vision',
  description: 'Track and manage your sent messages to property owners on Home Vision.',
  robots: 'noindex, nofollow',
};
