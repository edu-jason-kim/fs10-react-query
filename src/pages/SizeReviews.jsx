import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../contants/query-keys";
import { getProducts } from "../api";
import { useState } from "react";
import SizeReviews from "../components/SizeReivews";
import useSizeReviewsQuery from "../queries/sizeReviews";

function SizeReviewsPage() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: getProducts,
  });
  const { data: reviews } = useSizeReviewsQuery(selectedProductId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <main>
      <h1>사이즈 리뷰 페이지 입니다.</h1>
      <hr />
      {data.results.map((data) => (
        <div key={data.id}>
          <button onClick={() => setSelectedProductId(data.id)}>
            {data.id}. {data.name}
          </button>
        </div>
      ))}
      <hr />
      <SizeReviews reviews={reviews} />
    </main>
  );
}

export default SizeReviewsPage;
