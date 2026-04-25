const GROUPS = [
  {
    label: "Languages",
    delay: "",
    items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frameworks & Libraries",
    delay: "d1",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Prisma", "TypeORM"],
  },
  {
    label: "Tools & Platforms",
    delay: "d2",
    items: ["Docker", "GCP", "PostgreSQL", "GitHub", "Figma", "Swagger", "CI/CD"],
  },
  {
    label: "Methodologies",
    delay: "d1",
    items: ["Scrum", "Kanban", "REST APIs", "Code Review", "Pair Programming"],
  },
  {
    label: "Design",
    delay: "d2",
    items: ["UI/UX Design", "Figma", "Responsive Design", "Accessibility"],
  },
  {
    label: "Spoken Languages",
    delay: "d3",
    items: ["Portuguese (Native)", "English (B2)"],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="inner">
        <div className="sec-tag rv" data-n="03">Toolkit</div>
        <h2 className="sec-h rv">
          Skills &amp;
          <br />
          Technologies
        </h2>
        <div className="skills-grid">
          {GROUPS.map((g) => (
            <div className={`sg rv ${g.delay}`} key={g.label}>
              <div className="sg-lbl">{g.label}</div>
              <div className="sp-wrap">
                {g.items.map((item) => (
                  <span className="sp" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
