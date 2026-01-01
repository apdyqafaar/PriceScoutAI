import axios from "axios";

export const webScrap=async({url}:{url:string})=>{
     let data = JSON.stringify({
  "url": url
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://scrape.serper.dev',
  headers: { 
    'X-API-KEY': 'e0ca68d2315d74b209a4b60dfca58c28e7c12385', 
    'Content-Type': 'application/json'
  },
  data : data
};


   const res = await axios.request(config);

   return res.data
}