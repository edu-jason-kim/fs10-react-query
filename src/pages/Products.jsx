import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProductsPaginated } from "../api.js";
import ProductCount from "../components/ProductCount.jsx";
import QUERY_KEYS from "../contants/query-keys.js";

const LIMIT = 3;

function ProductsPage() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, { page }],
    queryFn: () => getProductsPaginated(page, LIMIT),
    placeholderData: keepPreviousData,
  });

  const hasMore = data?.next !== null;

  // prefetch: 다음페이지가 있으면, 미리 fetch 해둔다.
  useEffect(() => {
    if (hasMore) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.PRODUCTS, { page: page + 1 }],
        queryFn: () => getProductsPaginated(page + 1, LIMIT),
      });
    }
  }, [hasMore, page, queryClient]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const totalPages = Math.ceil(data.count / LIMIT);

  return (
    <main>
      <h1>프로덕트 페이지 입니다.</h1>
      <ProductCount />
      <hr />

      <section style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
        {data.results.map((data) => (
          <div key={data.id}>
            <Link to={`/products/${data.id}`}>
              {data.id}. {data.name}
            </Link>
          </div>
        ))}
      </section>

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
