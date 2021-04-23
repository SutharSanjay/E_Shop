import React from "react"
import API from "../../backend"
import photo from "../../photo.jpg"

const ImageHelper =({product})=>{

    const imageurl = product ? `${API}/product/photo/${product._id}` : photo
    
    return(
        <span className="card-img">
            <img src={imageurl} />
        </span>
    )
}

export default ImageHelper