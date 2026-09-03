import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

function EditArticlePage() {
const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const { id } = useParams();
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentArticle = async () => {
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
      try {
        const data = await apiFetch("/articles/" + id);
        reset({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          cover_image_url: data.cover_image_url,
          category_id: data.category_id,
          status: data.status,
        });
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentArticle();
  }, []);

  const updateArticle = async (data) => {
    try {
      setLoading(true);

      const response = await apiFetch("/articles/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
      }

      toast.success("Article modifié");
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
    <div>
      <h1>Page de mise à jour d'un article</h1>
      <form onSubmit={handleSubmit(updateArticle)}>
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
          <label htmlFor="content">Contenu de l'article</label>
          <input
            type="text"
            id="content"
            {...register("content", { required: "Le contenu est obligatoire" })}
          />
          {errors.content && <p>{errors.content.message}</p>}
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
        <button>Mettre à jour l'article l'article</button>
      </form>
    </div>
  );
}

export default EditArticlePage;
