import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api.js";
import { Link } from "react-router";
import ProductCount from "../components/ProductCount.jsx";
import QUERY_KEYS from "../contants/query-keys.js";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: getProducts,
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
      <ProductCount />
      <hr />
      {data.results.map((data) => (
        <div key={data.id}>
          <Link to={`/products/${data.id}`}>
            {data.id}. {data.name}
          </Link>
        </div>
      ))}
    </main>
  );
}

export default Home;
