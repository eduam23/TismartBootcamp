import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./StudentBought.css";

const urlImagePlaceholder = 'https://ebdental.es/wp-content/themes/prodent/images/no-image.jpg';

function StudentBought({ titleProduct = 'Cargando...', urlImageProduct = urlImagePlaceholder, priceProduct = '0.00'}) {
  return (
    <div class="studentBoughtContent">
      <h3>Customers Also Bought</h3>
      <div className="studentBoughtContent_card">

          <img
            // src="https://images.ctfassets.net/hrltx12pl8hq/3E5SSUuJCKt1KyebMAdr7f/6b98ce27789b03a6b4a62092ea4566b6/Group_5_B.jpg?fit=fill&w=600&h=400"
            src={urlImageProduct}
            alt="Product"
          />
        
        <div className="studentBoughtContent_card_info">
          <h4>{titleProduct}</h4>
          <strong>Bestsaller</strong>
          <span>s/. {priceProduct}</span>
        </div>
        <div className="studentBoughtContent_hearthIcon">
          <FavoriteBorderOutlinedIcon />
        </div>
      </div>
      <div className="studentBoughtContent_card">
        <img
          // src="https://st.depositphotos.com/1016440/2534/i/600/depositphotos_25344733-stock-photo-sunrise-at-the-beach.jpg"
          src={urlImageProduct}
          alt="Product"
        />
        <div className="studentBoughtContent_card_info">
          <h4>{titleProduct}</h4>
          <strong>Bestsaller</strong>
          <span>s/. {priceProduct}</span>
        </div>

        <div className="studentBoughtContent_hearthIcon">
          <FavoriteBorderOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default StudentBought;
