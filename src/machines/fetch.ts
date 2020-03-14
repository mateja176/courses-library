import {
  assign,
  EventObject,
  InterpreterOptions,
  Machine,
  MachineOptions,
  StateConfig,
  StateSchema,
} from 'xstate';
import { Authors } from '../App';

export interface FetchContext {
  data: Authors;
  error: Error | null;
}

export interface FetchStateSchema extends StateSchema {
  states: {
    initial: {};
    loading: {};
    success: {};
    failure: {};
  };
}

export interface Event<Type extends string> extends EventObject {
  type: Type;
}

export interface DataEvent<Type extends string, Data> extends Event<Type> {
  data: Data;
}

export type Fetch = Event<'FETCH'>;

export type FetchSuccess = DataEvent<'SUCCESS', FetchContext['data']>;

export type FetchFailure = DataEvent<'FAILURE', FetchContext['error']>;

export type FetchRetry = Event<'RETRY'>;

export type FetchEvent = Fetch | FetchSuccess | FetchFailure | FetchRetry;

export const fetchMachine = Machine<FetchContext, FetchStateSchema, FetchEvent>(
  {
    id: 'fetch',
    initial: 'initial',
    context: {
      data: [],
      error: null,
    },
    states: {
      initial: {
        on: {
          FETCH: 'loading',
        },
      },
      loading: {
        invoke: {
          src: 'fetchData',
          onDone: {
            target: 'success',
            actions: assign<FetchContext, FetchSuccess>({
              data: (_, event) => event.data,
            }),
          },
          onError: {
            target: 'failure',
            actions: assign<FetchContext, FetchFailure>({
              error: (_, event) => event.data,
            }),
          },
        },
      },
      success: {
        type: 'final',
      },
      failure: {
        on: {
          RETRY: 'loading',
        },
      },
    },
  },
);

export interface UseMachineOptions<TContext, TEvent extends EventObject> {
  /**
   * If provided, will be merged with machine's `context`.
   */
  context?: Partial<TContext>;
  /**
   * If `true`, service will start immediately (before mount).
   */
  immediate: boolean;
  /**
   * The state to rehydrate the machine to. The machine will
   * start at this state instead of its `initialState`.
   */
  state?: StateConfig<TContext, TEvent>;
}

export type MachineHookOptions<Context, Event extends EventObject> = Partial<
  InterpreterOptions
> &
  Partial<UseMachineOptions<Context, Event>> &
  Partial<MachineOptions<Context, Event>>;

export const fetchOptions: MachineHookOptions<FetchContext, FetchEvent> = {
  services: {
    fetchData: () => fetch(`${origin}/api/authors`).then(res => res.json()),
    // fetchData: () => Promise.reject('Mocking a failed fetch'),
  },
  devTools: true,
  logger: console.log,
  execute: true,
};
