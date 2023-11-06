import React, { useState } from "react";

export const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState("");

  const woman = "https://picsum.photos/id/64/200/300";
  const man = "https://picsum.photos/id/91/200/300";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setUseDefaultImage(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Hier kun je de logica toevoegen om de imageUrl naar de database op te slaan
    // Voor nu loggen we gewoon de imageUrl in de console
    console.log("imageUrl:", imageUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        <label>
          Use Default Image:
          <br />
          <input type="image" name="Default man" value={man} src={man} />
          <input type="image" name="Default woman" value={woman} src={woman} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
