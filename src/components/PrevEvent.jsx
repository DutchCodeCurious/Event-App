export const PrevEvent = ({ title, description, image }) => {
  return (
    <div className="prevEvent">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
