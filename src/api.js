const BASE_URL = "https://learn.codeit.kr/api/codeitmall";

// 전체 상품 fetch
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

// 특정 상품 fetch
export async function getProduct(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);
  return response.json();
}

// 사이즈 리뷰 목록 가져오기
export async function getSizeReviews(productId) {
  const response = await fetch(
    `${BASE_URL}/size_reviews?product_id=${productId}`
  );
  return response.json();
}

// 사이즈 리뷰 생성
export async function createSizeReview(reviewData) {
  const response = await fetch(`${BASE_URL}/size_reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error("리뷰 작성에 실패했습니다.");
  }

  return response.json();
}
