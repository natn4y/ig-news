import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("render correctly", () => {
    render(
      <Home
        subscription={{
          name: "Product 1",
          priceId: "fake-price-id",
          amount: "R$\xa010,00",
        }}
      />
    );
    expect(screen.getByText(/.* R\$* 10,00.*/i)).toBeInTheDocument();
  });

  it("load initial data", async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve);
    retriveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          subscription: {
            priceId: "fake-price-id",
            amount: "R$10.00",
          },
        },
      })
    );
  });
});
