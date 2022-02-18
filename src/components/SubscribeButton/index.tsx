import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const { data: session } = useSession();
  const route = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      if (session?.activeSubscription) {
        route.push("/posts");
        return;
      }
      const response = await api.post("/create_checkout_session");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
