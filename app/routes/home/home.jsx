import ziaftraTexture from '~/assets/ziaftra.jpg';
import rahiwayTexture from '~/assets/rahiway.jpg';
import rahiwayTexture2 from '~/assets/rahiway1.jpg';
import promptpleaseTexture from '~/assets/promptplease.jpg';
import bhumisTexture from '~/assets/bhumis.jpg';
import bhumisTexture2 from '~/assets/bhumis1.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return [
    ...baseMeta({
      title: 'Raman Vishwari | Portfolio',
      description: 'Portfolio of Raman Vishwari: Founder of Ziaftra.in & Rahiway.online, Co-founder of PromptPlease.in. MCA student at LNCT Bhopal specializing in MERN Stack, Three.js 3D animation, GSAP, and React Native.',
    }),
    {
      name: 'keywords',
      content: 'Raman Vishwari, Ziaftra founder, PromptPlease co-founder, Rahiway online, MERN stack developer, web developer, best web service provider, website banne bala, web designer, LNCT Bhopal MCA, MCBU, Chhatarpur MP, Khajuraho MP, Bhopal MP, Indore, Gwalior, Pune, Delhi, Panna MP, Nowgong MP, pan-India web developer, Three.js developer, GSAP animation expert, System Design engineer'
    },
    { property: 'og:title', content: 'Raman Vishwari | MERN Full Stack Developer & Founder' },
    { property: 'og:description', content: 'Explore advanced 3D web animation, mobile apps, and full-stack solutions built by Raman Vishwari. Founder of Ziaftra, Rahiway, and Prompt Please.' },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: 'https://ramanvishwari.ziaftra.in/' }
  ];
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Ziaftra"
        description="An AI-first digital agency providing modern web development (MERN stack) and automation solutions."
        buttonText="View website"
        buttonLink="https://ziaftra.in/"
        buttonTitle="Ziaftra Web Development Studio Bhopal"
        model={{
          type: 'laptop',
          alt: 'Ziaftra website on laptop',
          textures: [
            {
              srcSet: `${ziaftraTexture} 1280w, ${ziaftraTexture} 2560w`,
              placeholder: ziaftraTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Rahiway"
        description="Startup project focusing on innovative digital solutions"
        buttonText="View website"
        buttonLink="https://rahiway.online"
        buttonTitle="Rahiway Online Digital Solutions"
        model={{
          type: 'phone',
          alt: 'Rahiway on mobile',
          textures: [
            {
              srcSet: `${rahiwayTexture} 375w, ${rahiwayTexture} 750w`,
              placeholder: rahiwayTexture,
            },
            {
              srcSet: `${rahiwayTexture2} 375w, ${rahiwayTexture2} 750w`,
              placeholder: rahiwayTexture2,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Prompt Please"
        description="An AI prompt engineering platform to help users maximize the potential of LLMs."
        buttonText="View website"
        buttonLink="https://promptplease.in/"
        buttonTitle="PromptPlease AI Platform"
        model={{
          type: 'laptop',
          alt: 'Prompt Please website',
          textures: [
            {
              srcSet: `${promptpleaseTexture} 1280w, ${promptpleaseTexture} 2560w`,
              placeholder: promptpleaseTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Bhumi's Makeover"
        description="Customer website for makeup and beauty services"
        buttonText="View website"
        buttonLink="https://bhumismakeover.vercel.app/"
        model={{
          type: 'phone',
          alt: 'Bhumi\'s Makeover website',
          textures: [
            {
              srcSet: `${bhumisTexture} 375w, ${bhumisTexture} 750w`,
              placeholder: bhumisTexture,
            },
            {
              srcSet: `${bhumisTexture2} 375w, ${bhumisTexture2} 750w`,
              placeholder: bhumisTexture2,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
