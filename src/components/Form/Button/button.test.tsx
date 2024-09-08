import { render, screen } from "@/mocks/test-utils";
import { server } from "@/mocks/server";
import { userEvent } from "@testing-library/user-event";
import { Button } from ".";

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

it("Should render the button and simulate a click", async () => {
  render(<Button placeholder="Click me" />, {});

  const user = userEvent.setup();

  expect(screen.getByText(/Click me/i)).toBeInTheDocument();

  await user.click(screen.getByText(/Click me/i));
});

it("Should render the button as disabled and prevent clicks", async () => {
  render(<Button placeholder="Click me" disabled={true} />, {});

  const user = userEvent.setup();

  expect(screen.getByText(/Click me/i)).toBeInTheDocument();

  await user.click(screen.getByText(/Click me/i));

  expect(pushMock).not.toHaveBeenCalled();

  expect(screen.getByText(/Click me/i)).toBeDisabled();
});
