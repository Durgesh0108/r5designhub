const getAdsizebyAdBanner = async (adbannerId: string) => {
  try {
    const response = await fetch(
      `/api/advertisement/adbanner/${adbannerId}/adsize`
    );

    console.log("response:", response);
    const adsize = await response.json();
    // console.log("api call:", adsize);
    return adsize;
  } catch (error) {
    console.log(error);
  }
};

export default getAdsizebyAdBanner;
