export const ROUTES = {
  home: { label: "Home", href: "/" },
  about: { label: "About", href: "/about" },
  skills: { label: "Skills", href: "/skills" },
  projects: { label: "Projects", href: "/projects" },
  blogs: { label: "Blogs", href: "/blogs" },
  contact: { label: "Contact", href: "/contact" },
} as const;

export type RouteId = keyof typeof ROUTES;

export interface NavItem {
  id: RouteId;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = (
  Object.entries(ROUTES) as [RouteId, (typeof ROUTES)[RouteId]][]
).map(([id, { label, href }]) => ({
  id,
  label,
  href,
}));

export function getRouteHref(id: RouteId) {
  return ROUTES[id].href;
}

export function getRouteLabel(id: RouteId) {
  return ROUTES[id].label;
}
