const getAdpriceByAll = async (adbannerId: string,addurationId:string,adsizeId:string,adtypeId:string) => {
    try {
      const response = await fetch(
        `/api/advertisement/adbanner/${adbannerId}/${addurationId}/${adsizeId}/${adtypeId}`
      );
  
      // console.log("response:", response);
      const adprice = await response.json();
      // console.log("api call:", adprice);
      return adprice;
    } catch (error) {
      console.log(error);
    }
  };
  
  export default getAdpriceByAll;
  