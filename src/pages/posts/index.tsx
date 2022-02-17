import Head from "next/head";
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
