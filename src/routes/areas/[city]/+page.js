import { error } from "@sveltejs/kit";
import { serviceAreas } from "$lib/data/locations";

export const prerender = true;

export const entries = () => serviceAreas.map((area) => ({ city: area.slug }));

export const load = ({ params }) => {
  const area = serviceAreas.find((item) => item.slug === params.city);
  if (!area) {
    throw error(404, "Area not found");
  }

  return { area };
};
