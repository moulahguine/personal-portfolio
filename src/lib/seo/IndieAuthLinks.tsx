import { SOCIAL_LINKS } from "@/data";

export default function IndieAuthLinks() {
  return (
    <>
      {SOCIAL_LINKS.filter((link) => link.external).map((link) => (
        <link key={link.id} rel="me" href={link.href} />
      ))}
    </>
  );
}
