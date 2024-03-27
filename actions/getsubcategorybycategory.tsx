const getsubcatgeorybycategory = async (categoryId: string) => {
  try {
    const response = await fetch(`/api/category/${categoryId}/subcategory`);
    const subcategory = await response.json();
    return subcategory;
  } catch (error) {
    console.log(error);
  }
};

export default getsubcatgeorybycategory;
