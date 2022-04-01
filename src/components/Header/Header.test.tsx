import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { route: "/" };
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
