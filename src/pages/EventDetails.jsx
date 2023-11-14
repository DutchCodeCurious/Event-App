import { Tag } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { UserCard } from "../components/UserCard";

export default function EventDetails() {
  //   const { id } = useParams();
  const { event, user, category } = useLoaderData();

  return (
    <>
      <div className="user-info">
        <h2>Written by: {user.name}</h2>
        <img src={user.image} alt={user.name} />
      </div>
      <div className="event-details">
        <h2>Event Details of: {event.title}</h2>
        <p>{event.description}</p>
        <img src={event.image} alt={event.title} />
        <p>{event.location}</p>
        <p>
          From: {event.startTime}, Until: {event.endTime}{" "}
        </p>
        {category.map((c) => (
          <Tag key={`category-tag-${c.name}`}>{c.name}</Tag>
        ))}
      </div>
    </>
  );
}

export const eventDetailsLoader = async ({ params }) => {
  const { id } = params;
  const eventRes = await fetch(`http://localhost:8000/events/${id}`);

  if (!eventRes.ok) {
    throw new Error(`HTTP error! status: ${eventRes.status}`);
  }

  const event = await eventRes.json();

  const userRes = await fetch(`http://localhost:8000/users/${event.createdBy}`);

  if (!userRes.ok) {
    throw new Error(`HTTP error! status: ${userRes.status}`);
  }

  const user = await userRes.json();
  const categoryPromises = event.categoryIds.map((categoryId) =>
    fetch(`http://localhost:8000/categories/${categoryId}`)
  );

  const categoryRes = await Promise.all(categoryPromises);

  categoryRes.forEach((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  });

  const category = await Promise.all(
    categoryRes.map((response) => response.json())
  );

  return { event, user, category };
};
