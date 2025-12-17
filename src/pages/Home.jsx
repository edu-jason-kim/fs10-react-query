import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api.js";
import { Link } from "react-router";
import PostCount from "../components/PostCount.jsx";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 30 * 1000,
    gcTime: 60 * 10 * 1000,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <main>
      <h1>홈 페이지 입니다.</h1>
      <Link to="/about">About로 이동 </Link>;
      <hr />
      <PostCount />
      <hr />
      {data.results.map((data) => (
        <div key={data.id}>
          {data.id}. {data.content}
        </div>
      ))}
    </main>
  );
}

export default Home;
