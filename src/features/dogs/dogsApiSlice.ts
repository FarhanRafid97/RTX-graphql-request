import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DOG_API_KEY = '4803c26f-42fe-4538-b13d-9bdce59493d0';

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOG_API_KEY);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreed: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedQuery } = apiSlice;
