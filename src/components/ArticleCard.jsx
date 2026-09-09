import { useFetch } from "../hooks/useFetch";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

function ArticleCard({ article, setArticles, articles }) {
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
    <div className="card">
      <h2>{article.title}</h2>
      <img
        src={article.cover_image_url}
        alt={"Image de l'article" + article.title}
      />

      <p>{article.excerpt}</p>
      <p>Catégorie {article.category_name}</p>
      <p>
        {article.status === "PUBLISHED" ? "Publié le " : "Créé le "}
        {new Date(article.created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div>
        <Link to={"/articles/" + article.id}>Plus de détails</Link>
      </div>
      {role === "admin" && (
        <>
          <div>
            <Link to={"/admin/articles/" + article.id + "/edit"}>Modifier</Link>
          </div>
          <button onClick={() => deleteArticle(article)}>Supprimer</button>
        </>
      )}
    </div>
  );
}

export default ArticleCard;
