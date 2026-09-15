import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Braces, Check, ChevronDown, Code2, ExternalLink, Github, Instagram, Linkedin, Mail, Menu, Network, Orbit, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WorkspaceScene = lazy(() => import("@/components/portfolio/WorkspaceScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhishek K R | Full Stack Developer" },
      { name: "description", content: "Abhishek K R — Full Stack Developer building modern digital experiences with React, Python, Django, JavaScript, and more." },
      { property: "og:title", content: "Abhishek K R | Full Stack Developer" },
      { property: "og:description", content: "Explore the projects, skills, and development mindset of Full Stack Developer Abhishek K R." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const nav = ["Home", "About", "Skills", "Projects", "Education", "Contact"];
const comfortable = ["Python", "Java", "JavaScript", "HTML", "CSS", "React"];
const learning = ["Django", "Django REST Framework", "Git", "GitHub", "C"];
const principles = [
  ["01", "Build", "Turn concepts into working, useful software."],
  ["02", "Solve", "Work through problems independently and methodically."],
  ["03", "Experiment", "Explore technology by testing ideas in practice."],
  ["04", "Improve", "Continuously develop technical skill and judgment."],
];

function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [expanded, setExpanded] = useState("LTL Store");
  const [status, setStatus] = useState("");
  const reducedMotion = useMemo(() => mounted && window.matchMedia("(prefers-reduced-motion: reduce)").matches, [mounted]);

  useEffect(() => {
    setMounted(true);
    const sections = nav.map((item) => document.getElementById(item.toLowerCase())).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id[0].toUpperCase() + visible.target.id.slice(1));
    }, { threshold: [0.25, 0.55], rootMargin: "-20% 0px -35%" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("Contact email will be added soon. Your message has not been sent.");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      <div className="scene-fallback fixed inset-0 z-0" aria-hidden="true" />
      {mounted && <Suspense fallback={null}><WorkspaceScene reducedMotion={reducedMotion} compact={window.innerWidth < 768} /></Suspense>}
      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
        <nav aria-label="Primary navigation" className="glass flex h-14 items-center justify-between px-4 md:px-5">
          <a href="#home" className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-foreground"><span className="status-dot" />AKR / DEV</a>
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={`nav-link ${active === item ? "nav-link-active" : ""}`}>{item}</a>)}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="glass mt-2 grid p-2 md:hidden">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground">{item}</a>)}</div>}
      </header>

      <main className="relative z-10">
        <section id="home" className="section-shell flex min-h-[96svh] items-end pb-16 pt-32 md:items-center md:pb-0">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="hero-copy max-w-3xl">
              <div className="eyebrow"><span className="status-dot" /> Available for meaningful work</div>
              <p className="mt-7 font-mono text-sm uppercase text-primary">Full Stack Developer</p>
              <h1 className="mt-3 text-balance text-5xl font-semibold leading-[.94] md:text-7xl lg:text-8xl">Abhishek <span className="text-primary">K R</span></h1>
              <p className="mt-6 max-w-xl text-balance text-base leading-7 text-muted-foreground md:text-lg">Building modern digital experiences with code, creativity, and problem-solving.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="premium-button"><a href="#projects">Explore My Work <ArrowRight /></a></Button>
                <Button size="lg" variant="outline" className="glass-button" onClick={() => setStatus("Resume link will be added soon.")}>View Resume <ExternalLink /></Button>
              </div>
              {status && <p className="mt-4 text-sm text-muted-foreground" role="status">{status}</p>}
            </div>
            <div className="hidden min-h-[28rem] lg:block" aria-label="Interactive abstract 3D developer workstation" />
          </div>
          <a href="#about" className="scroll-cue" aria-label="Scroll to About"><span>Explore workspace</span><ArrowDown /></a>
        </section>

        <section id="about" className="section-shell section-grid min-h-screen items-center py-28">
          <SectionIntro index="01" label="Identity" title="About Me" />
          <div className="glass content-panel lg:col-start-2">
            <div className="panel-top"><span>DEVELOPER.PROFILE</span><span className="status-live">ACTIVE</span></div>
            <p className="text-xl leading-8 md:text-2xl md:leading-10">I’m Abhishek K R, a Full Stack Developer focused on building practical, modern digital experiences.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Build beyond theory", "Solve independently", "Keep developing"].map((item) => <div key={item} className="micro-panel"><Check />{item}</div>)}
            </div>
            <p className="mt-8 max-w-2xl leading-7 text-muted-foreground">I enjoy building things rather than simply learning theory, solving problems independently, experimenting with technology, and continuously developing my skills.</p>
          </div>
        </section>

        <section id="skills" className="section-shell min-h-screen py-28">
          <SectionIntro index="02" label="Capabilities" title="Technical Arsenal" description="A practical stack in active development—tools I use now and technologies I’m deliberately learning next." />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <SkillCluster title="Comfortable With" items={comfortable} active />
            <SkillCluster title="Currently Learning" items={learning} />
          </div>
        </section>

        <section id="projects" className="section-shell min-h-screen py-28">
          <SectionIntro index="03" label="Selected work" title="What I Build" description="Practical projects that turn learning into working software." />
          <div className="mt-14 grid gap-4">
            <Project title="Calculator" number="01" description="A simple calculator application demonstrating fundamental development logic and practical problem-solving." stack={["Fundamentals", "Problem solving"]} expanded={expanded === "Calculator"} onToggle={() => setExpanded(expanded === "Calculator" ? "" : "Calculator")} />
            <Project title="LTL Store" number="02" description="An e-commerce store currently being developed with a React interface and Django backend." stack={["React", "Django", "In development"]} expanded={expanded === "LTL Store"} onToggle={() => setExpanded(expanded === "LTL Store" ? "" : "LTL Store")} featured />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Project links will appear here when available.</p>
        </section>

        <section id="how-i-build" className="section-shell py-28">
          <SectionIntro index="04" label="Method" title="How I Build" />
          <div className="workflow mt-14" aria-label="Development workflow">
            {["Learn", "Experiment", "Build", "Solve", "Improve"].map((step, index) => <div key={step} className="workflow-step"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>)}
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">{principles.map(([number, title, copy]) => <article key={title} className="principle"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section id="education" className="section-shell section-grid min-h-[85vh] items-center py-28">
          <SectionIntro index="05" label="Direction" title="Education & Development" description="A professional development path focused on becoming a capable, well-rounded full-stack developer." />
          <div className="timeline lg:col-start-2">
            <div className="timeline-node"><span className="timeline-pulse" /><div className="glass content-panel"><div className="panel-top"><span>ACTIVE DIRECTION</span><span>01</span></div><h3 className="mt-7 text-2xl font-semibold">Full Stack Development</h3><p className="mt-4 leading-7 text-muted-foreground">Developing practical capability across frontend, backend, tooling, and the problem-solving required to bring complete digital products to life.</p><div className="mt-7 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"><Orbit /> Continuously developing</div></div></div>
            <div className="timeline-placeholder"><span>+</span> Future education details</div>
          </div>
        </section>

        <section id="contact" className="section-shell min-h-screen py-28">
          <SectionIntro index="06" label="Connect" title="Let’s Build Something" description="Have an idea, project, or opportunity? Let’s connect." />
          <div className="mt-14 grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
            <div className="glass content-panel">
              <Network className="h-10 w-10 text-primary" />
              <h3 className="mt-7 text-xl font-semibold">Contact channels</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Details can be connected as soon as they’re available.</p>
              <div className="mt-8 grid gap-2">{[[Mail,"Email"],[Github,"GitHub"],[Linkedin,"LinkedIn"],[Instagram,"Instagram"]].map(([Icon,label]) => <div className="contact-row" key={label as string}><Icon className="h-4 w-4" /><span>{label as string}</span><em>Link pending</em></div>)}</div>
            </div>
            <form onSubmit={submit} className="glass content-panel" noValidate>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Name"><Input name="name" required minLength={2} placeholder="Your name" /></Field><Field label="Email"><Input name="email" type="email" required placeholder="you@example.com" /></Field></div>
              <div className="mt-5"><Field label="Message"><Textarea name="message" required minLength={10} rows={6} placeholder="Tell me about the idea, project, or opportunity." /></Field></div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="max-w-sm text-xs leading-5 text-muted-foreground">This form will activate when a contact email is supplied.</p><Button type="submit" className="premium-button">Send Message <Send /></Button></div>
              {status && <p className="mt-4 text-sm text-primary" role="status">{status}</p>}
            </form>
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-border"><div className="section-shell flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><div><strong className="text-foreground">Abhishek K R</strong> — Full Stack Developer</div><p>Built with curiosity, code, and continuous improvement.</p></div></footer>
    </div>
  );
}

function SectionIntro({ index, label, title, description }: { index: string; label: string; title: string; description?: string }) { return <div className="max-w-xl"><div className="eyebrow"><span>{index}</span>{label}</div><h2 className="mt-6 text-4xl font-semibold md:text-6xl">{title}</h2>{description && <p className="mt-5 leading-7 text-muted-foreground">{description}</p>}</div>; }
function SkillCluster({ title, items, active = false }: { title: string; items: string[]; active?: boolean }) { return <div className={`glass skill-cluster ${active ? "skill-cluster-active" : ""}`}><div className="panel-top"><span>{title}</span><span>{String(items.length).padStart(2,"0")} NODES</span></div><div className="skill-field">{items.map((item, index) => <button key={item} type="button" className="skill-node" aria-label={`${item}, ${title}`}><span className="node-orbit" /><Code2 /><strong>{item}</strong><small>{title}</small><i>{String(index + 1).padStart(2,"0")}</i></button>)}</div></div>; }
function Project({ title, number, description, stack, expanded, onToggle, featured = false }: { title: string; number: string; description: string; stack: string[]; expanded: boolean; onToggle: () => void; featured?: boolean }) { return <article className={`project-row ${expanded ? "project-row-expanded" : ""}`}><button type="button" className="project-trigger" onClick={onToggle} aria-expanded={expanded}><span className="project-number">{number}</span><span><small>{featured ? "CURRENT DEVELOPMENT" : "PRACTICAL PROJECT"}</small><strong>{title}</strong></span><ChevronDown className={expanded ? "rotate-180" : ""} /></button>{expanded && <div className="project-detail"><div className="project-visual" aria-hidden="true"><Braces /><div className="project-grid" /></div><div><p className="max-w-xl text-lg leading-8">{description}</p><div className="mt-6 flex flex-wrap gap-2">{stack.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div><Button disabled variant="outline" className="mt-7">Project link coming soon</Button></div></div>}</article>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{children}</label>; }
