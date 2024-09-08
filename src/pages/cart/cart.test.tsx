import { render, screen } from "@/mocks/test-utils";
import { server } from "@/mocks/server";
import { userEvent } from "@testing-library/user-event";
import Checkout from ".";

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
      route: "/cart",
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

it("Should render the cart page", async () => {
  render(<Checkout />, {});

  const user = userEvent.setup();

  // Elementos do componente AddressForm
  expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Número/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Complemento/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Bairro/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/UF/i)).toBeInTheDocument();

  user.type(screen.getByLabelText(/CEP/i), "12345678");
  user.type(screen.getByLabelText(/Rua/i), "Rua Teste");
  user.type(screen.getByLabelText(/Número/i), "123");
  user.type(screen.getByLabelText(/Complemento/i), "Apto 1");
  user.type(screen.getByLabelText(/Bairro/i), "Bairro Teste");
  user.type(screen.getByLabelText(/Cidade/i), "Cidade Teste");
  user.type(screen.getByLabelText(/UF/i), "SP");

  // Elementos do componente FinishOrder
  expect(
    screen.getByRole("heading", { name: /finalize seu pedido/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: /seu carrinho está vazio/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /confirmar pedido/i })
  ).toBeInTheDocument();

  const removeItemName = "remover";

  expect(screen.queryByText(removeItemName)).not.toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /confirmar pedido/i,
    })
  ).toBeInTheDocument();
});
