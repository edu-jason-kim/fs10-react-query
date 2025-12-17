import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api.js";

function ProductCount() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 30 * 1000,
    gcTime: 60 * 10 * 1000,
  });

  const count = data?.results.length ?? 0;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return <p>총 게시글 수: {count}개</p>;
}

export default ProductCount;
