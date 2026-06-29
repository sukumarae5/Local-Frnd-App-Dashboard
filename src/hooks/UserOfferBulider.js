import { useState } from "react";

const UseOfferBuilder = () => {

    const [offer,setOffer]=useState({

        banner_type:"COIN",

        background_image:null,

        right_image:null,

        priority:1,

        target_audience:"ALL",

        redirect_url:"",

        start_date:"",

        end_date:"",

        status:1,

        contents:[],

        features:[],

       button:{

    button_text:"Buy Now",

    button_color:"#6D5BFF",

    text_color:"#FFFFFF",

    redirect_url:""

}

    });

    return{

        offer,

        setOffer

    }

}

export default UseOfferBuilder;