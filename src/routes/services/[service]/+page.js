import { error } from "@sveltejs/kit";
import { servicePages } from "$lib/data/services";

export const prerender = true;

export const entries = () =>
  servicePages.map((service) => ({ service: service.slug }));

export const load = ({ params }) => {
  const service = servicePages.find((item) => item.slug === params.service);
  if (!service) {
    throw error(404, "Service not found");
  }

  return { service };
};
