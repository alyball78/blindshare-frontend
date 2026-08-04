import React from "react";
import { Link } from "react-router-dom";
function ArticleCard({ article }) {
  return (
    <div>
      <img src={article.cover_image_url} alt="Image de l'article" />
      <h2>Titre de l'article</h2>
      <p>{article.excerpt}</p>
      <p>{article.category_id}</p>
      <p>Publié le {article.created_at}</p>
      <Link to={"/articles/" + article.id}>Plus de détails</Link>
    </div>
  );
}

export default ArticleCard;
