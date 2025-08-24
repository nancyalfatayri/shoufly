import { z } from "zod";

export const merchants = [
  {
    id: "tarabays-market",
    name: "Tarabay's Market",
    description: "Fresh produce and groceries",
    image: "/api/assets/generated_images/Tarabay's_Market_storefront_d1ff8c5a.png"
  },
  {
    id: "coop-dmit", 
    name: "Coop Dmit",
    description: "Everything you need in one place",
    image: "/api/assets/generated_images/Coop_Dmit_general_store_7ba8ced0.png"
  },
  {
    id: "afran-albassam",
    name: "Afran AlBassam", 
    description: "Authentic Lebanese man'oushe",
    image: "/api/assets/generated_images/Afran_Al_Bassam_manakish_de0df78b.png"
  },
  {
    id: "abirs-pharmacy",
    name: "Abir's Pharmacy",
    description: "Your trusted healthcare partner", 
    image: "/api/assets/generated_images/Abir's_Pharmacy_interior_b4ba79e6.png"
  }
];

export type Merchant = typeof merchants[number];