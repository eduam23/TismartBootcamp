import React from "react";
import { styled } from "@mui/material/styles";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { URL_IMG_PLACEHOLDER } from "../../utils/Config";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 400 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#292929" : "#8c8c8c",
  },
}));

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

function ProductCard({ id = 1, title="Cargando...",category = "...", price = 0.00, image = URL_IMG_PLACEHOLDER , rating = 0.00}) {

  return (
    <div className="productCardContent">
      <Link to={"producto/"+id} style={linkStyle}>
        <div className="productCardContent_image">
          <img src={image} alt={title} />
          <h3>{title}</h3>
        </div>
        {/* <p>{description}</p> */}
        <div className="productCardContent_category">
          <BookmarkBorderOutlinedIcon />
          {category}
        </div>
        <div className="productCardContent_attributes">
          <span>
            <SellOutlinedIcon />
            s/. {price}
          </span>
          <span>
            <VerifiedUserOutlinedIcon />
            {rating.rate}
          </span>
          <span>
            <GroupOutlinedIcon />
            {rating.count}
          </span>
        </div>
        <BorderLinearProgress
          variant="determinate"
          value={Math.round((rating.rate * 100) / 5, -2)}
        />
        <div className="productCardContent_footer">
          <span>Rate: {Math.round((rating.rate * 100) / 5, -2)} %</span>
          <span>Count: {rating.count}</span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
