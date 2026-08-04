import { useState } from "react";
import { Link } from "react-router-dom";
function LikeButton() {
  const [isLike, setIsLike] = useState(false);
  function handleClick() {
    setIsLike(!isLike);
  }

  return (
    <div className="ArticleDetailPage">
      <button onClick={handleClick}>{isLike ? "J'aime" : "J'aime pas"}</button>
    </div>
  );
}

export default LikeButton;
