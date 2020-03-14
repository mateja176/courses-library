import { useMachine } from '@xstate/react';
import React from 'react';
import './App.css';
import { fetchMachine, fetchOptions } from './machines';

export interface Author {
  id: string;
  name: string;
  age: number;
  mainCategory: string;
}
export type Authors = Author[];

function App() {
  const [state, send] = useMachine(fetchMachine, fetchOptions);

  return (
    <div>
      <h1>Authors</h1>
      {state.value === 'initial' && (
        <button
          onClick={() => {
            send({ type: 'FETCH' });
          }}
        >
          Fetch
        </button>
      )}
      {state.value === 'failure' && (
        <div>
          <p>{state.context.error}</p>
          <button
            onClick={() => {
              send({ type: 'RETRY' });
            }}
          >
            Retry
          </button>
        </div>
      )}
      {state.value === 'loading' && <div>Loading...</div>}
      <ol>
        {state.context.data.map(({ id, name, age, mainCategory }) => (
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
