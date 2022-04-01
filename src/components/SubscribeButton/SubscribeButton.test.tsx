import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn, useSession } from "next-auth/react";
import { SubscribeButton } from ".";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });
});

it("redirects user to sign in when not authenticated", () => {
  const signInMocked = mocked(signIn);

  const useSessionMocked = mocked(useSession);
  useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

  render(<SubscribeButton />);

  const subscribeButton = screen.getByText("Subscribe Now");

  fireEvent.click(subscribeButton);

  expect(signInMocked).toHaveBeenCalled();
});

it("redirects to posts when user already has a subscribed", () => {
  const useRouterMocked = mocked(useRouter);
  const useSessionMocked = mocked(useSession);
  const pushMock = jest.fn();

  useSessionMocked.mockReturnValueOnce({
    data: {
      user: {
        name: "Joh Doe",
        email: "joh@hotmail.com",
      },
      activeSubscription: {
        id: "123",
      },
      expires: "never",
    },
    status: "authenticated",
  });
  useRouterMocked.mockReturnValueOnce({
    push: pushMock,
  } as any);

  render(<SubscribeButton />);

  const subscribeButton = screen.getByText("Subscribe Now");

  fireEvent.click(subscribeButton);

  //expect(pushMock).toHaveBeenCalled();
  expect(pushMock).toHaveBeenCalledWith("/posts");
});
