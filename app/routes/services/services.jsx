import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment } from 'react';
import styles from './services.module.css';

const services = [
  {
    number: '01',
    title: 'High-End Web Apps',
    description: 'Custom-built, highly scalable full-stack applications. We utilize React, Next.js, and modern backend architectures to build dashboards, SaaS platforms, and internal tools that are stupidly fast and completely bespoke.',
    tags: ['React / Next.js', 'Supabase', 'Tailwind CSS']
  },
  {
    number: '02',
    title: 'Premium Portfolios',
    description: 'Brutalist aesthetics meets WebGL. We build visually striking landing pages and portfolios that command attention and convert high-ticket clients.',
    tags: ['Three.js', 'GSAP']
  },
  {
    number: '03',
    title: 'Rapid Prototyping',
    description: 'Have an idea? We get startups from 0 to 1 ridiculously fast. We build functional MVPs (Minimum Viable Products) in weeks, not months, so you can test the market and pitch investors with real software.',
    tags: ['Ship It.']
  },
  {
    number: '04',
    title: 'Custom AI Assistants',
    description: 'Deploy a custom-trained LLM assistant directly onto your codebase. No generic widgets. No WordPress plugins. Strictly custom integrations for React, Next.js, and modern web apps.',
    tags: ['RAG Ready', 'social_pipeline.py']
  },
  {
    number: '05',
    title: 'Social Media Pipelines',
    description: 'Bespoke, private dashboards that automatically scrape, edit, caption, and post video content across IG, YouTube, and TikTok without lifting a finger.',
    tags: ['Python / Composio']
  },
  {
    number: '06',
    title: 'Internal Dashboards',
    description: 'The "behind-the-scenes" software that runs a company. Custom CRMs, applicant tracking, or student matching powered by complex relational databases.',
    tags: ['React / Supabase']
  },
  {
    number: '07',
    title: 'Workflow Automation',
    description: 'We write custom Python and Node.js pipelines that replace your interns. Automate data collection, lead generation, or syllabus creation natively.',
    tags: ['Node.js / Python']
  },
  {
    number: '08',
    title: 'Rescue & Optimization',
    description: 'Taking a slow, bloated Webflow or WordPress site built by a cheap agency, and rewriting it in pure Next.js to achieve perfect 100/100 Lighthouse scores.',
    tags: ['Next.js / Vite']
  }
];

const stack = [
  {
    number: '01',
    title: 'Frontend Architecture',
    tech: 'React / Next.js / Vite\nComplex State (Zustand)\nWebGL & Three.js\nFramer Motion / GSAP\nBrutalist UI Engineering'
  },
  {
    number: '02',
    title: 'Backend & API',
    tech: 'Node.js / Express\nREST & GraphQL APIs\nServerless Architecture\nCustom Webhooks\nAutomated Python Scripts'
  },
  {
    number: '03',
    title: 'Database & Auth',
    tech: 'PostgreSQL Schema\nSupabase Integrations\nReal-time Data Sync\nSecure JWT Auth\nRole-based Access (RBAC)'
  },
  {
    number: '04',
    title: 'Custom Integrations',
    tech: 'LLM APIs (Groq, OpenAI)\nPayment Gateways\nComposio & Make.com\nVideo & Media Processing\nHeadless CMS'
  }
];

const process = [
  {
    number: '1',
    title: 'Strategy & Architecture',
    description: 'We define the scope, map the database schemas, and establish the technical blueprint before a single line of code is written.'
  },
  {
    number: '2',
    title: 'Brutalist Design',
    description: 'We strip away the noise. High contrast, massive typography, and raw aesthetics designed specifically to convert and impress.'
  },
  {
    number: '3',
    title: 'Ship & Scale',
    description: 'We build fast, deploy globally on edge networks, and hand over a production-ready product built to handle massive traffic.'
  }
];

export const Services = () => {
  return (
    <div className={styles.services}>
      <Section className={styles.hero}>
        <Heading as="h1" level={2} className={styles.heroTitle}>
          <DecoderText text="We don't build websites." startText="हम वेबसाइट्स नहीं बनाते।" />
        </Heading>
        <Text className={styles.heroSubtitle}>
          We build digital unfair advantages.<br />
          No templates. No bloat. Just speed.<br />
          We engineer premium, high-velocity digital experiences that dominate your competition.
        </Text>
      </Section>

      <Section className={styles.section}>
        <Heading as="h2" level={3} className={styles.sectionTitle}>
          Our Arsenal
        </Heading>
        <Divider />
        <div className={styles.grid} style={{ marginTop: 'var(--space3XL)' }}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.cardNumber}>{service.number} //</span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <div className={styles.cardTags}>
                {service.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className={styles.section}>
        <Heading as="h2" level={3} className={styles.sectionTitle}>
          Technical Engineering
        </Heading>
        <Divider />
        <div className={styles.stackList}>
          <Heading as="h3" level={4} style={{ margin: 'var(--spaceL) 0' }}>THE STACK.</Heading>
          <Text style={{ marginBottom: 'var(--space2XL)', color: 'var(--textLight)' }}>
            We don't just design. We architect scalable, secure, and blazing-fast software ecosystems.
          </Text>
          
          {stack.map((item, index) => (
            <div key={index} className={styles.stackItem}>
              <span className={styles.stackNumber}>{item.number}</span>
              <span className={styles.stackTitle}>{item.title}</span>
              <div className={styles.stackTech}>
                {item.tech.split('\n').map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className={styles.section}>
        <Heading as="h2" level={3} className={styles.sectionTitle}>
          The ZIAFTRA Process
        </Heading>
        <Divider />
        <div className={styles.processList} style={{ marginTop: 'var(--space3XL)' }}>
          {process.map((step, index) => (
            <div key={index} className={styles.processItem}>
              <span className={styles.processNumber}>{step.number}</span>
              <Heading as="h3" level={5}>{step.title}</Heading>
              <Text style={{ color: 'var(--textLight)' }}>{step.description}</Text>
            </div>
          ))}
        </div>
      </Section>

      <Section className={styles.cta}>
        <Heading as="h2" level={2}>Ready to build?</Heading>
        <Text>
          ZIAFTRA<br />
          We design and develop high-end websites.<br />
          No templates. No bloat. Just speed.
        </Text>
        <Text style={{ color: 'var(--textLight)', fontFamily: 'var(--fontMono)' }}>
          Status: Ready to build<br />
          Bhopal, India
        </Text>
        <Button href="/contact" icon="chevron-right" style={{ marginTop: 'var(--spaceL)' }}>
          Start a Project
        </Button>
      </Section>

      <Footer />
    </div>
  );
};
