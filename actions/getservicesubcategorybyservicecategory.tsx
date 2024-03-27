const getservicesubcategorybyservicecategory = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/service/subcategory/${categoryId}`);
      const subcategory = await response.json();
      return subcategory;
    } catch (error) {
      console.log(error);
    }
  };
  
  export default getservicesubcategorybyservicecategory;
  