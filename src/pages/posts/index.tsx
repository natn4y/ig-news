import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>01/05/1987</time>
            <strong>title</strong>
            <p>In the asdas kokd nnr mcikgmvir kdifmi mids</p>
          </a>
          <a href="">
            <time>01/05/1987</time>
            <strong>title</strong>
            <p>In the asdas kokd nnr mcikgmvir kdifmi mids</p>
          </a>
          <a href="">
            <time>01/05/1987</time>
            <strong>title</strong>
            <p>In the asdas kokd nnr mcikgmvir kdifmi mids</p>
          </a>
        </div>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType("posts", {
    fetch: ["post.title", "post.content"],
    pageSize: 100,
  });

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
};
