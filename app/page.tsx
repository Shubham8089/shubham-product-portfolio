import { Hero } from "@/components/home/Hero";
import { Loop } from "@/components/home/Loop";
import { SkillSection } from "@/components/home/SkillSection";
import { Startups } from "@/components/home/Startups";
import { About } from "@/components/home/About";
import { STAGES } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="loop">
        <Loop />
      </section>
      <div id="work">
        {STAGES.map((stage) => (
          <SkillSection key={stage.id} stage={stage.id} />
        ))}
      </div>
      <Startups />
      <About />
    </>
  );
}
