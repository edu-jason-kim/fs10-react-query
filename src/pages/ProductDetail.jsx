import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getProduct } from "../api";

// /products/:id
function ProductDetailPage() {
  const { productId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });

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
