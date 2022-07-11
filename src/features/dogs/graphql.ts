import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { DocumentNode } from 'graphql';
import { ClientError, gql, GraphQLClient } from 'graphql-request';

const DOG_API_KEY = '4803c26f-42fe-4538-b13d-9bdce59493d0';

interface AllFilms {
  allFilms: {
    films: {
      title: string;
      director: string;
    }[];
  };
}

const filmMovie = (): BaseQueryFn<
  { document: string | DocumentNode },
  unknown,
  Pick<ClientError, 'message'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> => {
  return async ({ document }) => {
    try {
      const graphQLClient = new GraphQLClient(
        'https://swapi-graphql.netlify.app/.netlify/functions/index'
      );
      return { data: await graphQLClient.request(document) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { message: 'error' } };
      }
      throw error;
    }
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: filmMovie(),
  endpoints: (builder) => ({
    myMovie: builder.query<AllFilms, void>({
      query: () => ({
        document: gql`
          {
            allFilms {
              films {
                title
                director
                releaseDate
                speciesConnection {
                  species {
                    name
                    classification
                    homeworld {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }),
  }),
});

export const { useMyMovieQuery } = apiSlice;
