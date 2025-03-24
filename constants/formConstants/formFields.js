
const ratesFields = (errors)=> [
    {
      name: "rates.night",
      label: "night",
      placeholder: "Enter the night rate",
      errors: errors?.rates?.night,
    },
    {
      name: "rates.week",
      label: "week",
      placeholder: "Enter the week rate",
      errors: errors?.rates?.week,
      optional: true,
    },
    {
      name: "rates.month",
      label: "month",
      placeholder: "Enter the monthly rate",
      errors: errors?.rates?.month,
      optional: true,
    },
  ];

  const propertyFields =(errors)=> [
    {
      name: "bedrooms",
      label: "Bedrooms",
      placeholder: "Enter the number of bedrooms",
      errors: errors?.bedrooms,
    },
    {
      name: "bathrooms",
      label: "bathrooms",
      placeholder: "Enter the number of bathrooms",
      errors: errors?.bathrooms,
    },
    {
      name: "square_cm",
      label: "Square meters",
      placeholder: "Enter the size in Square centimeter",
      errors: errors?.square_cm,
    },
    {
      name: "sleeps",
      label: "Sleeps",
      placeholder: "Enter the number of sleeps",
      errors: errors?.sleeps,
    },
  ];


  const locationFields =(errors)=> [
    {
      name: "location.street",
      label: "Street",
      placeholder: "Enter the street address",
      errors: errors?.location?.street,
    },
    {
      name: "location.city",
      label: "City",
      placeholder: "Enter the city",
      errors: errors?.location?.city,
    },
    {
      name: "location.state",
      label: "State",
      placeholder: "Enter the state",
      errors: errors?.location?.state,
    },
   
  ];
  const locationFieldsZipCountry =(errors)=> [
    {
      name: "location.zipcode",
      label: "Zip Code",
      placeholder: "Enter a 5-digit zip code",
      errors: errors?.location?.zipcode,
    },
  
    {
      name: "location.country",
      label: "country",
      placeholder: "Select country",
      errors: errors?.location?.country,
    },
  
  ];


  const rulesFields = [
    {
      name: "rules.pets",
      label: "Allows pets",
      title: "Pets",
    },
    {
      name: "rules.children",
      label: "Allows children",
      title: "Children",
    },
    {
      name: "rules.smoking",
      label: "Allows smoking",
      title: "Smoking",
    },
    {
      name: "rules.events",
      label: "Allows events",
      title: "Events",
    },
  ];
const checkTimeRulesFields=(errors)=>[
  {
    name: "rules.checkIn",
    label: "check in",
    placeholder: "Enter  check in",
    errors: errors?.rules?.checkIn,
  },
  {
    name: "rules.checkOut",
    label: "check out",
    placeholder: "Enter  check out",
    errors: errors?.rules?.checkOut,
  }
]

 
  export {ratesFields,propertyFields,locationFields,locationFieldsZipCountry,rulesFields,checkTimeRulesFields}


