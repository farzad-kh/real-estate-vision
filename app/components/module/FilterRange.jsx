"use client"

import { Slider } from "antd";
import { useSearchParams } from "next/navigation";

const FilterRange = ({
  minPrice,
  setPrice,
  maxPrice,
  filterKeyMinPrice,
  filterKeyMaxPrice,
}) => {
  const searchParams = useSearchParams();

  const minPriceParam = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : 0;

  const maxPriceParam = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : 700;

  const rangePriceHandler = (value) => {
    if (!searchParams.get("minPrice") && !searchParams.get("maxPrice")) {
      setPrice((perv) => ({
        ...perv,
        [filterKeyMinPrice]: null,
        [filterKeyMaxPrice]: null,
      }));
    }

    setPrice((perv) => ({
      ...perv,
      [filterKeyMinPrice]: value[0],
      [filterKeyMaxPrice]: value[1],
    }));
  };

  return (
    <section className="border-b py-4">
      <div className="mb-4">
        <span className="font-semibold text-lg gradient_title">Price</span>
        <div className="text-xs font-semibold">PER NIGHT</div>
      </div>

      <div className="flex gap-1">
        <span className="text-base font-semibold">
          ${minPrice ?? minPriceParam}
        </span>
        {"-"}
        <span className="text-base font-semibold">
          ${maxPrice ?? maxPriceParam}
        </span>
      </div>

      <Slider
        onChange={rangePriceHandler}
        value={[minPrice ?? minPriceParam, maxPrice ?? maxPriceParam]}
        range
        min={1}
        max={700}
      />
    </section>
  );
};

export default FilterRange;
