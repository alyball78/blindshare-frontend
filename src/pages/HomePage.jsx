import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useFetch } from "../hooks/useFetch";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useDocumentTitle("Page d'accueil blindShare");
  const { apiFetch } = useFetch();
  useEffect(() => {
    const fetchLastArticles = async () => {
      try {
        const data = await apiFetch("/articles?limit=true");
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLastArticles();
  }, []);
  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;
  return (
    <div className="article-grid">
      <h1>
        Bienvenue sur blindShare, le blogue qui valorise les passions au-delà du
        handicap.
      </h1>
      <p>
        Ici nous vous proposons des articles accessibles afin de donner la
        parole aux personnes vivant avec un handicap tout en garantissant un
        cadre éditorial clair et structuré.
      </p>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      <Link to={"/articles"}>Voir tous les articles</Link>
    </div>
  );
}

export default HomePage;
