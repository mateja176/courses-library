// @ts-ignore
import { Server } from 'miragejs';
import { Authors } from './App';
import * as faker from 'faker';
import { range } from 'ramda';

const min = 0;

const authors: Authors = range(
  min,
  faker.random.number({ min: min, max: 20 }),
).map(() => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  age: faker.random.number({ min: 5, max: 120 }),
  mainCategory: faker.random.arrayElement(['Rum', 'Maps', 'Singing', 'Ships']),
}));

export function makeServer() {
  const server = new Server({
    routes() {
      this.namespace = 'api';

      this.get('/authors', () => authors);
    },
  });

  return server;
}
