import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  subscription: {
    product: {
      name: string;
    };
    priceId: string;
    amount: number;
  };
}

export default function Home({ subscription }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {subscription.amount} month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const product_subscription = await stripe.prices.retrieve(
    "price_1KSm0vHowNYbIhfmOCcQUKQ6",
    {
      expand: ["product"],
    }
  );

  const subscription = {
    product: product_subscription.product,
    priceId: product_subscription.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product_subscription.unit_amount / 100),
  };

  return {
    props: {
      subscription,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
