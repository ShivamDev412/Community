const handleLocation = (data: any) => {
  const cityName = data.find((component: { types: string | string[] }) =>
    component.types.includes("locality")
  ).short_name;
  const stateName = data.find((component: { types: string | string[] }) =>
    component.types.includes("administrative_area_level_1")
  ).short_name;
  return {
    location: {
      city: cityName,
      state: stateName,
    },
  };
};

export { handleLocation };
