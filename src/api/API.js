
const API = {
  BASE_URL: "https://www.wecasa.fr/api/techtest",
  //API_PRIVATE: "5a441ae3f0157c126a5ceeae7b6ede6808b4af87",
  //API_PUBLIC: "389d73f6972fa5a352e2558572ebaf02",

  getTimestamp: function(){
    return Math.floor(Date.now()/1000);
  },

  // routes
  getUniverse: function(){
    //const timestamp = this.getTimestamp();
    return this.BASE_URL+"/universe";
  },

  postBooking: function(){
    return this.BASE_URL+"/booking";
  }

}

export default API;
