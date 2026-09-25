//this is where we use the instance

import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next)=>{
    try{//here using the ratelimit instance 
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later."
            })
        }

        next();
    }catch(error){
        console.log("Rate limit error", error);
        next(error);
    }
}


export default rateLimiter;