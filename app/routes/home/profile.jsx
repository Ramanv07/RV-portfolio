import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} as="h2" id={titleId}>
      <DecoderText text="About Raman Vishwari" startText="रमन विश्वारी के बारे में" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Raman Vishwari is a creative MERN Full-Stack Developer and tech entrepreneur based in Bhopal, MP, India. As an MCA scholar at LNCT Bhopal, he specializes in engineering highly performant digital ecosystems—bridging the gap between cutting-edge immersive frontend designs and robust backends.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      His expertise spans interactive 3D web animations using Three.js, WebGL, and GSAP, cross-platform mobile apps with React Native, and scalable architecture built on solid System Design principles.
    </Text>

    <Heading className={styles.title} data-visible={visible} level={4} as="h3" style={{ marginTop: '40px', marginBottom: '16px' }}>
      Cross-Platform Mobile Engineering & System Design
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      He engineers high-performance, cross-platform mobile applications using React Native, ensuring a native-level experience across iOS and Android platforms. Moving beyond basic layouts, his app development methodology centers around scalable System Design principles—implementing strict state management architectures, offline-first synchronization, and optimized REST/GraphQL data fetching layers. By utilizing native bridges and custom performance tuning, he builds fluid mobile products that seamlessly interact with backend MERN microservices and enterprise cloud ecosystems.
    </Text>

    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Driven by a passion for building product-first companies, Raman is the Founder of Ziaftra.in (a hyper-focused design and custom development studio), the creator of Rahiway.online, and the Co-founder of PromptPlease.in. Whether you are looking for an immersive Web3/3D platform or a cloud-ready enterprise integration, Raman and his team can build something incredible.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Portrait of Raman Vishwari"
                />
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
