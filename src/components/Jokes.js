import useAxios from "../hooks/useAxios";
import axios from "../apis/dadJokes";

const Jokes = () => {
  const axiosConfig = {
    axiosInstance: axios,
    method: "GET",
    url: "/",
    requestConfig: {
      headers: {
        "Content-Language": "en-US"
      }
    }
  };

  const [joke, error, loading, refetch] = useAxios(axiosConfig);

  // console.log("joke", joke);
  return (
    <article>
      <h2>Random Dad Jokes</h2>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && joke && <p>{joke?.joke}</p>}
      {!loading && !error && !joke && <p>No dad joke to display</p>}
      <button onClick={() => refetch()}>Get Joke</button>
    </article>
  );
};

export default Jokes;
