import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api";
import QUERY_KEYS from "../contants/query-keys";

// Query만 따로 파일로 분리해서 관리하는 방법도 있음
function useProductDetailQuery(productId) {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: ({ queryKey }) => {
      // const productId = queryKey[1];
      const [, productId] = queryKey; // 배열 구조분해
      return getProduct(productId);
    },
  });

  return { data, isPending, error };
}

export default useProductDetailQuery;
