const getAdTypebyAdBanner = async (adbannerId: string) => {
  try {
    const response = await fetch(
      `/api/advertisement/adbanner/${adbannerId}/adtype`
    );

    //   console.log("response:", response);
    const adtype = await response.json();
    //   console.log("api call:", adtype);
    return adtype;
  } catch (error) {
    console.log(error);
  }
};

export default getAdTypebyAdBanner;
