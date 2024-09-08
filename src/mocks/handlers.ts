import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://fakestoreapi.in/api/products", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      status: "SUCCESS",
      message: "Here you go! You've received...",
      products: [
        {
          id: 1,
          title:
            "Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones, 8 Mics for Clear Calling, 30Hr Battery, 3 Min Quick Charge = 3 Hours Playback, Multi Point Connectivity, Alexa-Silver",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg",
          price: 362,
          description:
            "Industry Leading noise cancellation-two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise cancelling is automatically optimized based on your wearing conditions and environment.\r\n" +
            "Industry-leading call quality with our Precise Voice Pickup Technology uses four beamforming microphones and an AI-based noise reduction algorithm\r\n" +
            "Magnificent Sound, engineered to perfection with the new Integrated Processor V1\r\n" +
            "Crystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.",
          brand: "song",
          model: "WH1000XM5/SMIN",
          color: "white",
          category: "audio",
          popular: true,
          discount: 11,
        },
        {
          id: 2,
          title:
            "Urbanista Los Angeles Sand Gold - World’s 1st Solar Powered Hybrid Active Noise Cancelling with Mic Premium Wireless Headphones, Unlimited Playtime",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056487173-headphon2.jpg",
          price: 265,
          description:
            "Welcome to the dawn of a new era with URBANISTA LOS ANGELES, the world’s first solar-charging premium wireless headphoneS powered by Powerfoyle solar cell material. Using ADVANCED GREEN TECHNOLOGY, Los Angeles converts all light, outdoor and indoor, into energy to deliver virtually infinite playtime. Los Angeles never stops charging when exposed to light, providing you with a nonstop audio experience. With Los Angeles, you’re always in complete control of your audio experience. Just the press of a button activates advanced hybrid Active Noise Cancelling, instantly reducing unwanted background noise, or switches on Ambient Sound Mode so you can stay aware of important surrounding sounds.",
          brand: "urbanista",
          model: "Los Angeles",
          color: "sand gold",
          category: "audio",
          popular: true,
          discount: 19,
        },
        {
          id: 3,
          title:
            "Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg",
          price: 5,
          description:
            "Ergonomically angled to fit perfectly in your ear canal that provides long lasting comfort for every day usage.\r\n" +
            "Features 1.25 meter long cable & L-shaped 3.5mm jack to connect with your phone. Due to the L-shape, the connector will deliver a strong & durable life. Earphones are compatible with Android, iOS & Windows devices with jack.\r\n" +
            "Powerful 10 mm drivers & aluminum sound chamber for super extra bass and clear sound for the best music & calling experience.\r\n" +
            "High-quality silicone earbuds, which are gentle on skin without compromising the comfortable fit on the ears.\r\n" +
            "In-line microphone with a durable multi-function button to play/pause your music, and answer/end your calls, all with just one tap.",
          brand: "xiaomi",
          model: "Mi Earphones Basic Blue",
          color: "Blue",
          category: "audio",
        },
        {
          id: 4,
          title:
            "boAt Rockerz 370 On Ear Bluetooth Headphones with Upto 12 Hours Playtime, Cozy Padded Earcups and Bluetooth v5.0, with Mic (Buoyant Black)",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057718636-headphone5.jpg",
          price: 12,
          description:
            "Rockerz 370 come equipped with latest Bluetooth v5.0 for instant wireless connectivity\r\n" +
            "The powerful 300mAh battery provides up to 8 Hours of audio bliss\r\n" +
            "40mm Dynamic Drivers supply immersive High Definition sound\r\n" +
            "The headset has padded earcups for a comfortable experience\r\n" +
            "The headphone has been ergonomically and aesthetically designed for a seamless experience\r\n" +
            "One can connect to Rockerz 370 via dual modes for connectivity in the form of Bluetooth and AUX\r\n" +
            "1 year warranty from the date of purchase.",
          brand: "boat",
          model: "Rockerz 370",
          color: "Black",
          category: "audio",
        },
        {
          id: 5,
          title: "Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)",
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691073671025-galaxy S21 FE.jpg",
          price: 434,
          description:
            "Pro-grade Camera with AI Single Take, Portrait Mode, Night Mode and 30X Space zoom. Dual Recording: Film in both wide and selfie angles at the same time | 12MP F1.8 Main Camera (Dual Pixel AF & OIS) + 12MP UltraWide Camera (123° FOV) + 8MP Telephoto Camera (3x Optic Zoom, 30X Space Zoom, OIS) | 32 MP F2.2 Front Camera.\r\n" +
            "16.28cm (6.4-inch) Dynamic AMOLED 2X Display with120Hz Refresh rate for Smooth scrolling. Intelligent Eye Comfort Shield, New 19.5:9 Screen Ratio with thinner bezel, 1080x2340 (FHD+) Resolution.\r\n" +
            "5G Ready with Octa-core Exynos 2100 (5nm) Processor. Android 12 operating system. Dual Sim.\r\n" +
            "Iconic Contour Cut Design with 7.9 mm thickness. Gorilla Glass Victus and IP68 Water Resistant .",
          brand: "samsung",
          model: "Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)",
          color: "Lavender",
          category: "mobile",
          discount: 9,
          onSale: true,
        },
      ],
    });
  }),
  http.get("https://fakestoreapi.in/api/products/2", ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      status: "SUCCESS",
      message: "Here you've a single product requested for id 2",
      product: {
        id: id,
        title:
          "Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones, 8 Mics for Clear Calling, 30Hr Battery, 3 Min Quick Charge = 3 Hours Playback, Multi Point Connectivity, Alexa-Silver",
        image:
          "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg",
        price: 362,
        description:
          "Industry Leading noise cancellation-two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise cancelling is automatically optimized based on your wearing conditions and environment.\r\n" +
          "Industry-leading call quality with our Precise Voice Pickup Technology uses four beamforming microphones and an AI-based noise reduction algorithm\r\n" +
          "Magnificent Sound, engineered to perfection with the new Integrated Processor V1\r\n" +
          "Crystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.",
        brand: "song",
        model: "WH1000XM5/SMIN",
        color: "white",
        category: "audio",
        popular: true,
        discount: 11,
      },
    });
  }),
];
