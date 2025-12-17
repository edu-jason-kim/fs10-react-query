import { useQuery } from "@tanstack/react-query";
import { getSizeReviews } from "../api";
import QUERY_KEYS from "../contants/query-keys";

function useSizeReviewsQuery(productId) {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.SIZE_REVIEWS, productId],
    queryFn: () => getSizeReviews(productId),
  });

  return { data, isPending, error };
}

export default useSizeReviewsQuery;
