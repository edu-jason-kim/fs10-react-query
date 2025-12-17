import { Link, useParams } from "react-router";
import useProductDetailQuery from "../queries/productDetail";

// /products/:id
function ProductDetailPage() {
  const { productId } = useParams();

  const { data, isPending, error } = useProductDetailQuery(productId);

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
    </main>
  );
}

export default ProductDetailPage;
