export default function About() {
  return (
    <section id="about">
      <div className="inner">
        <div className="sec-tag" data-n="01">About Me</div>
        <div className="about-grid">
          <div className="about-left">
            <div className="stat-block rv">
              <div className="stat-n">1+</div>
              <div className="stat-l">Year of industry experience</div>
            </div>
            <div className="stat-block rv d1">
              <div className="stat-n">2</div>
              <div className="stat-l">AI-powered projects shipped</div>
            </div>
            <div className="stat-block rv d2">
              <div className="stat-n">12+</div>
              <div className="stat-l">Technologies mastered</div>
            </div>
          </div>
          <div>
            <p className="about-bio rv">
              I&apos;m a <strong>Full Stack Software Engineer</strong> studying Computer Science at{" "}
              <strong>UNIFOR</strong> and currently building internal web platforms at{" "}
              <em>Casa dos Ventos</em> — one of Brazil&apos;s largest renewable energy companies.
              <br />
              <br />
              I thrive at the intersection of <strong>engineering and design</strong> — shipping
              well-architected backends and interfaces that actually feel good to use. I&apos;m drawn
              to products that solve real problems with clarity and craft.
            </p>

            <div className="rv d1" style={{ marginBottom: "28px" }}>
              <div className="sub-label">Career</div>
              <div className="exp">
                <div className="exp-top">
                  <div>
                    <div className="exp-co">Casa dos Ventos</div>
                    <div className="exp-role">Software Development Intern</div>
                  </div>
                  <div className="exp-date">Oct 2025 — Present</div>
                </div>
                <ul className="exp-list">
                  <li>Built and maintained internal web apps with React, Next.js, TypeScript &amp; Node.js</li>
                  <li>Integrated REST APIs with Swagger docs and managed PostgreSQL via TypeORM</li>
                  <li>Supported CI/CD pipelines, Docker containerization, and GCP deployments</li>
                  <li>Collaborated across dev, product &amp; design in Scrum/Kanban ceremonies</li>
                </ul>
              </div>
            </div>

            <div className="rv d2" style={{ marginBottom: "28px" }}>
              <div className="sub-label">Education</div>
              <div className="exp">
                <div className="exp-top">
                  <div>
                    <div className="exp-co">UNIFOR</div>
                    <div className="exp-role">B.Sc. Computer Science</div>
                  </div>
                  <div className="exp-date">2024 — 2027</div>
                </div>
                <ul className="exp-list">
                  <li>University of Fortaleza — actively building alongside my degree</li>
                </ul>
              </div>
            </div>

            <div className="rv d3">
              <div className="sub-label">Certifications</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="https://www.credly.com/badges/c1394137-c5da-444f-95ec-da91b55e8c9a/linked_in?t=t9hiu3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                >
                  <div className="cert-card-icon gcp-ico">
                    <img
                      src="/google-icon.png"
                      alt="Google Cloud"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="cert-card-info">
                    <div className="cert-card-name">Google Associate Cloud Engineer</div>
                    <div className="cert-card-meta">Google Cloud · 2026</div>
                  </div>
                  <span className="cert-card-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
