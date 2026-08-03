import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav aria-label="Navigation principale">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/Articles">Nos articles</Link>
        </li>

        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/contact">Nous contacter</Link>
        </li>
      </ul>
      {isAuthenticated && <button onClick={logout}>Déconnexion</button>}
    </nav>
  );
};

export default Navbar;
