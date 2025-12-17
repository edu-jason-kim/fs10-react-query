import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { getProductsPaginated } from "../api.js";
import ProductCount from "../components/ProductCount.jsx";
import QUERY_KEYS from "../contants/query-keys.js";

const LIMIT = 3;

function ProductsPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, { page }],
    queryFn: () => getProductsPaginated(page, LIMIT),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const totalPages = Math.ceil(data.count / LIMIT);
  const hasMore = data.next !== null;

  return (
    <main>
      <h1>프로덕트 페이지 입니다.</h1>
      <ProductCount />
      <hr />
      {data.results.map((data) => (
        <div key={data.id}>
          <Link to={`/products/${data.id}`}>
            {data.id}. {data.name}
          </Link>
        </div>
      ))}
      <button disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
        이전
      </button>
      <span>
        {page + 1} / {totalPages}
      </span>
      <button disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)}>
        다음
      </button>
    </main>
  );
}

export default ProductsPage;
