import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";
import { AsciiField } from "./AsciiField";

export const metadata: Metadata = {
  title: "Design study",
  description: "A technical portfolio design study with an animated ASCII signal field.",
  robots: { index: false, follow: false },
};

export default function DesignStudy() {
  const selected = [projects[0], projects[1], projects[6]];
  const more = projects.filter((project) => !selected.includes(project));

  return (
    <div className={styles.study}>
      <a className={styles.skip} href="#work">Skip to selected work</a>
      <div className={styles.notice}>
        <span>Portfolio / Design study 01</span>
        <Link href="/">Current portfolio ↗</Link>
      </div>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/design" aria-label="Agustin Blaumann home">ab<span>.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact ↗</a>
        </nav>
      </header>
      <main>
        <section className={styles.hero} aria-labelledby="intro">
          <div className={styles.kicker}><span className={styles.dot} /> Agustin Blaumann / Software developer</div>
          <div className={styles.heroHeadline}><h1 id="intro">Curiosity,<br />put to <em>work.</em></h1><AsciiField /></div>
          <div className={styles.heroBottom}>
            <p>I build software to understand things.<br />Baseball, markets, and the systems underneath.</p>
            <div><p>Software Developer at Stax Labs<br />CS & Economics · Rutgers Honors College</p><a className={styles.textLink} href="#work">Explore my work <span>↓</span></a></div>
          </div>
          <div className={styles.disciplines}><span>Systems programming</span><span>Data & research</span><span>Tools for people</span></div>
        </section>

        <section id="work" className={styles.work} aria-labelledby="work-title">
          <div className={styles.sectionTop}><h2 id="work-title">Selected work</h2><span>01 — 03 / Personal projects</span></div>
          {selected.map((project, index) => (
            <article className={styles.project} key={project.name}>
              <div className={styles.projectHeading}><span className={styles.index}>0{index + 1}</span><h3>{project.name}</h3><span className={styles.category}>{project.category}</span></div>
              <div className={styles.projectBody}>
                <div className={`${styles.visual} ${index === 0 ? styles.baseball : index === 1 ? styles.market : styles.notes}`}>
                  {index === 0 ? (
                    <><span className={styles.visualLabel}>Inside the matchup explorer</span><div className={styles.matchup}><span>13<small>pitchers</small></span><i>×</i><span>14<small>hitters</small></span></div><div className={styles.flow}><span>Hitter</span><b>→</b><span>Situation</span><b>→</b><span>Pitch comparison</span></div><p>Count · Base/out state · Supported repertoire</p></>
                  ) : index === 1 ? (
                    <><span className={styles.visualLabel}>Research engine / System map</span><div className={styles.feed}><span>Kalshi</span><span>Polymarket</span><span>BTC spot</span></div><div className={styles.collector}>Collect → Store → Replay</div><div className={styles.strategies}>{Array.from({ length: 6 }, (_, i) => <span key={i}>0{i + 1}</span>)}</div><p>Six paper strategies. Independent ledgers.</p></>
                  ) : (
                    <><span className={styles.visualLabel}>Obsidian KB / Workflow</span><div className={styles.noteTitle}>A little less re-reading.<br /><em>A lot more connecting.</em></div><div className={styles.flow}><span>Sources</span><b>→</b><span>Linked notes</span><b>→</b><span>Answers</span></div><p>Ingest · Query · Lint · Maintain</p></>
                  )}
                </div>
                <div className={styles.projectCopy}><span className={styles.status}>{project.status}</span><p className={styles.description}>{project.description}</p><p className={styles.detail}>{project.outcome}</p><ul className={styles.stack} aria-label="Technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>{project.href && <a className={styles.textLink} href={project.href} target="_blank" rel="noreferrer">Explore the source <span>↗</span></a>}</div>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.archive} aria-labelledby="archive-title">
          <div className={styles.sectionTop}><h2 id="archive-title">More from the workbench</h2><span>Tools, experiments & side quests</span></div>
          {more.map(project => (
            <article key={project.name} className={styles.archiveRow}>
              {project.screenshot && <Image src={project.screenshot} alt={`${project.name} interface`} width={112} height={70} className={styles.thumbnail} />}
              <div><h3>{project.name}</h3><p>{project.description}</p></div><span className={styles.archiveStatus}>{project.status}</span>{project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source code`}>↗</a>}
            </article>
          ))}
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title"><span className={styles.kicker}>Behind the work</span><h2 id="about-title">A broad set of interests.<br /><em>A habit of building.</em></h2><div className={styles.aboutGrid}><p>{siteConfig.about}</p><div><span className={styles.kicker}>Currently</span><p>Building at Stax Labs.<br />Studying CS & economics at Rutgers.<br />Tutoring computer science & math.</p></div></div></section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title"><span className={styles.kicker}>Have something in mind?</span><h2 id="contact-title">Let’s talk<span>↗</span></h2><a href={`mailto:${siteConfig.social.email}`}>{siteConfig.social.email}</a><div><a href={siteConfig.social.github}>GitHub ↗</a><a href={siteConfig.social.linkedin}>LinkedIn ↗</a></div></section>
      </main>
      <footer className={styles.footer}><span>Agustin Blaumann</span><a href="#intro">Back to top ↑</a></footer>
    </div>
  );
}
