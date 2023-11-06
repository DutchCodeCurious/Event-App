import { Tag } from "@chakra-ui/react";

export const EventPrev = ({
  id,
  title,
  image,
  description,
  cats,
  start,
  end,
}) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return (
    <div className="event-prev" key={id}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>{description}</p>
      {cats.map((cat) => (
        <Tag key={cat} className="tag">
          {cat}
        </Tag>
      ))}
      <p>
        Start date: {startDate.getDate()}-{startDate.getMonth() + 1}-
        {startDate.getFullYear()}
      </p>
      <p>
        end date: {endDate.getDate()}-{endDate.getMonth() + 1}-
        {endDate.getFullYear()}
      </p>
      <p>
        Starts: {String(startDate.getHours()).padStart(2, "0")}:
        {String(startDate.getMinutes()).padStart(2, "0")}
      </p>
      <p>
        Ends: {String(endDate.getHours()).padStart(2, "0")}:
        {String(endDate.getMinutes()).padStart(2, "0")}
      </p>
    </div>
  );
};
