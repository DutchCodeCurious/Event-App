const checkCategoryExists = async (categoryName) => {
  try {
    const response = await fetch(
      `http://localhost:8000/categories?name=${categoryName}`
    );
    const data = await response.json();
    console.log(data.id);
    console.log(data.length);
    return data.length > 0; // Geeft true terug als er categorieën zijn gevonden met dezelfde naam
  } catch (error) {
    return false;
  }
};

const checkUserExists = async (name) => {
  try {
    const response = await fetch(`http://localhost:8000/users?name=${name}`);
    const data = await response.json();
    console.log(data.length);
    return data.length > 0; // Geeft true terug als er gebruikers zijn gevonden met dezelfde naam
  } catch (error) {
    return false;
  }
};

const getCategoryId = async (checkCategoryName) => {
  const catRes = await fetch(
    `http://localhost:8000/categories?name=${checkCategoryName}`
  );
  const cat = await catRes.json();
  // const categoryId = cat[0].id;
  console.log(cat[0].id);
  return cat[0].id;
};

export { checkCategoryExists, checkUserExists, getCategoryId };
