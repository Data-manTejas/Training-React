import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Header = () => {
  const { state } = useContext(GlobalContext);
  const cartCount = state.cart.length;

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">E-Commerce</Link>
      </h1>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
