import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const CreateArticlePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouch" });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { apiFetch } = useFetch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/categories");
        setCategories(data);

        console.log(data);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const createArticle = async (data) => {
    try {
      setLoading(true);

      const response = await apiFetch("/articles", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
      }

      toast.success("Article créé");
      navigate("/admin");
      return;
    } catch (error) {
      toast.error(error.message);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>"Chargement en cours"</p>;
  if (err) return <p>{"Erreur en cours : " + err}</p>;

  return (
    <>
      <Link to={"/admin"}>Retour à la liste des articles</Link>
      <h1>Page de création d'un article</h1>
      <form onSubmit={handleSubmit(createArticle)}>
        <fieldset>
          <label htmlFor="title">Titre de l'article</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "le champ titre est requis",
              minLength: { value: 2, message: "Minimum 2 caractères" },
              maxLength: {
                value: 200,
                message: "Max 200 caractères",
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="excerpt">Résumé de l'article</label>
          <input
            type="text"
            id="excerpt"
            {...register("excerpt", {
              required: "Le résumé est obligatoire",
              maxLength: {
                value: 300,
                message: "Le résumé ne peut pas dépasser 300 caracgtères",
              },
            })}
          />
          {errors.excerpt && <p>{errors.excerpt.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="content">Contenu de l'article</label>
          <input
            type="text"
            id="content"
            {...register("content", { required: "Le contenu est obligatoire" })}
          />
          {errors.content && <p>{errors.content.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="cover_image_url">
            Image de couverture de l'article
          </label>
          <input
            type="text"
            id="cover_image_url"
            {...register("cover_image_url", {
              required: "l'image est obligatoire",
              message: "l'image doit être une URL",
            })}
          />
          {errors.cover_image_url && <p>{errors.cover_image_url.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="category_id">Catégorie de l'article</label>
          <select
            id="category_id"
            {...register("category_id", {
              required: "La catégorie est obligatoire",
              valueAsNumber: true,
            })}
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
            <legend>Statut de l'article</legend> 
          <div>
            <input
              id="status-draft"
              type="radio"
              value="draft"
              {...register("status")}
            />
                <label htmlFor="status-draft">Brouillon</label> {" "}
          </div>
          <div>
            <input
              id="status-published"
              type="radio"
              value="published"
              {...register("status")}
            />
                <label htmlFor="status-published">Publié</label> 
          </div>
        </fieldset>
        <button>Créer l'article</button>
      </form>
    </>
  );
};

export default CreateArticlePage;
