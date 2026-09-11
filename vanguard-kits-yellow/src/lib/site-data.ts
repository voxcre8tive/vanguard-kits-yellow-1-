import type { ProductCategory, Sport } from "./types";

import football from "@/assets/sport-football.jpg";
import basketball from "@/assets/sport-basketball.jpg";
import baseball from "@/assets/sport-baseball.jpg";
import soccer from "@/assets/sport-soccer.jpg";
import volleyball from "@/assets/sport-volleyball.jpg";
import lacrosse from "@/assets/sport-lacrosse.jpg";
import softball from "@/assets/sport-softball.svg";

export const BRAND = "Vanguard Kits";

export interface SportEntry extends Sport {
  image: string;
  alt: string;
}

export const sports: SportEntry[] = [
  {
    slug: "football",
    name: "Football",
    tagline: "Game jerseys, practice kits and sideline wear",
    description:
      "Custom football uniforms built for contact: reinforced game jerseys, integrated pants, practice tops and sideline layers for programs of every size.",
    image: football,
    alt: "Football player in a plain dark custom uniform under studio lighting",
  },
  {
    slug: "basketball",
    name: "Basketball",
    tagline: "Reversibles, shooting shirts and warm-ups",
    description:
      "Custom basketball uniforms with breathable game sets, reversible practice gear, shooting shirts and full warm-up packages.",
    image: basketball,
    alt: "Basketball player holding a ball wearing a plain dark custom jersey",
  },
  {
    slug: "baseball",
    name: "Baseball",
    tagline: "Full button jerseys, pants and caps",
    description:
      "Custom baseball and softball uniforms including full-button and two-button jerseys, pants, caps and dugout apparel.",
    image: baseball,
    alt: "Baseball player in a plain grey custom uniform holding a bat",
  },
  {
    slug: "soccer",
    name: "Soccer",
    tagline: "Match kits, keeper sets and training wear",
    description:
      "Custom soccer uniforms with lightweight match kits, goalkeeper sets, training tops and travel wear for clubs and school programs.",
    image: soccer,
    alt: "Soccer player in a plain dark custom kit controlling a ball",
  },
  {
    slug: "volleyball",
    name: "Volleyball",
    tagline: "Jerseys, spandex and libero sets",
    description:
      "Custom volleyball uniforms including fitted jerseys, spandex, libero sets and warm-up layers designed for long tournament days.",
    image: volleyball,
    alt: "Volleyball player reaching for a spike in a plain dark custom kit",
  },
  {
    slug: "lacrosse",
    name: "Lacrosse",
    tagline: "Reversible tops, shorts and kilts",
    description:
      "Custom lacrosse uniforms with reversible game tops, shorts, kilts and shooter shirts for men's and women's programs.",
    image: lacrosse,
    alt: "Lacrosse player holding two sticks in a plain dark custom uniform",
  },
  {
    slug: "softball",
    name: "Softball",
    tagline: "Jerseys, pants and fastpitch performance wear",
    description:
      "Custom softball uniforms including fastpitch and slowpitch jerseys, pants, pullovers and warm-ups matched to your program's colors.",
    image: softball,
    alt: "Placeholder graphic for custom softball uniforms — replace with a program photo",
  },
];

export const productCategories: ProductCategory[] = [
  { slug: "jerseys", name: "Custom Jerseys", blurb: "Sublimated or cut-and-sew game jerseys built to your team's identity." },
  { slug: "full-uniforms", name: "Full Uniforms", blurb: "Complete home and away sets, matched top to bottom." },
  { slug: "shorts", name: "Shorts & Bottoms", blurb: "Game shorts, pants and spandex in team-matched colorways." },
  { slug: "warm-ups", name: "Warm-Ups", blurb: "Jackets, pants and shooting layers for pre-game and travel." },
  { slug: "training-wear", name: "Training Wear", blurb: "Practice tops, reversibles and conditioning gear for daily use." },
  { slug: "fanwear", name: "Fanwear", blurb: "Tees, hoodies and sideline apparel for families and supporters." },
  { slug: "accessories", name: "Accessories", blurb: "Bags, caps, socks and finishing pieces to complete the kit." },
];

export const solutions = [
  {
    slug: "schools",
    name: "Schools",
    copy: "Custom uniforms and apparel for athletic departments and school programs.",
  },
  {
    slug: "clubs",
    name: "Clubs & Travel Teams",
    copy: "Professional teamwear for competitive clubs and growing programs.",
  },
  {
    slug: "leagues",
    name: "Leagues",
    copy: "Consistent uniforms and apparel for league-wide programs.",
  },
  {
    slug: "organizations",
    name: "Organizations & Events",
    copy: "Custom apparel and uniforms for tournaments, events and organizations.",
  },
];

export const stats = [
  { value: "500+", label: "Programs Served" },
  { value: "20+", label: "Sports Outfitted" },
  { value: "48hr", label: "Design Turnaround" },
  { value: "99%", label: "On-Time Delivery" },
];

export const processSteps = [
  {
    number: "01",
    title: "Tell us about your team",
    copy: "Sport, colors, logo, products, quantity and deadline.",
  },
  {
    number: "02",
    title: "Get your design",
    copy: "Our design team creates your custom uniform concept.",
  },
  {
    number: "03",
    title: "Approve your proof",
    copy: "Review colors, logos, names, numbers and details.",
  },
  {
    number: "04",
    title: "We build it",
    copy: "Once approved, the order moves into production.",
  },
  {
    number: "05",
    title: "Game day",
    copy: "Your team receives its finished uniforms and gear.",
  },
];
