import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

    const { apiFetch } = useFetch();

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await apiFetch("/auth/me");


        setUser(data);
        setPseudo(data.pseudo);
        setEmail(data.email);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadAccount();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await apiFetch("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          pseudo,
          email,
        }),
      });

      setUser(data);
      setMessage("Votre compte a bien été modifié.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer définitivement votre compte ?",
    );

    if (!confirmation) {
      return;
    }

    try {
      await apiFetch("/auth/me", {
        method: "DELETE",
      });

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!user) {
    return <p>Chargement du compte...</p>;
  }

  return (
    <main>
      <h1>Mon compte</h1>

      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button type="submit">Enregistrer les modifications</button>
      </form>

      <section aria-labelledby="delete-account-title">
        <h2 id="delete-account-title">Supprimer mon compte</h2>

        <p>Cette action est définitive.</p>

        <button type="button" onClick={handleDelete}>
          Supprimer mon compte
        </button>
      </section>
    </main>
  );
}

export default AccountPage;
