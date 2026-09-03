import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import ArticleCard from "../components/ArticleCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useDocumentTitle("Liste des articles sur blindShare");
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
      <h1>Liste des articles sur blindShare</h1>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesPage;
