import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amounted } from './features/counter/counterSlice';
import { useFetchBreedQuery } from './features/dogs/dogsApiSlice';
import Api from './api';
import { useMyMovieQuery } from './features/dogs/graphql';
import { graphqlTest } from './hooks';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [numDog, setNumDog] = useState(10);
  // const { data = [], isFetching } = useFetchBreedQuery(numDog);
  const { data, isFetching } = useMyMovieQuery();
  const movie = data?.allFilms.films;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Api /> */}
        {/* <p>Hello Vite + React!</p> */}
        {/* <p>
          <button type="button" onClick={() => dispatch(amounted(6))}>
            count is: {count}
          </button>
        </p> */}
        <div>
          <select
            value={numDog}
            onChange={(e) => setNumDog(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>{isFetching && <p>Loading...</p>}</div>
        <div>
          <p>how many dog {movie?.length}</p>
          <div style={{ rowGap: '15px' }}>
            {movie?.map((data, i) => (
              <div
                key={i}
                style={{
                  width: '300px',
                  border: '1px solid white',
                  marginBottom: 8,
                }}
              >
                <p>title:{data.title}</p>
                <p>director:{data.director}</p>
              </div>
            ))}
          </div>
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
