import {
  About,
  Blog,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
} from "@/sections";
import { HERO_DATA } from "@/data";
import { JsonLd, getPersonJsonLd, getWebSiteJsonLd } from "@/lib";

const { profileInfo, socialLinks } = HERO_DATA;

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          getPersonJsonLd({
            name: profileInfo.name,
            jobTitle: profileInfo.role,
            location: profileInfo.location,
            techStack: profileInfo.techStack,
            sameAs: socialLinks
              .filter((link) => link.external)
              .map((link) => link.href),
          }),
          getWebSiteJsonLd(),
        ]}
      />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
