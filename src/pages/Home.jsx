import useFetch from "../useFetch";
import { CleanerForm } from "../components/CleanerForm";
import Form from "../components/CopieForm";
export default function Home() {
  const { data: events } = useFetch("http://localhost:8000/events");
  const { data: users } = useFetch("http://localhost:8000/users");
  const { data: categories } = useFetch("http://localhost:8000/categories");

  return (
    <div className="home">
      <h2>Welcome</h2>
      {/** 
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, alias?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, alias?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, alias?
      </p>
      */}
      <Form />
    </div>
  );
}
