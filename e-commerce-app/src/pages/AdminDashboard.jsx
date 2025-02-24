import { useState, useContext } from "react";
import AdminForm from "../components/AdminForm";
import { GlobalContext } from "../context/GlobalState";

const AdminDashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [editProduct, setEditProduct] = useState(null);

  const handleSubmit = (product) => {
    if (editProduct) {
      dispatch({ type: "EDIT_PRODUCT", payload: product });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: { ...product, id: Date.now() } });
    }
    setEditProduct(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <AdminForm onSubmit={handleSubmit} initialData={editProduct} />
      <h2 className="mt-4 text-lg font-semibold">Products</h2>
      <ul>
        {state.products.map((product) => (
          <li key={product.id} className="flex justify-between p-2 border-b">
            {product.title}
            <button onClick={() => setEditProduct(product)} className="text-blue-500">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
