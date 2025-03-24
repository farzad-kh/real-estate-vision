
import NotFoundProperty from "@/app/components/shared/NotFoundProperty";

const notFound = () => {
  return (
    <NotFoundProperty
      label={"Sorry! No properties match your search criteria. Please adjust your filters or try again."}
    />
  );
};

export default notFound;
