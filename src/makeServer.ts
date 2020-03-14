// @ts-ignore
import { Server } from 'miragejs';
import { Authors } from './App';

const authors: Authors = [
  {
    id: '5b3621c0-7b12-4e80-9c8b-3398cba7ee05',
    name: 'Seabury Toxic Reyson',
    age: 329,
    mainCategory: 'Maps',
  },
  {
    id: '2ee49fe3-edf2-4f91-8409-3eb25ce6ca51',
    name: 'Atherton Crow Ridley',
    age: 298,
    mainCategory: 'Rum',
  },
];

export function makeServer() {
  const server = new Server({
    routes() {
      this.namespace = 'api';

      this.get('/authors', () => authors);
    },
  });

  return server;
}
