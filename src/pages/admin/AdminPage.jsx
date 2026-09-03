import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import ArticleCard from "../../components/ArticleCard";
import { Link } from "react-router-dom";
function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { apiFetch } = useFetch();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await apiFetch("/articles");
        setArticles(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;
  return (
    <div>
      <h1>Liste des articles pour les administrateurs</h1>
      <Link to={"/admin/articles/new"}>Créer un article</Link>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          setArticles={setArticles}
          articles={articles}
        />
      ))}
    </div>
  );
}

export default AdminPage;
