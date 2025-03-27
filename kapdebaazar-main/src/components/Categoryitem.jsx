import { useNavigate } from "react-router-dom";
import "../resources/categories.styles.scss";
function Categoryitem({ category }) {
  const {title , imageURL} = category;
  const navigate = useNavigate();
  const shopping = () =>{
     const newtitle = title.toLowerCase();
     navigate(`shop/${newtitle}`);
  }
  return (
    <div className="category-container">
    <div className="background-image" style={{backgroundImage:`url(${imageURL})`}}/>
    <div className="category-body-container" onClick={shopping}>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
 </div>
  )
}

export default Categoryitem