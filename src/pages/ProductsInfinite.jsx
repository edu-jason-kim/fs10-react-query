import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getProductsPaginated } from "../api.js";
import ProductCount from "../components/ProductCount.jsx";
import QUERY_KEYS from "../contants/query-keys.js";

const LIMIT = 2;

function ProductsInfinitePage() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, "infinite"],
      queryFn: ({ pageParam }) => getProductsPaginated(pageParam, LIMIT),
      initialPageParam: 0,
      // 다음 페이지 번호를 반환하는 함수: 이게 있어야 다음 페이지 불러올 수 있음
      // lastPage: 마지막으로 불러온 page data
      // allPages: 지금까지 불러온 모든 page data들
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.next) {
          return allPages.length; // => 현재페이지 + 1
        }
      },
    });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const allProducts = data.pages.flatMap((page) => page.results);

  return (
    <main>
      <h1>프로덕트 무한스크롤 페이지 입니다.</h1>
      <ProductCount />
      <hr />
      {allProducts.map((data) => (
        <div key={data.id}>
          <Link to={`/products/${data.id}`}>
            {data.id}. {data.name}
          </Link>
        </div>
      ))}
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        다음 페이지 로딩
      </button>
    </main>
  );
}

export default ProductsInfinitePage;
