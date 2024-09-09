import { render, screen } from "@/mocks/test-utils";
import { server } from "@/mocks/server";
import { userEvent } from "@testing-library/user-event";
import Search from "../src/components/Search";

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: pushMock,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return {
      get: jest.fn(),
    };
  },
  usePathname: jest.fn(),
}));

it("Should render the search component and allow user interaction", async () => {
  render(<Search />, {});

  const user = userEvent.setup();

  expect(screen.getByRole("textbox", { name: /input/i })).toBeInTheDocument();

  user.type(screen.getByRole("textbox", { name: /input/i }), "Sony");

  expect(screen.getByTestId("search-button")).toBeInTheDocument();

  user.click(screen.getByTestId("search-button"));
});
