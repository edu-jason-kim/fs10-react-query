import { Link } from "react-router";
import PostCount from "../components/PostCount";

function About() {
  return (
    <main>
      <h1>어바웃 페이지 입니다.</h1>
      <Link to="/">Main으로 이동 </Link>;
      <hr />
      <PostCount />
      <hr />
    </main>
  );
}

export default About;
