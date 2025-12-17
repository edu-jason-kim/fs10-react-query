function SizeReviews({ reviews }) {
  return (
    <>
      {reviews?.results?.length > 0 ? (
        <ul>
          {reviews.results.map((review) => (
            <li key={review.id}>
              {review.sex === "male" ? "남성" : "여성"} / {review.height}cm /{" "}
              {review.weight}kg / 사이즈 {review.size} /
              {review.fit === "small"
                ? "작음"
                : review.fit === "good"
                ? "적당함"
                : "큼"}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 리뷰가 없습니다.</p>
      )}
    </>
  );
}

export default SizeReviews;
