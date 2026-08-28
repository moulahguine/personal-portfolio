import { Hero, About, Skills, Projects, Blog, Contact } from "@/sections";
import { HERO_DATA, SOCIAL_LINKS } from "@/data";
import { JsonLd, getPersonJsonLd, getWebSiteJsonLd } from "@/lib";

const { profileInfo } = HERO_DATA;

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
            sameAs: SOCIAL_LINKS.filter((link) => link.external).map(
              (link) => link.href,
            ),
          }),
          getWebSiteJsonLd(),
        ]}
      />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
