export const AllDataLoader = async () => {
  const eventRes = await fetch(`http://localhost:8000/events`);

  if (!eventRes.ok) {
    throw new Error(`HTTP error! status: ${eventRes.status}`);
  }

  const events = await eventRes.json();

  const userRes = await fetch(`http://localhost:8000/users`);

  if (!userRes.ok) {
    throw new Error(`HTTP error! status: ${userRes.status}`);
  }

  const users = await userRes.json();

  const categoryRes = await fetch(`http://localhost:8000/categories`);

  if (!categoryRes.ok) {
    throw new Error(`HTTP error! status: ${categoryRes.status}`);
  }
  const categories = await categoryRes.json();

  return { events, categories, users };
};
