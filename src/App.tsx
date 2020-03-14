import React from 'react';
import './App.css';
import { origin } from './models/origin';

export interface Author {
  id: string;
  name: string;
  age: number;
  mainCategory: string;
}
export type Authors = Author[];

function App() {
  const [authors, setAuthors] = React.useState<Authors>([]);

  React.useEffect(() => {
    fetch(`${origin}/api/authors`)
      .then(res => res.json())
      .then(setAuthors);
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      <ol>
        {authors.map(({ id, name, age, mainCategory }) => (
          <li key={id}>
            <h2>
              {name}, {age}
            </h2>
            <p>{mainCategory}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
