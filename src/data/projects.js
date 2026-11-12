import swimmingPoolImg from "../assets/projects/swimmingpole/swimmingpolemaing.png";
import swimmingPool2 from "../assets/projects/swimmingpole/swimmingpole2.png";
import swimmingPool3 from "../assets/projects/swimmingpole/swimmingpole3.png";
import swimmingPool4 from "../assets/projects/swimmingpole/swimmingpole4.png";
import GardenPathwayImg from "../assets/projects/GardenPathway/GardenPathway.png";
import ModernVillaGardenImg from "../assets/projects/ModernVillaGarden/ModernVillaGarden.png";
import VillaGarden1 from "../assets/projects/ModernVillaGarden/VillaGraden.png";
import VillaGarden2 from "../assets/projects/ModernVillaGarden/VillaGraden2.png";
import VillaGarden3 from "../assets/projects/ModernVillaGarden/VillaGraden3.png";
import PathwayDay9 from "../assets/projects/GardenPathway/graden9.png";
import PathwayDay7 from "../assets/projects/GardenPathway/graden7.png";
import PathwayNight4 from "../assets/projects/GardenPathway/graden4.png";
import PathwayNight5 from "../assets/projects/GardenPathway/graden5.png";
import PathwayNight6 from "../assets/projects/GardenPathway/graden6.png";
import PathwayNight8 from "../assets/projects/GardenPathway/graden8.png";

export const PROJECTS = [
  {
  slug: "luxury-villa-swimming-pool-palm-jumeirah",
  title: "Luxury Villa Swimming Pool",
  area: "Palm Jumeirah, Dubai",
  description:
    "A full backyard transformation featuring a statement swimming pool, low-maintenance lawn, palm landscaping, and comfortable outdoor spaces designed for relaxing and entertaining.",
  work: "Swimming Pool · Turf · Landscaping",
  galleryIntro: "Explore the swimming pool and outdoor landscape from different views.",
  image: swimmingPoolImg,
  gallery: [
    {
      group: "Day Views",
      items: [
        { src: swimmingPoolImg, caption: "" },
        { src: swimmingPool2, caption: "" },
      ],
    },
    {
      group: "Night Views",
      items: [
        { src: swimmingPool3, caption: "" },
        { src: swimmingPool4, caption: "" },
      ],
    },
  ],
},
  {
  slug: "modern-villa-garden-pathway",
  title: "Modern Villa Garden Pathway",
  area: "Dubai, UAE",
  description:
    "A modern villa landscape featuring clean stepping-stone pathways, artificial turf, decorative gravel, and tropical planting to create a simple and elegant outdoor environment.",
  galleryIntro: "Explore the pathway, turf and planting details of this garden.",
  work: "Artificial Turf · Paving · Planting",
  image: GardenPathwayImg,
  gallery: [
    {
      group: "Day Views",
      items: [
        { src: PathwayDay9, caption: "" },
        { src: PathwayDay7, caption: "" },
      ],
    },
    {
      group: "Night Views",
      items: [
        { src: PathwayNight4, caption: "" },
        { src: PathwayNight5, caption: "" },
        { src: PathwayNight6, caption: "" },
        { src: PathwayNight8, caption: "" },
      ],
    },
  ],
},
  {
  slug: "modern-villa-garden",
  title: "Modern Villa Garden",
  area: "Dubai, UAE",
  description:
    "A contemporary villa garden designed with lush lawn, palm trees, decorative landscaping, and clean outdoor spaces that complement the modern architecture of the property.",
  work: "Garden Landscaping · Turf · Planting",
  galleryIntro: "Explore the lawn, palm trees and landscaping details of this garden.",
  image: ModernVillaGardenImg,
  gallery: [
    { src: VillaGarden1, caption: "" },
    { src: VillaGarden2, caption: "" },
    { src: VillaGarden3, caption: "" },
  ],
},
];