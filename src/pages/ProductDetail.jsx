import { Link, useParams } from "react-router";
import SizeReviews from "../components/SizeReivews";
import useProductDetailQuery from "../queries/productDetail";
import useSizeReviewsQuery from "../queries/sizeReviews";

// /products/:id
function ProductDetailPage() {
  const { productId } = useParams();

  const { data, isPending, error } = useProductDetailQuery(productId);
  const { data: reviews } = useSizeReviewsQuery(productId);

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <main>
      <h1>Product Detail 페이지</h1>
      <Link to="/">← 목록으로</Link>
      <hr />
      <article>
        <h1>{data.name}</h1>
        <img src={data.imgUrl} alt={data.name} width={300} height={300} />
      </article>
      <hr />
      <h2>사이즈 리뷰 목록</h2>
      <SizeReviews reviews={reviews} />
    </main>
  );
}

export default ProductDetailPage;
