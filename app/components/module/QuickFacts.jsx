"use client";
import { Flex } from "antd";

 
import HomeFeatures from "../../components/module/HomeFeatures";
const QuickFacts = ({ property }) => {
 
  const features = [
    {
      features: property?.bedrooms,

      title: "Bedrooms",
    },
    {
      features: property?.bathrooms,

      title: "Bathrooms",
    },
    {
      features: property?.square_cm,

      title: "m²",
    },
    {
      features: property?.sleeps,

      title: "sleeps",
    },
  ];
  return (
    <Flex vertical gap={20} className="borderB pb-8">
      <h2 className="gradient_title inline" level={2}>Quick Facts</h2>
      <div className="grid  grid-cols-2 max-sm:grid-cols-2 gap-3">
        {features.map((item, i) => (
          <HomeFeatures key={i} features={item.features} title={item.title} />
        ))}
      </div>
   
    </Flex>
  );
};

export default QuickFacts;
