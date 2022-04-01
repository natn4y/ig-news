import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril",
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");
jest.mock("next/router");

describe("Posts Preview page", () => {
  const pushMock = jest.fn();
  const useRouterMocked = mocked(useRouter);

  useRouterMocked.mockReturnValueOnce({
    push: pushMock,
  } as any);

  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: {
          id: "123",
        },
        expires: "never",
      },
      status: "authenticated",
    });

    render(<Post post={post} />);
    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Joh Doe",
          email: "joh@hotmail.com",
        },
        expires: "never",
        activeSubscription: "fake-active-subscription",
      },
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValue({
        uid: "my-new-post",
        data: {
          title: [{ text: "My New Post", spans: [] }],
          content: [
            {
              type: "paragraph",
              text: "Post content",
              spans: [],
            },
          ],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "my-new-post",
      },
    } as any);
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My New Post",
            content: "<p>Post content</p>",
            updatedAt: "01 de abril de 2021",
          },
        },
      })
    );
  });
});
