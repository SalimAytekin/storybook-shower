import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { invitationData as d } from "@/data/invitation";
import { EnvelopeHero } from "@/components/invite/Envelope";
import {
  StorySection,
  DetailsSection,
  CountdownSection,
  PhotoStorySection,
  TraditionsSection,
  RegistrySection,
  RsvpSection,
  ClosingSection,
} from "@/components/invite/Sections";

const title = `${d.babyName} Baby Shower · ${d.parents}`;
const description = `${d.messages.heroTitle}. Join ${d.parents} on ${d.date.full} at ${d.venue.name}, ${d.venue.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpened = () => {
    setOpened(true);
    window.setTimeout(() => storyRef.current?.scrollIntoView({ behavior: "smooth" }), 250);
  };

  return (
    <main className="relative overflow-x-clip">
      <EnvelopeHero onOpened={handleOpened} />
      <div
        ref={storyRef}
        className={`transition-opacity duration-[1400ms] ease-out ${opened ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!opened}
      >
        <StorySection />
        <DetailsSection />
        <CountdownSection />
        <PhotoStorySection />
        <TraditionsSection />
        <RegistrySection />
        <RsvpSection />
        <ClosingSection />
      </div>
    </main>
  );
}
