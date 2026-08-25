import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setErrors,
    formState: { errors },
  } = useForm({ mode: "onTouch" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { apiFetch } = useFetch();
  const createCategory = async (data) => {
    try {
      setLoading(true);
      const response = await apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setCategories((prev) => [...prev, response]);
      reset();
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

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
  if (loading) return <p>"Chargement en cours"</p>;
  if (err) return <p>{"Erreur en cours : " + err}</p>;
  const deleteCategory = async (category) => {
    const isConfirmed = window.confirm(
      "êtes-vous sûrs de bien vouloir suprimer la catégorie " +
        category.name +
        "?",
    );
    if (isConfirmed) {
      try {
        await apiFetch("/categories/" + category.id, {
          method: "DELETE",
        });
        toast.success("Catégorie supprimée");
        setCategories(
          categories.filter((cat) => category.id !== cat.id),
        );
      } catch (error) {
        toast.error(error.message);
        setErr(error.message);
      }
    }
  };

  return (
    <>
      <h1>Page catégorie admin</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <button onClick={() => deleteCategory(category)}>
            Supprimer la catégorie
          </button>
        </div>
      ))}
      <h2>Ajout d'une nouvelle catégorie</h2>
      <form onSubmit={handleSubmit(createCategory)}>
        <fieldset>
          <label htmlFor="name">Nom de la catégorie</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Le champ nom est obligatoire" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </fieldset>
        <button>Créer la catégorie</button>
      </form>
    </>
  );
}
