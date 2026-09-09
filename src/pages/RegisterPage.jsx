import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
useDocumentTitle("Page d'inscription sur blindShare");
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    login(res.token);
    navigate("/");
  };
  return (
    <section aria-labelledby="titre-register">
      <h1 id="titre-register">Création de votre compte sur blindShare</h1>
      <p>
        L'inscription sur notre site vous permet au delà de consulter les
        articles qui y sont publiés, de pouvoir les mettre en favoris, de les
        aimer, de les partager et même de les télécharger.
      </p>
      <p>
        Vous avez déjà un compte, merci de bien vouloir vous identifier{" "}
        <a href="/login">en cliquant ici</a>
      </p>
      <p>
        Pour vous inscrire, merci de bien vouloir renseigner les éléments
        suivants:
      </p>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <fieldset>
          <label htmlFor="pseudo">Votre pseudo</label>
          <input
            type="text"
            id="pseudo"
            {...register("pseudo", {
              required: "Le pseudo est obligatoire",
              min: 2,
            })}
          />
          {errors.pseudo && <p>{errors.pseudo.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="email">Votre adresse mail</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "L'email est obligatoire" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Votre mot de passe</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Le mot de passe est obligatoire",
              min: 6,
            })}
          />
          {errors.password && <p>{errors.password.message} </p>}
        </fieldset>
        <fieldset>
          <label htmlFor="confirmation_password">
            Confirmer votre mot de passe
          </label>
          <input
            type="password"
            id="confirmation_password"
            {...register("confirmation_password", {
              required: "La confirmation du  mot de passe est obligatoire",
              min: 6,
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="consentGiven">
            J'accepte que mes données soient utilisées pour la création et la
            gestion de mon compte
          </label>
          <input
            type="checkbox"
            id="consentGiven"
            {...register("consentGiven", { required: true })}
          />
          {errors.consentGiven && <p>{errors.consentGiven.message}</p>}
        </fieldset>
        <fieldset>
          <button>S'inscrire</button>
        </fieldset>
      </form>
    </section>
  );
};

export default RegisterPage;
