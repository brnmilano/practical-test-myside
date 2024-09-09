import { render, screen } from "@/mocks/test-utils";
import { server } from "@/mocks/server";
import ViewProduct from "../src/pages/product/[id]";
import { Product } from "@/types/products";
import userEvent from "@testing-library/user-event";

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

const pushMock = jest.fn();
const addToCartMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/product/1",
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

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Sony WH 1000XM3",
    price: 773,
    category: "audio",
    description:
      "Digital noise cancelling : Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation\\r\\nHi-Res Audio : A built-in amplifier integrated in HD Noise Cancelling Processor QN1 realises the best-in-class signal-to-noise ratio and low distortion for portable devices.\\r\\nDriver Unit : Powerful 40-mm drivers with Liquid Crystal Polymer (LCP) diaphragms make the headphones perfect for handling heavy beats and can reproduce a full range of frequencies up to 40 kHz.\\r\\nVoice assistant : Alexa enabled (In-built) for voice access to music, information and more. Activate with a simple touch. Frequency response: 4 Hz-40,000 Hz",
    image:
      "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
    brand: "sony",
    color: "silver",
    discount: 10,
    model: "WH-1000XM3",
  },
];

it("Should render the product details screen and allow user interaction", async () => {
  render(<ViewProduct productDetails={mockProducts[0]} />, {});

  const user = userEvent.setup();

  expect(
    screen.getByRole("heading", {
      name: /sony wh 1000xm3/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /adicionar ao carrinho/i })
  ).toBeInTheDocument();

  user.click(screen.getByRole("button", { name: /adicionar ao carrinho/i }));

  expect(addToCartMock).toHaveBeenCalledTimes(0);
});
