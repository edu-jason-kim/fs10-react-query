import { Link } from "react-router";
import ProductCount from "../components/ProductCount";

function About() {
  return (
    <main>
      <h1>어바웃 페이지 입니다.</h1>
      <Link to="/">Main으로 이동 </Link>;
      <hr />
      <ProductCount />
      <hr />
    </main>
  );
}

export default About;
