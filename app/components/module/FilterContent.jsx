 
import FilterRoomTag from "./FilterRoomTag";
import FilterAmenityTag from "./FilterAmenityTag";
import FilterPriceTag from "./FilterPriceTag";
import FilterBedrooms from "./FilterBedrooms";
import FilterCheckbox from "./FilterCheckbox";
import FilterRange from "./FilterRange";
import FilterTypeCheckbox from "./FilterTypeCheckbox";
import bath from "@/public/svg-bathrooms-ruls.svg";
import sleepsIcon from "@/public/svg-sleeps.svg";
import beds from "@/public/svg-bedrooms.svg";
const FilterContent = ({ filters, setFilters, hasFilterSelected, winSize }) => {
  return (
    <>
      <div
        style={{ scrollbarWidth: "thin" }}
        className={`flex flex-col gap-4    ${
          !winSize
            ? " h-full overflow-y-auto overflow-x-clip max-h-[69vh] px-6 pb-4   "
            : "h-full  pb-4"
        }`}
      >
        <section className="flex flex-col gap-3 ">
          {hasFilterSelected && (
            <span className="font-semibold text-lg gradient_title">
              Selected
            </span>
          )}
          <div className="flex flex-wrap gap-y-2">
            {/* {filters tags} */}

            <FilterRoomTag
              tags={filters?.bedrooms}
              tagKey={"bedrooms"}
              setFilters={setFilters}
            />
            <FilterRoomTag
              tags={filters.bathrooms}
              tagKey={"bathrooms"}
              setFilters={setFilters}
            />
            <FilterRoomTag
              tags={filters.sleeps}
              tagKey={"sleeps"}
              setFilters={setFilters}
            />
            {/* {filters boxs} */}
            <FilterAmenityTag
              tags={filters.amenities}
              tagKey={"amenities"}
              setFilters={setFilters}
            />
            <FilterPriceTag
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              setFilters={setFilters}
              minTagKey={"minPrice"}
              maxTagKey={"maxPrice"}
            />
            <FilterAmenityTag
              tags={filters.type}
              tagKey={"type"}
              setFilters={setFilters}
            />
            <FilterAmenityTag
              tags={filters.rules}
              tagKey={"rules"}
              setFilters={setFilters}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <span className="font-semibold text-lg gradient_title ">
            Guests and rooms
          </span>
          <div className="grid max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 gap-x-8 gap-y-4 border-b py-4">
            <FilterBedrooms
              title="Bedrooms"
              icon={beds}
              value={filters.bedrooms}
              setValue={setFilters}
              filterKey="bedrooms"
            />
            <FilterBedrooms
              title={"Bathrooms"}
              icon={bath}
              value={filters.bathrooms}
              setValue={setFilters}
              filterKey="bathrooms"
            />
            <FilterBedrooms
              title={"Sleeps"}
              icon={sleepsIcon}
              value={filters.sleeps}
              setValue={setFilters}
              filterKey="sleeps"
            />
          </div>
        </section>

        <FilterCheckbox
          setAmenities={setFilters}
          amenities={filters.amenities}
        />
        <FilterRange
          minPrice={filters.minPrice}
          filterKeyMinPrice={"minPrice"}
          filterKeyMaxPrice={"maxPrice"}
          setPrice={setFilters}
          maxPrice={filters.maxPrice}
        />
        <FilterTypeCheckbox
          setFilters={setFilters}
          type={filters.type}
          filterKey={"type"}
        />
        <div className="pb-2">
        <FilterTypeCheckbox
          setFilters={setFilters}
          type={filters.rules}
          filterKey={"rules"}
          rules
          />
          </div>
      </div>
    </>
  );
};

export default FilterContent;
