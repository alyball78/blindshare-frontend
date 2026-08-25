import { useFetch } from "../hooks/useFetch";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

function ArticleCard({ article, setArticles, articles }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { apiFetch } = useFetch();
  const { role } = useContext(AuthContext);
  const deleteArticle = async () => {
    const isConfirmed = window.confirm(
      "Etes-vous sûrs de bien vouloir supprimer l'article " +
        article.title +
        " ?",
    );
    if (isConfirmed) {
      try {
        await apiFetch("/articles/" + article.id, {
          method: "DELETE",
        });
        toast.success("Article supprimé");
        setArticles(articles.filter((art) => art.id !== article.id));
      } catch (error) {
        toast.error(error.message);
        setErr(error.message);
      }
    }
  };
  return (
    <div>
      <img src={article.cover_image_url} alt="Image de l'article" />
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      <p>{article.category_id}</p>
      <p>Publié le {article.created_at}</p>
      <Link to={"/articles/" + article.id}>Plus de détails</Link>
      {role === "admin" && (
        <>
          <Link to={"/admin/articles/" + article.id + "/edit"}>Modifier</Link>
          <button onClick={() => deleteArticle(article)}>Supprimer</button>
        </>
      )}
    </div>
  );
}

export default ArticleCard;
