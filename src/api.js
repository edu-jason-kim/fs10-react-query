const BASE_URL = "https://learn.codeit.kr/api/codeitmall";

// 전체 게시글 fetch
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

// 특정 게시글 fetch
export async function getProduct(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);
  return response.json();
}
