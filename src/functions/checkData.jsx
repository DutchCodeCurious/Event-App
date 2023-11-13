const checkCategoryExists = async (categoryName) => {
  try {
    const response = await fetch(
      `http://localhost:8000/categories?name=${categoryName}`
    );
    const data = await response.json();
    console.log(data[0].id);
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

const updateCategories = async (cat) => {
  const catRes = await checkCategoryExists(cat);
  console.log(cat);
  console.log(catRes);
  if (!catRes) {
    try {
      const response = await fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ name: cat }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newCategory = await response.json();
      return newCategory.id;
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
    }
    if (catRes) {
      return getCategoryId(cat);
    }
  }
};
{
  /** 
const updateCategoryId = async () => {
  let newCategoryIds = [];
  for (const name of categoryName) {
    const categoryExists = await checkCategoryExists(name);
    if (!categoryExists) {
      try {
        const response = await fetch(`http://localhost:8000/categories`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newCategory = await response.json();
        newCategoryIds.push(newCategory.id);
      } catch (error) {
        console.log("A problem occurred with your fetch operation: ", error);
      }
    }
  }
  setCategoryId(newCategoryIds);
};

useEffect(() => {
  if (categoryName && categoryName.length > 0) {
    updateCategoryId();
  }
}, [categoryName]);
*/
}

export {
  checkCategoryExists,
  checkUserExists,
  getCategoryId,
  updateCategories,
};
