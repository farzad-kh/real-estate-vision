import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookmarkContainer from "@/app/components/template/BookmarkContainer";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { cache } from "react";
const getUserBookmarks = cache(async (userId, pageSize, searchParams) => {
  if (!userId) return null;
  const pageParams = searchParams.page || 1;

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

  const [bookmark, bookmarkTotal] = await Promise.all([
    await prisma.bookmark.findMany({
      where: {
        userId,
      },
      skip: (pageParams - 1) * pageSize,
      take: pageSize,
      select: {
        property: {
          select,
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    await prisma.bookmark.count({
      where: {
        userId,
      },
    }),
  ]);
  const modifiedBookmarks = bookmark.map((item) => ({
    ...item,
    property: { ...item.property, images: [item.property.images[0]] },
  }));

  return { modifiedBookmarks, bookmarkTotal };
});

const page = async ({ searchParams }) => {
  // unstable_noStore();
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const userId = session?.user.id;
  const pageSize = 16;
  const { modifiedBookmarks, bookmarkTotal } = await getUserBookmarks(
    userId,
    pageSize,
    searchParams
  );

  return (
    <BookmarkContainer
      bookmarkProperty={modifiedBookmarks || []}
      bookmarkTotal={bookmarkTotal}
      pageSize={pageSize}
    />
  );
};

export default page;
export const metadata = {
  title: 'Bookmarks - Home Vision',
  description: 'View and manage your saved properties on Home Vision.',
  robots: 'noindex, nofollow',  
};