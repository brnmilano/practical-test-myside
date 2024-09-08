import Home from ".";
import { render, screen } from "@/mocks/test-utils";
import { server } from "@/mocks/server";
import { userEvent } from "@testing-library/user-event";

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

it("Should render products", async () => {
  render(
    <Home
      products={[
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
        {
          id: 2,
          title: "Microsoft Xbox",
          price: 57,
          category: "gaming",
          description:
            "Experience the modernized design of the Xbox wireless controller in robot white, featuring sculpted surfaces and refined Geometry for enhanced comfort and effortless control during gameplay\\r\\nStay on target with textured grip on the triggers, bumpers, and back case and with a new hybrid D-pad for accurate, yet familiar input\\r\\nMake the controller your own by customizing button Mapping with the Xbox accessories app",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg",
          brand: "microsoft",
          color: "white",
          discount: 10,
          model: "Xbox X/S",
        },
        {
          id: 3,
          title: "Logitech G733",
          price: 384,
          category: "gaming",
          description:
            "Total freedom with up to 20 m wireless range and LIGHTSPEED wireless audio transmission. Keep playing for up to 29 hours of battery life. 1 Play in stereo on PlayStation(R) 4.\\r\\nPersonalize your headset lighting across the full spectrum, 16. 8M colors. Play in colors with front-facing, dual-zone LIGHTSYNC RGB lighting and choose from preset animations or create your own with G HUB software.\\r\\nColorful, reversible suspension headbands are designed for comfort during long play sessions.\\r\\nAdvanced mic filters that make your voice sound richer, cleaner, and more professional. Customize with G HUB and find your sound.\\r\\nHear every audio cue with breathtaking clarity and get immerse in your game. PRO-G drivers are designed to significantly reduce distortion and reproduce precise, consistent, rich sound quality.\\r\\nSoft dual-layer memory foam that conforms to your head and reduces stress points for long-lasting comfort.\\r\\nG733 weighs only 278 g for long-lasting comfort.",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech heaphone.jpg",
          brand: "Wuqioei",
          color: "black+white",
          discount: 10,
          model: "Wuqioei",
        },
      ]}
    />,
    {}
  );

  const user = userEvent.setup();

  expect(
    screen.getByRole("heading", {
      name: /sony wh 1000xm3/i,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByTestId("1 0"));

  expect(pushMock).toHaveBeenCalledWith("/product/1");
});
