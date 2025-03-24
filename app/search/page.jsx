// import prisma from "@/prisma/client";
// import ProppertieContainer from "../components/template/ProppertieContainer";
// import SearchContainer from "../components/template/SearchContainer";

// const page = async ({ searchParams }) => {
//   const searchQ = searchParams.q;
//   const searchAmenities = searchParams.amenities;
//   const searchMinPrice = Number(searchParams.minPrice);
//   const searchMaxPrice = Number(searchParams.maxPrice);
//   const searchBedrooms = Number(searchParams.bedrooms);
//   const searchBathrooms = Number(searchParams.bathrooms);
//   const sleepsBathrooms = Number(searchParams.sleeps);
//   const searchType = searchParams.type;
//   const searchRules = searchParams.rules;
//   const searchSortBy = searchParams.sortBy;
//   const pageParams=Number(searchParams.page) || 1

//   const amenitiesArray = searchAmenities
//     ? Array.isArray(searchAmenities)
//       ? searchAmenities
//       : [searchAmenities]
//     : [];

//   const typeArray = searchType
//     ? Array.isArray(searchType)
//       ? searchType
//       : [searchType]
//     : [];
//   const rulesArray = searchRules
//     ? Array.isArray(searchRules)
//       ? searchRules
//       : [searchRules]
//     : [];

//   const searchConditions = [];

//   if (typeArray.length > 0) {
//     const typeArrayMap = typeArray.map((itemType) => ({
//       type: { contains: itemType, mode: "insensitive" },
//     }));

//     searchConditions.push({
//       OR: typeArrayMap,
//     });
//   }

//   if (searchQ) {
//     searchConditions.push({
//       OR: [
//         { name: { contains: searchQ, mode: "insensitive" } },
//         {
//           location: {
//             is: { country: { contains: searchQ, mode: "insensitive" } },
//           },
//         },
//         {
//           location: {
//             is: { street: { contains: searchQ, mode: "insensitive" } },
//           },
//         },
//         {
//           location: {
//             is: { city: { contains: searchQ, mode: "insensitive" } },
//           },
//         },
//         {
//           location: {
//             is: { state: { contains: searchQ, mode: "insensitive" } },
//           },
//         },
//       ],
//     });
//   }

//   if (amenitiesArray?.length > 0) {
//     searchConditions.push({
//       amenities: { hasEvery: amenitiesArray },
//     });
//   }

//   if (rulesArray?.length > 0) {
//     const isRulesTrue = Object.fromEntries(rulesArray.map(rule => [rule, true]));

//     searchConditions.push({
//       rules: {
//         is: isRulesTrue
//       },
//     });
//   }

//   if (searchMinPrice) {
//     searchConditions.push({
//       rates: {
//         is: { night: { gte: Number(searchMinPrice) } },
//       },
//     });
//   }
//   if (searchMaxPrice) {
//     searchConditions.push({
//       rates: {
//         is: { night: { lte: Number(searchMaxPrice) } },
//       },
//     });
//   }
//   if (searchBedrooms) {
//     searchConditions.push({
//       bedrooms: { gte: Number(searchBedrooms) },
//     });
//   }
//   if (searchBathrooms) {
//     searchConditions.push({
//       bathrooms: { gte: Number(searchBathrooms) },
//     });
//   }
//   if (sleepsBathrooms) {
//     searchConditions.push({
//       sleeps: { gte: Number(sleepsBathrooms) },
//     });
//   }

//   const sortBy = searchSortBy
//     ? {
//         rates: {
//           night: searchSortBy === "high_price" ? "desc" : "asc",
//         },
//       }
//     : {createdAt: 'desc'};

// const pageSize = 12
//   const searchProperties =
//     searchConditions.length > 0 ? { AND: searchConditions } : undefined;

//   const properties = await prisma.property.findMany({
//      skip: (pageParams - 1) * pageSize,
//     take: pageSize,
//     where: searchProperties,
//     orderBy: sortBy,
//   });

//   const propertiesTotal = await prisma.property.count({
//     where: searchProperties,
//   });
//   return (
//     <SearchContainer
//       searchAmenities={searchAmenities}
//       properties={properties}
//       propertiesTotal={propertiesTotal}
//     />
//   );
// };

// export default page;
// export const revalidate = 60;


import prisma from "@/prisma/client";

import SearchContainer from "../components/template/SearchContainer";
import { cache } from "react";
 

const getProperties = cache(async (searchParams) => {
  const searchQ = searchParams.q;
  const searchAmenities = searchParams.amenities;
  const searchMinPrice = Number(searchParams.minPrice);
  const searchMaxPrice = Number(searchParams.maxPrice);
  const searchBedrooms = Number(searchParams.bedrooms);
  const searchBathrooms = Number(searchParams.bathrooms);
  const sleepsBathrooms = Number(searchParams.sleeps);
  const searchType = searchParams.type;
  const searchRules = searchParams.rules;
  const searchSortBy = searchParams.sortBy;
  const pageParams = Number(searchParams.page) || 1;

  const amenitiesArray = searchAmenities
    ? Array.isArray(searchAmenities)
      ? searchAmenities
      : [searchAmenities]
    : [];

  const typeArray = searchType
    ? Array.isArray(searchType)
      ? searchType
      : [searchType]
    : [];
  const rulesArray = searchRules
    ? Array.isArray(searchRules)
      ? searchRules
      : [searchRules]
    : [];

  const searchConditions = [];

  if (typeArray.length > 0) {
    const typeArrayMap = typeArray.map((itemType) => ({
      type: { contains: itemType, mode: "insensitive" },
    }));

    searchConditions.push({
      OR: typeArrayMap,
    });
  }

  if (searchQ) {
    searchConditions.push({
      OR: [
        { name: { contains: searchQ, mode: "insensitive" } },
        {
          location: {
            is: { country: { contains: searchQ, mode: "insensitive" } },
          },
        },
        {
          location: {
            is: { street: { contains: searchQ, mode: "insensitive" } },
          },
        },
        {
          location: {
            is: { city: { contains: searchQ, mode: "insensitive" } },
          },
        },
        {
          location: {
            is: { state: { contains: searchQ, mode: "insensitive" } },
          },
        },
      ],
    });
  }

  if (amenitiesArray?.length > 0) {
    searchConditions.push({
      amenities: { hasEvery: amenitiesArray },
    });
  }

  if (rulesArray?.length > 0) {
    const isRulesTrue = Object.fromEntries(
      rulesArray.map((rule) => [rule, true])
    );

    searchConditions.push({
      rules: {
        is: isRulesTrue,
      },
    });
  }

  if (searchMinPrice) {
    searchConditions.push({
      rates: {
        is: { night: { gte: Number(searchMinPrice) } },
      },
    });
  }
  if (searchMaxPrice) {
    searchConditions.push({
      rates: {
        is: { night: { lte: Number(searchMaxPrice) } },
      },
    });
  }
  if (searchBedrooms) {
    searchConditions.push({
      bedrooms: { gte: Number(searchBedrooms) },
    });
  }
  if (searchBathrooms) {
    searchConditions.push({
      bathrooms: { gte: Number(searchBathrooms) },
    });
  }
  if (sleepsBathrooms) {
    searchConditions.push({
      sleeps: { gte: Number(sleepsBathrooms) },
    });
  }

  const sortBy = searchSortBy
    ? {
        rates: {
          night: searchSortBy === "high_price" ? "desc" : "asc",
        },
      }
    : { createdAt: "desc" };

  const pageSize = 12;
  const searchProperties =
    searchConditions.length > 0 ? { AND: searchConditions } : undefined;

  const [propertiesTotal, properties] = await Promise.all([
    prisma.property.count({ where: searchProperties }),
    prisma.property.findMany({
      skip: (pageParams - 1) * pageSize,
      take: pageSize,
      where: searchProperties,
      orderBy: sortBy,
    }),
  ]);

  return { properties, propertiesTotal };
});

const page = async ({ searchParams }) => {
  const propertiesData = await getProperties(searchParams);

  return <SearchContainer />;
};

export default page;
export const revalidate = 60;

export async function generateMetadata({ searchParams }) {
  const searchQ = searchParams.q;
  const searchType = searchParams.type;
  const searchCity = searchParams.city;
  const searchCountry = searchParams.country;

  const title = searchQ
    ? `Search Results for "${searchQ}" | Home Vision`
    : "Explore Luxury Properties | Home Vision";

  const description = searchQ
    ? `Discover luxury properties available for rent matching your search "${searchQ}". Find the best deals on homes, apartments, and vacation rentals.`
    : "Explore a wide range of luxury properties available for rent. Book your next stay with Home Vision and enjoy a premium experience.";

  const keywords = [
    searchQ,
    searchType,
    searchCity,
    searchCountry,
    "luxury properties",
    "rental homes",
    "vacation rentals",
    "apartments for rent",
    "Home Vision",
  ]
    .filter(Boolean)
    .join(", ");

  const openGraphImage = "/default-image.jpg";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [openGraphImage],
      type: "website",
    },
    robots: "index, follow",
  };
}
