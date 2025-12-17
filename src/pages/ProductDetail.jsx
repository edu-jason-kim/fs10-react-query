import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { createSizeReview } from "../api";
import SizeReviews from "../components/SizeReivews";
import useProductDetailQuery from "../queries/productDetail";
import useSizeReviewsQuery from "../queries/sizeReviews";
import { useState } from "react";
import QUERY_KEYS from "../contants/query-keys";

// /products/:id
function ProductDetailPage() {
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    size: "M",
    sex: "male",
    height: "",
    fit: "good",
  });
  // 모든 캐시를 관리하는 queryClient 호출
  const queryClient = useQueryClient();

  const { data, isPending, error } = useProductDetailQuery(productId);
  const { data: reviews } = useSizeReviewsQuery(productId);

  const createReviewMutation = useMutation({
    mutationFn: (reviewData) => createSizeReview(reviewData),
    // mutation이 성공하면 실행하는 함수
    onSuccess: () => {
      // review에 대한 query를 무효화 -> review query가 refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SIZE_REVIEWS, productId],
      });
    },
    onError: () => {
      // 에러 발생 시 처리할 로직: ex) toast ui 표시
    },
    onSettled: () => {
      // 성공/실패 여부와 상관없이, 요청이 끝나면 실행하는 함수
    },
  });

  // 입력 변경될 때
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출될 때
  const handleSubmit = (e) => {
    e.preventDefault();
    createReviewMutation.mutate({
      ...formData,
      productId: Number(productId),
      height: Number(formData.height),
    });
  };

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
      <h2>사이즈 리뷰 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>
          사이즈:
          <select name="size" value={formData.size} onChange={handleChange}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <br />
        <label>
          성별:
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>
        <br />
        <label>
          키(cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          핏:
          <select name="fit" value={formData.fit} onChange={handleChange}>
            <option value="small">작음</option>
            <option value="good">적당함</option>
            <option value="big">큼</option>
          </select>
        </label>
        <br />
        <button type="submit">리뷰 작성</button>
      </form>

      <hr />
      <h2>사이즈 리뷰 목록</h2>
      <SizeReviews reviews={reviews} />
    </main>
  );
}

export default ProductDetailPage;
