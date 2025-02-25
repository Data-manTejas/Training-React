
const CategoryFilter = ({ setCategory }) => {
  const categories = ["all", "men's clothing", "women's clothing", "jewelery", "electronics"];

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button key={cat} onClick={() => setCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
