import { useCategories }
from "../hooks/useCategories";

export default function Categories() {

  const {
    categories,
    loading,
  } = useCategories();

  if (loading)
    return <p>Loading...</p>;

  return (

    <div>

      <h1>
        Categories
      </h1>

      <hr />

      {categories.map((category) => (

        <div key={category.id}>

          <h3>
            {category.name}
          </h3>

          <p>
            Type: {category.type}
          </p>

          <hr />

        </div>

      ))}

    </div>

  );

}
