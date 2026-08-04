import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams, useNavigate, Link } from "react-router-dom";
import LikeButton from "../components/LikeButton";
function ArticleDetailPage() {
  const { id } = useParams();
  const { apiFetch } = useFetch();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await apiFetch("/articles/" + id);
        setArticle(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);
  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;

  return (
    <div>
      <h1>Détail de l'article</h1>

      <article>
        <img src={article.cover_image_url} alt="Image de l'article" />
        <h2>Titre de l'article.{article.title}</h2>
        <p>auteur: Admin{article.author}</p>
        <p>contenu de l'article.{article.content}</p>
        <LikeButton />
      </article>
    </div>
  );
}

export default ArticleDetailPage;
