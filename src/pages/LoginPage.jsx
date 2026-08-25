import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
useDocumentTitle("Page de connexion sur blindShare");
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);
  const onSubmitForm = async (data) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    login(res.token);
  };
  return (
    <section aria-labelledby="titre-login">
      <h1 id="titre-login">Connexion à votre compte sur blindshare</h1>
      <p>
        Afin de pouvoir profiter des fonctionnalités avancées du blogue, merci
        de bien vouloir renseigner vos identifiants de connection si vous avez
        déjà créer votre compte.
      </p>
      <p>
        Vous n'avez pas de compte, merci de bien vouloir en créer un{" "}
        <Link to="/register">en cliquant ici</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <fieldset>
          <label htmlFor="email">Votre adresse mail</label>
          <input
            type="text"
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
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        <fieldset>
          <button>Se connecter</button>
            </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;