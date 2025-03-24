 
import NotFoundProperty from "@/app/components/shared/NotFoundProperty";

const notFound = () => {
  return (
    <NotFoundProperty
      label={"The page you're looking for doesn't exist anymore."}
    />
  );
};

export default notFound;
