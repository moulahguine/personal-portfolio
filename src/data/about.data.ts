import type { StaticImageData } from "next/image";
import { experienceYears } from "@/lib";

import computerImage from "@/assets/images/about/computer.png";
import scratchImage from "@/assets/images/about/scratch.jpg";
import creators from "@/assets/images/about/creators.jpg";
import myimage from "@/assets/images/about/myimage.jpeg";

export type AboutContentPart =
  | string
  | {
      text: string;
      emphasis?: "strong" | "em";
      link?: string;
    };

export type AboutContentItem =
  | {
      type: "paragraph";
      content: AboutContentPart | AboutContentPart[];
    }
  | {
      type: "quote";
      content: string;
    }
  | {
      type: "image";
      content: StaticImageData;
      alt?: string;
    };

export type AboutPageData = {
  header: {
    title: string;
    description: string;
  };
  sections: {
    id: string;
    title: string;
    content: AboutContentItem[];
  }[];
};

export const ABOUT_SECTION_DATA = {
  headingId: "about-heading",
  paragraph: `I'm a creative software developer with ${experienceYears}+ years of experience, working mainly in frontend development. I enjoy solving problems and building thoughtful interfaces, paying close attention to the details that make them feel right. Originally from Morocco, but now I live in Istanbul, where I'm pursuing a Bachelor's degree in Software Engineering. I'm currently looking for a frontend role where I can solve meaningful problems and build great products with a strong team. In the future, I also hope to continue my studies in Europe through a Master's degree, particularly with a focus on research in software engineering.`,
};

export const ABOUT_METADATA = {
  title: "About Me",
  description:
    "From taking computers apart as a kid to building software today. A little story about how I got into programming, frontend development, and Software Engineering.",
};

export const ABOUT_PAGE_DATA: AboutPageData = {
  header: {
    title: "About Me",
    description:
      "Here’s a short story about how I got into programming. It’s a bit long because some parts still stand out clearly in my memory.",
  },

  sections: [
    // introduction section
    {
      id: "introduction",
      title: "Who I am",

      content: [
        {
          type: "paragraph",
          content:
            "Hi, I'm Mohamed. I'm a frontend developer from Morocco, currently studying Software Engineering in Türkiye.",
        },
        {
          type: "image",
          content: myimage,
          alt: "",
        },
        {
          type: "paragraph",
          content:
            "My relationship with computers started long before I knew what programming was.",
        },
        {
          type: "paragraph",
          content: [
            "Back in 2011, my father came back from a holiday and brought a computer home. At that time, having a computer at home wasn't something very common where I grew up, so I was fascinated by it. But I wasn't interested in software yet. I wanted to know what was ",
            { text: "inside", emphasis: "strong" },
            " the computer.",
          ],
        },
        {
          type: "image",
          content: computerImage,
          alt: "An old desktop computer",
        },
        {
          type: "paragraph",
          content:
            "I used to open it, look at the parts, collect whatever pieces I could find, and try to fix things that weren't working. Sometimes I probably had no idea what I was doing, but that never stopped me from opening the computer again. For a long time, hardware was my thing.",
        },
      ],
    },
    // discovering programming section
    {
      id: "discovering-programming",
      title: "Then I discovered programming",

      content: [
        {
          type: "paragraph",
          content:
            "In Morocco, we didn't really have programming classes in school before high school. My first real chance to learn something about programming came in my first year of high school.",
        },
        {
          type: "paragraph",
          content: "We started with Scratch.",
        },
        {
          type: "image",
          content: scratchImage,
          alt: "Scratch programming blocks on a screen",
        },
        {
          type: "paragraph",
          content:
            "It was a very simple way to learn programming. Instead of writing lots of code, we had these blocks that we could put together to make something happen. And I loved it. There is one small memory from that time that I still remember.",
        },
        {
          type: "paragraph",
          content: "One day, our teacher asked:",
        },
        {
          type: "quote",
          content: "Does anyone know which language Android was built with?",
        },
        {
          type: "paragraph",
          content: "I said:",
        },
        {
          type: "quote",
          content: "Java.",
        },
        {
          type: "paragraph",
          content: [
            "I was probably the only person in the class who had an answer. The funny part is that I wasn't even sure. Around that time, when I restarted my phone, I used to see the word ",
            { text: "Java", emphasis: "strong" },
            ", during the startup. So when the teacher asked the question, I thought, ",
            {
              text: "well... I've seen Java on my phone, so it must be Java.",
              emphasis: "em",
            },
          ],
        },
        {
          type: "paragraph",
          content: "She was happy, clapped, and said a few nice things.",
        },
        {
          type: "paragraph",
          content: "And honestly, for a few minutes, I thought I was a genius.",
        },
        {
          type: "paragraph",
          content:
            "Looking back, it was a very small thing. But moments like that made programming feel interesting to me. I started paying more attention to software, and before I finished high school, I had already decided that I wanted to become a software engineer.",
        },
      ],
    },
    // starting with the frontend section
    {
      id: "frontend",
      title: "Starting with the frontend",

      content: [
        {
          type: "paragraph",
          content: [
            "After high school, I decided to start with frontend development. My first serious learning came from ",
            {
              text: "Elzero Web School",
              emphasis: "strong",
              link: "https://elzero.org/",
            },
            ", where I learned ",
            { text: "HTML", emphasis: "strong" },
            ", ",
            { text: "CSS", emphasis: "strong" },
            ", and ",
            { text: "JavaScript", emphasis: "strong" },
            ". ",
            "HTML was fine, but CSS was where things started getting difficult. As a beginner, I struggled to make things look the way I wanted. I would change one thing, and suddenly something else would move somewhere it shouldn't. And then there was JavaScript, which was even more challenging.",
          ],
        },
        {
          type: "paragraph",
          content:
            "But I was lucky to learn from someone who explained things really well. He had a way of making difficult topics easy to understand, and the exercises and challenges pushed me to practice what I was learning instead of just watching the lessons.",
        },
        {
          type: "paragraph",
          content: "I really want to say thank you to him here.",
        },
        {
          type: "paragraph",
          content:
            "I don't want to forget the people who helped me get started. His explanations made a big difference in how I learned, and the exercises he gave us pushed me to keep practicing. Even now, when I think about where I started with frontend development, I still remember how much Elzero Web School helped me.",
        },
        {
          type: "paragraph",
          content: "So, thank you.",
        },
      ],
    },
    // first client section
    {
      id: "first-client",
      title: "My first client was a little unusual",

      content: [
        {
          type: "paragraph",
          content:
            "After studying for a while, I started looking for ways to actually use what I was learning. My first client came through social media. He had a business helping students with university applications, but his website was old and needed some work. At the same time, I needed help with my own university admission.",
        },
        {
          type: "paragraph",
          content: "So we made a deal.",
        },
        {
          type: "paragraph",
          content:
            "He would help me with my university admission, and I would work on his website. That became my first client. Not exactly the kind of first-client story you see in a business book, but it worked.",
        },
        {
          type: "paragraph",
          content: [
            "Since then, I've built many different projects, especially ",
            {
              text: "e-commerce websites",
              emphasis: "strong",
            },
            ", ",
            {
              text: "landing pages",
              emphasis: "strong",
            },
            ", and ",
            {
              text: "dashboards",
              emphasis: "strong",
            },
            ". ",
            "E-commerce became especially interesting to me because I started looking beyond just the page the user sees. I wanted to understand what was happening behind it, how the different parts connected, how the products and data moved around, and how everything worked together. The more I worked on these projects, the more I wanted to understand what was happening beyond the frontend.",
          ],
        },
      ],
    },
    // why I chose Software Engineering section
    {
      id: "software-engineering",
      title: "Why I chose Software Engineering",

      content: [
        {
          type: "paragraph",
          content:
            "After about a year of studying frontend development and freelancing, I decided to join university and study Software Engineering. It wasn't really a difficult decision. This was something I had wanted to do for a long time, and I wanted to study it properly. and I'm still learning, of course. Probably more than ever.",
        },
      ],
    },
    // what matters to me when I build software section
    {
      id: "software-values",
      title: "What matters to me when I build software",

      content: [
        {
          type: "paragraph",
          content: [
            "One thing I care about more and more is ",
            { text: "maintainability", emphasis: "strong" },
            ". I don't want to build something that only makes sense to the person who wrote it. If another developer opens the project later, I want them to be able to understand what is going on. But I think about the client too. A client shouldn't always need a developer just to change some content, update some data, or make a small change to their website.",
          ],
        },
        {
          type: "paragraph",
          content:
            "If I can build a project in a way that makes those things easier without someone accidentally breaking the whole layout, that's a good result to me. For me, clean code isn't about making the code look clever. It's about making the project easier to understand, change, and live with.",
        },
      ],
    },
    // building a developer community section
    {
      id: "community",
      title: "Building a developer community",

      content: [
        {
          type: "paragraph",
          content:
            "While studying, I noticed that many students interested in development were learning on their own without really knowing others who shared the same interests. So I decided to create a development community myself; a place where students can connect, learn, and build together. It's still growing, but my goal is to eventually make it one of the biggest developer communities in Türkiye.",
        },
        {
          type: "paragraph",
          content:
            "That's a big goal, I know. But I'd rather work toward it than decide it's too big.",
        },
      ],
    },
    // outside of code section
    {
      id: "outside-code",
      title: "Outside of code",

      content: [
        {
          type: "paragraph",
          content: [
            "To be honest, I spend a lot of my time around programming. I enjoy coding, solving problems on ",
            {
              text: "LeetCode",
              emphasis: "strong",
              link: "https://leetcode.com/",
            },
            ", reading, writing, and learning. I also like learning languages, not programming languages this time 😅.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "I'm a native ",
            {
              text: "Arabic",
              emphasis: "strong",
            },
            ", ",
            " and ",
            {
              text: "Berber",
              emphasis: "strong",
            },
            ", ",
            "and I'm fluent ",
            {
              text: "English",
              emphasis: "strong",
            },
            ". ",
            "I'm currently learning ",
            {
              text: "Turkish",
              emphasis: "strong",
            },
            " and ",
            {
              text: "German",
              emphasis: "strong",
            },
            ".",
          ],
        },
        {
          type: "paragraph",
          content:
            "So apparently, learning how to communicate with computers wasn't enough. Now I'm trying to communicate with more people too.",
        },
      ],
    },
    // whats next section
    {
      id: "whats-next",
      title: "What's next?",

      content: [
        {
          type: "paragraph",
          content:
            "Right now, I'm still learning what it means to become a really good software engineer.",
        },
        {
          type: "paragraph",
          content:
            "Frontend is where I started, and it is still a big part of what I enjoy, but I don't want my learning to stop there.",
        },
        {
          type: "paragraph",
          content:
            "In the long run, I want to keep growing the developer community I'm building and make it one of the biggest developer communities in Türkiye. I also want to continue my studies with a Master's degree and get into research in an area related to Software Engineering. And, if I'm being completely honest, I have a very big ambition for the far future.",
        },
        {
          type: "paragraph",
          content:
            "I want to build something that matters enough for people to remember the person who built it. When we talk about software today, we still remember the names of people who created important technologies, built systems that changed how we work, or solved problems that seemed difficult at the time.",
        },
        {
          type: "image",
          content: creators,
          alt: "Developers and technology pioneers who shaped the industry",
        },
        {
          type: "paragraph",
          content: "I'd like to leave something behind like that.",
        },
        {
          type: "paragraph",
          content: "I'm nowhere near there yet.",
        },
        {
          type: "paragraph",
          content:
            "For now, I'm still the guy learning, building projects, solving problems, making mistakes, and opening things up to see how they work.",
        },
        {
          type: "paragraph",
          content: "And I think that's a pretty good place to be.",
        },
        {
          type: "paragraph",
          content:
            "If you read all the way to the end, thank you 🤝. I know it was a long one, and I really appreciate you taking the time to get to know me.",
        },
      ],
    },
  ],
};
