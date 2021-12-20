import React, { ReactElement } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "./app/store";
import { increment } from "./features/counter/counterSlice";
import { fetchBreeds } from "./features/dog/dogSlices";

interface Props {}

/*const data = [
  ["Alexis", "09842453", "G Sanabria 3525", "Montevideo", "1/3/1991"],
  ["Jorge", "09842453", "C Ma Ramirez 2151", "Montevideo", "1/3/1991"],
  ["Valeria", "09842453", "Bulgaria 4512", "Montevideo", "1/3/1991"],
  ["Fernando", "09842453", "Pedro Berro 3525", "Montevideo", "1/3/1991"],
]; */

let timeout: NodeJS.Timeout;

export default function App({}: Props): ReactElement {
  const count = useAppSelector((state) => state.counter.value);
  const { messages, breeds, error, loading } = useAppSelector(
    (state) => state.dog
  );
  const [fetchNumber, setFetchNumber] = React.useState(0);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const promise = dispatch(fetchBreeds({}));
    return promise.abort;
  }, [fetchNumber]);

  return (
    <div>
      Current: {count}
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <button onClick={() => setFetchNumber(fetchNumber + 1)}>Refetch</button>
      {messages.map((message) => (
        <div key={message} style={{ color: "green" }}>
          {message}
        </div>
      ))}
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {error ? (
            `Error: ${error}`
          ) : (
            <div>
              {breeds.map((breed) => (
                <div key={breed.name}>
                  <h1>{breed.name}</h1>
                  <img src={breed.image.url} style={{ width: "40vw" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
