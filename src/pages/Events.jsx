import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { eventsLoader } from "../layouts/EventListLayout";
import { Tag } from "@chakra-ui/react";
import { EventPrev } from "../components/EventPrev";

export default function Events() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await eventsLoader();
      const newCats = await catLoader();
      setData(newData);
      setFilteredData(newData);
      setIsLoading(false);
      setCats(newCats);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(results);
  }, [searchTerm]);

  useEffect(() => {
    const results = data.filter((event) =>
      event.categoryIds.includes(searchTag)
    );
    setFilteredData(results);
  }, [searchTag]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagSearch = (id) => {
    setSearchTag(id);
  };

  return (
    <div className="events-page">
      <div className="search-balk">
        <input
          id="events-Search"
          type="search"
          onInput={handleSearchChange}
          placeholder="Search..."
        />
        <div className="tags">
          {cats.map((cat) => (
            <Tag
              onClick={() => handleTagSearch(cat.id)}
              key={cat.id}
              className="tag"
            >
              {cat.name}
            </Tag>
          ))}
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="events">
          <ul>
            {filteredData.map((event) => (
              <li className="eventList" key={event.id}>
                <Link className="event" to={event.id.toString()} key={event.id}>
                  <EventPrev
                    cats={cats
                      .filter((cat) => event.categoryIds.includes(cat.id))
                      .map((cat) => cat.name)}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    image={event.image}
                    start={event.startTime}
                    end={event.endTime}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

//data loader

export const catLoader = async () => {
  const res = await fetch("http://localhost:8000/categories");

  if (!res.ok) {
    throw Error("Could not fetch the list of events");
  }
  return res.json();
};
