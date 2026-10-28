export const BRAND = {
  name: "The Luxe Studio",
  shortName: "Luxe",
  discipline: "Hair · Barbering · Beauty",
  phone: "+1 778-955-1516",
  phoneHref: "tel:+17789551516",
  location: "Surrey, British Columbia, Canada",
  city: "Surrey, BC",
  instagram: "https://www.instagram.com/____theluxestudio/",
  instagramHandle: "@____theluxestudio",
  logo: "https://media.base44.com/images/public/user_6ab2dfa119ab1f0d268bfdbe/688eb1af7_image.png",
};

const MEDIA = "https://media.base44.com/images/public/6ae25596746c7bf57d1c9235";

export const IMAGES = {
  hero: `${MEDIA}/c37ce5eb2_generated_869cdab4.png`,
  hair: `${MEDIA}/404c47a50_generated_f753d3a4.png`,
  barbering: `${MEDIA}/042942275_generated_7ba971ce.png`,
  beauty: `${MEDIA}/e769d5259_generated_a4ae3bd1.png`,
  interior: `${MEDIA}/4b621f28c_generated_6ba7615a.png`,
  fade: `${MEDIA}/e1bfc94d4_generated_5add9ce2.png`,
  glam: `${MEDIA}/67d01ff1d_generated_f0e2e940.png`,
  tools: `${MEDIA}/2b7568de6_generated_1b30b0ff.png`,
  colour: `${MEDIA}/bd9c7844d_generated_de81a7f5.png`,
  chair: `${MEDIA}/b3a7cb59a_generated_7ec5f840.png`,
  sleek: `${MEDIA}/a70292af8_generated_f5a0ce27.png`,
};

export const VIDEOS = [
  { src: "https://media.base44.com/videos/public/user_6ab2dfa119ab1f0d268bfdbe/1cdc9172b_SaveClipApp_AQNDnpmUKD8RWfk20docKcD0oBvfq641OMlNHbWWenyMvqri4r_lhjc8DiMyEhjr5nYloOel0MpaDJrtIPUh7jGpAtTzxsX7a-PZbg8.mp4", label: "In the chair" },
  { src: "https://media.base44.com/videos/public/user_6ab2dfa119ab1f0d268bfdbe/d9354c565_SaveClipApp_AQPyAvG6Q9x2kNAeSIcYTXmLwVTIWHiKiaiqnQIfOumfaZEooJAtbs4Vhze3PMTJQXEEMqBc9f3kpTOl79yJZmw3Lor7yrENqV5KKEA.mp4", label: "Blade work" },
  { src: "https://media.base44.com/videos/public/user_6ab2dfa119ab1f0d268bfdbe/7c554f547_SaveClipApp_AQODIjlA0Igb1SBS_2fQrob5qH3Pns4lHVi7LWj2JWyl5x-tCcr0_wyBYqvRjz64a__vWIUYNs-VJ2SDIWuNklyj_MWj0hbCcRaJqn4.mp4", label: "The finish" },
  { src: "https://media.base44.com/videos/public/user_6ab2dfa119ab1f0d268bfdbe/eb166e858_SaveClipApp_AQNyuOLgPojbBufF_GCE1BiYGLUy0RXiPZrdBOV84YoFfUCnHYKNEBgCQHmxbyCkttdQsyHW0_0ikNq0BILXWKVKQwO0gd519St5Z28.mp4", label: "Studio atmosphere" },
  { src: "https://media.base44.com/videos/public/user_6ab2dfa119ab1f0d268bfdbe/8e19d5af8_SaveClipApp_AQPpghDGoq-8AugLnItx-IaSv1rFHU6vrEkYOSSo1qSZ9kJyGJsIUZEpkRxw7XdWLA5l51It861VTt5o2Rx_oB2DrZJpDtBovcvXkKA.mp4", label: "Transformation" },
];

export const SERVICE_CATEGORIES = [
  {
    slug: "hair",
    name: "Hair",
    tagline: "Cut, colour, movement",
    short:
      "Considered cutting and colour for every hair type — shaped around your face, your texture and the way you actually wear it.",
    description:
      "Hair is the centre of everything we do at The Luxe Studio. Every appointment begins with a conversation about your hair's texture, its history and the amount of time you want to spend styling it at home. From there, we cut and colour with intention rather than trend — so the result still looks considered weeks later.",
    image: IMAGES.hair,
    services: [
      {
        slug: "haircuts",
        name: "Haircuts",
        summary: "A precision cut built around your face shape, hair type and daily routine.",
        description:
          "Whether you are after a sharp shoulder-length bob or a softer, layered shape, we cut with your natural growth pattern in mind. Every haircut starts with a consultation and finishes with a styling walk-through, so you leave knowing how to recreate the look.",
        includes: ["Personal consultation", "Precision cut for your hair type", "Finish and home styling guidance"],
        image: IMAGES.sleek,
      },
      {
        slug: "hair-styling",
        name: "Hair Styling",
        summary: "Blowouts, waves, sleek finishes and event styling.",
        description:
          "Fresh from the chair and ready for the occasion. We style for weddings, evenings, shoots and days when you simply want the extra polish — working with heat protection and quality products to keep hair looking healthy, not stiff.",
        includes: ["Consultation on the finished look", "Professional blow-dry or hot tool styling", "Long-hold, lightweight finishing"],
        image: IMAGES.glam,
      },
      {
        slug: "hair-treatments",
        name: "Hair Treatments",
        summary: "Restorative care for hair that feels dry, fragile or over-processed.",
        description:
          "Colour, heat and the Canadian seasons all take a toll. We assess your hair's condition first, then recommend the treatment that actually addresses it — from a conditioning service in the chair to a plan you can keep up at home.",
        includes: ["Condition assessment", "In-salon treatment service", "Maintenance recommendations"],
        image: IMAGES.colour,
      },
      {
        slug: "hair-coloring",
        name: "Hair Coloring",
        summary: "Dimensional colour, gloss and grey coverage with a natural finish.",
        description:
          "Colour should look like it belongs to you. We build depth and tone with careful placement, always with an eye on how it will grow out and how it will read in daylight — not only under salon lighting.",
        includes: ["Colour consultation and patch discussion", "Custom tone and placement", "Gloss and finish"],
        image: IMAGES.colour,
      },
      {
        slug: "hair-transformations",
        name: "Hair Transformations",
        summary: "Big changes, planned properly and paced for hair health.",
        description:
          "Going from long to short, dark to light, or straight to textured takes a plan. We map the route out with you across one or more appointments so your hair stays strong and the result arrives in stages that look intentional.",
        includes: ["Multi-appointment planning", "Staged cutting and colour", "Aftercare roadmap"],
        image: IMAGES.hero,
      },
    ],
  },
  {
    slug: "barbering",
    name: "Barbering",
    tagline: "Fades, blades, beards",
    short:
      "Clean lines and quiet precision. Barbering for men and anyone who wants a sharp, wearable shape.",
    description:
      "Barbering at The Luxe Studio is unisex by design — a proper fade, a beard line that sits where it should, and a finish that holds up past the first wash. Blades are used with care and every service ends with the details most places skip.",
    image: IMAGES.barbering,
    services: [
      {
        slug: "mens-haircuts",
        name: "Men's Haircuts",
        summary: "Scissor and clipper cutting tailored to your head shape and hairline.",
        description:
          "A men's cut should still look right three weeks later. We work with your hairline and growth pattern rather than forcing a shape, and we talk you through the products that keep it looking the same at home.",
        includes: ["Consultation", "Scissor and clipper cut", "Neck and detail finish"],
        image: IMAGES.fade,
      },
      {
        slug: "skin-fades",
        name: "Skin Fades",
        summary: "Seamless blends from skin to length, with a clean outline.",
        description:
          "The fade is a craft of patience. We build the blend gradually so there are no lines or steps, then sharpen the outline for a finish that reads clean from every angle.",
        includes: ["Gradual fade blending", "Sharp outline and edge work", "Styling finish"],
        image: IMAGES.barbering,
      },
      {
        slug: "beard-trimming",
        name: "Beard Trimming",
        summary: "Shape, weight removal and a balanced finish.",
        description:
          "We map the beard to your jaw and cheek line, remove bulk where it makes the face look heavier, and leave the length where it does the most work.",
        includes: ["Beard shape assessment", "Trim and weight removal", "Line-up and finish"],
        image: IMAGES.tools,
      },
      {
        slug: "beard-styling",
        name: "Beard Styling",
        summary: "Detailed styling, razor lines and conditioning care.",
        description:
          "For beards being grown out or dressed for an occasion. Expect careful line work, conditioning and a styling routine you can keep up between visits.",
        includes: ["Detail line work", "Beard conditioning", "Styling product guidance"],
        image: IMAGES.tools,
      },
      {
        slug: "hair-and-beard-packages",
        name: "Hair & Beard Packages",
        summary: "The full reset — haircut and beard work in one sitting.",
        description:
          "Our most complete men's service. Hair and beard are shaped together so the proportions match, and the whole appointment is finished as one considered look.",
        includes: ["Haircut", "Beard shaping", "Combined finish and styling"],
        image: IMAGES.fade,
      },
    ],
  },
  {
    slug: "beauty",
    name: "Beauty",
    tagline: "Care, finish, confidence",
    short:
      "The finishing layer — beauty treatments and styling services that complete the look.",
    description:
      "Beauty at The Luxe Studio is about how you feel walking out. We keep our beauty menu focused on what we do well, and we will always tell you honestly if a service is better suited to somewhere else.",
    image: IMAGES.beauty,
    services: [
      {
        slug: "beauty-treatments",
        name: "Beauty Treatments",
        summary: "Considered in-salon care, discussed with you before we begin.",
        description:
          "Our beauty treatments are chosen around your skin and your goals. Because our menu evolves, the best first step is a quick conversation — call the studio and we will talk you through exactly what is available right now.",
        includes: ["Skin and goal consultation", "In-salon treatment", "Aftercare advice"],
        image: IMAGES.beauty,
      },
      {
        slug: "special-occasion-styling",
        name: "Special Occasion Styling",
        summary: "Complete looks for weddings, events and milestones.",
        description:
          "Hair and finishing designed as one look, planned in advance where possible. We recommend booking a consultation or trial so the finished style is exactly what you pictured on the day.",
        includes: ["Look planning", "Hair styling", "Final finish and setting"],
        image: IMAGES.glam,
      },
      {
        slug: "personalised-consultation",
        name: "Personalised Consultation",
        summary: "Not sure what you want? Start here.",
        description:
          "A dedicated conversation about your hair, your routine and what you are hoping to change. We will be honest about what is achievable in one visit and what needs to be staged over time.",
        includes: ["In-depth hair and beauty review", "Service recommendation", "A realistic plan and timeline"],
        image: IMAGES.chair,
      },
    ],
  },
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((category) =>
  category.services.map((service) => ({ ...service, category: category.name, categorySlug: category.slug }))
);

export const findService = (slug) => ALL_SERVICES.find((service) => service.slug === slug);

export const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

export const WHY_CHOOSE = [
  { title: "Premium Salon Experience", text: "A calm, considered space where every appointment is given proper time." },
  { title: "Modern Styles", text: "Cutting and colour that reads current without chasing every trend." },
  { title: "Personalised Service", text: "Recommendations built around your hair, routine and comfort." },
  { title: "Attention to Detail", text: "The outline, the finish, the small things most places skip." },
  { title: "Hair & Beauty Expertise", text: "Hair, barbering and beauty under one roof, unisex by design." },
  { title: "Client-Focused Approach", text: "Honest advice, clear expectations and no pressure to add on." },
];

export const GALLERY = [
  { src: IMAGES.hero, alt: "Sleek blowout styled at The Luxe Studio", tall: true },
  { src: IMAGES.fade, alt: "Sculpted skin fade and beard line", tall: false },
  { src: IMAGES.colour, alt: "Dimensional hair colour with a mirror shine", tall: true },
  { src: IMAGES.tools, alt: "Straight razor and comb on black marble", tall: false },
  { src: IMAGES.glam, alt: "Soft glam styling with a glossy updo", tall: true },
  { src: IMAGES.barbering, alt: "Barber building a sharp skin fade", tall: false },
  { src: IMAGES.sleek, alt: "Sleek straightened hair with glass-like shine", tall: true },
  { src: IMAGES.chair, alt: "The Luxe Studio chair and mirror detail", tall: false },
  { src: IMAGES.beauty, alt: "Beauty treatment detail with warm gold light", tall: false },
];