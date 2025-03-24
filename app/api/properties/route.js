export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req) {
    try {

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const searchQ = searchParams.get("q")
        const amenitiesParams = searchParams.getAll("amenities")
        const minPriceParams = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
        const maxPriceParams = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
        const bedsParams = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined
        const bathParams = searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : undefined
        const sleepsParams = searchParams.get("sleeps") ? Number(searchParams.get("sleeps")) : undefined
        const typeParams = searchParams.getAll("type")
        const sortByParams = searchParams.get("sortBy") || undefined
        const rulesParams = searchParams.getAll("rules") ? searchParams.getAll("rules") : undefined
        const pageParams = searchParams.get("page") ? Number(searchParams.get("page")) : 1

        const searchConditions = [];

        if (typeParams.length > 0) {
            const typeArrayMap = typeParams.map((itemType) => ({
                type: { contains: itemType, mode: "insensitive" },
            }))
            console.log(typeArrayMap);
            searchConditions.push({
                OR: typeArrayMap
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

        if (amenitiesParams?.length > 0) {
            searchConditions.push({
                amenities: { hasEvery: amenitiesParams },
            });
        }


        if (rulesParams?.length > 0) {
            const isRulesTrue = Object.fromEntries(rulesParams.map(rule => [rule, true]));

            searchConditions.push({
                rules: {
                    is: isRulesTrue
                },
            });
        }


        if (minPriceParams) {
            searchConditions.push({
                rates: {
                    is: { night: { gte: minPriceParams } }
                },
            });
        }
        if (maxPriceParams) {
            searchConditions.push({
                rates: {
                    is: { night: { lte: maxPriceParams } }
                },
            });
        }
        if (bedsParams) {
            searchConditions.push({
                bedrooms: { gte: bedsParams }
            });
        }
        if (bathParams) {
            searchConditions.push({
                bathrooms: { gte: bathParams }
            });
        }
        if (sleepsParams) {
            searchConditions.push({
                sleeps: { gte: sleepsParams }
            });
        }

        const sortBy = sortByParams
            ? {
                rates: {
                    night: sortByParams === "high_price" ? "desc" : "asc",
                },
            }
            : { createdAt: 'desc' };

        const pageSize = 12
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
              
        return NextResponse.json({ properties, propertiesTotal }, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
