import { useEffect } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from "../apis/jsonPlaceHolder";

// Posts들을 가져와서 보여줄 예정
// api 요청에 훅을 가져와서 사용할 것임
const Posts = () => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();

  // 가져온 훅 내부에 axiosFetch를 통해서 데이터를 가져오는 함수를 만들고 이걸 useEffect 에서 작업
  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "/posts"
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/posts",
      requestConfig: {
        data: {
          userId: 9,
          title: "axios post test",
          body: "axios post stuff body"
        }
      }
    });
  };

  return (
    <article>
      <h2>Posts from jsonplaceholder</h2>
      <div>
        <button onClick={getData}>Refetch</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && posts?.length && (
          <ul>
            {posts.map((post, i) => (
              <li key={i}>{`${post.id}, ${post.title}`}</li>
            ))}
          </ul>
        )}
        {!loading && !error && !posts?.length && posts?.data && (
          <p>{`userId: ${posts.data?.userId}, title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>
        )}
        {!loading && !error && !posts && <p>No Posts to display</p>}
      </div>
    </article>
  );
};

export default Posts;
