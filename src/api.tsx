import { request, ClientError, gql, GraphQLClient } from 'graphql-request';
import { useEffect } from 'react';
interface ApiProps {
  title?: string;
  director?: string;
  releaseDate?: string;
}
const Api: React.FC<ApiProps> = ({}) => {
  const query = gql`
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
  `;
  const filmMovie = async () => {
    const graphQLClient = new GraphQLClient(
      'https://swapi-graphql.netlify.app/.netlify/functions/index'
    );
    try {
      const data = await graphQLClient.request(query);
      console.log('console log didalam ', data);
      return await data;
    } catch (error) {
      console.log(error);
    }
  };
  const movie = async () => {
    return await filmMovie();
  };
  console.log('console log dilauar', movie);
  useEffect(() => {}, [filmMovie]);

  // request(
  //   'https://swapi-graphql.netlify.app/.netlify/functions/index',
  //   query
  // ).then((data) => console.log(data));

  return <div>ss</div>;
};

export default Api;
