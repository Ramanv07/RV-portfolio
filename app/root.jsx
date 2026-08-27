import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import { createCookieSessionStorage, json } from '@remix-run/node';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { useEffect } from 'react';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import config from '~/config.json';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';

export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request, context }) => {
  const { url } = request;
  const { pathname } = new URL(url);
  const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : url;
  const canonicalUrl = `${config.url}${pathnameSliced}`;

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET || ' '],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  const theme = session.get('theme') || 'dark';

  return json(
    { canonicalUrl, theme },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export default function App() {
  let { canonicalUrl, theme } = useLoaderData();
  const fetcher = useFetcher();
  const { state } = useNavigation();

  if (fetcher.formData?.has('theme')) {
    theme = fetcher.formData.get('theme');
  }

  function toggleTheme(newTheme) {
    fetcher.submit(
      { theme: newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark' },
      { action: '/api/set-theme', method: 'post' }
    );
  }



  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raman Vishwari",
    "alternateName": "रमन विश्वारी",
    "url": "https://ramanvishwari.ziaftra.in",
    "image": "https://ramanvishwari.ziaftra.in/raman-vishwari.jpg",
    "description": "Raman Vishwari is a MERN Full-Stack Developer and tech entrepreneur based in Bhopal, India. MCA scholar at LNCT, founder of Ziaftra.in, creator of Rahiway.online, and co-founder of PromptPlease.in. Specializes in Three.js 3D web animations, React Native mobile apps, SAP ABAP, SAP Fiori, and scalable system design.",
    "jobTitle": "Full-Stack Developer & Tech Entrepreneur",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Lakshmi Narain College of Technology (LNCT), Bhopal"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Maharaja Chhatrasal Bundelkhand University (MCBU), Chhatarpur"
      }
    ],
    "knowsAbout": [
      "MERN Stack",
      "Full-Stack Web Development",
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "React Native",
      "Three.js",
      "GSAP",
      "WebGL",
      "SAP ABAP",
      "SAP Fiori",
      "SAPUI5",
      "SAP BTP",
      "System Design",
      "REST API",
      "GraphQL",
      "Web3",
      "UI/UX Design",
      "JavaScript",
      "TypeScript"
    ],
    "areaServed": [
      "Bhopal, MP",
      "Chhatarpur, MP",
      "Khajuraho, MP",
      "Indore, MP",
      "Gwalior, MP",
      "Panna, MP",
      "Nowgong, MP",
      "Pune, Maharashtra",
      "Delhi",
      "All India"
    ],
    "founderOf": [
      {
        "@type": "Organization",
        "name": "Ziaftra",
        "url": "https://ziaftra.in",
        "description": "A hyper-focused design and custom development studio"
      },
      {
        "@type": "Organization",
        "name": "Rahiway",
        "url": "https://rahiway.online",
        "description": "AI-powered project-first collaboration platform for students and developers"
      },
      {
        "@type": "Organization",
        "name": "Prompt Please",
        "url": "https://promptplease.in",
        "description": "AI prompt engineering platform"
      }
    ],
    "sameAs": [
      "https://github.com/ramanv07",
      "https://www.linkedin.com/in/raman-vishwari",
      "https://instagram.com/_ramanvishwari_bh"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Raman Vishwari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Raman Vishwari is a MERN Full-Stack Developer and tech entrepreneur based in Bhopal, India. He is an MCA scholar at LNCT Bhopal, the founder of Ziaftra.in (a design and development studio), creator of Rahiway.online (an AI collaboration platform), and co-founder of PromptPlease.in. He specializes in Three.js 3D web animations, React Native mobile apps, SAP ABAP, and SAP Fiori."
        }
      },
      {
        "@type": "Question",
        "name": "What does Raman Vishwari do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Raman Vishwari builds immersive 3D web experiences using Three.js, GSAP, and WebGL, cross-platform mobile apps with React Native, and scalable backend systems with the MERN stack. He also learns SAP ABAP and SAP Fiori for enterprise business solutions. He is the founder of Ziaftra.in and Rahiway.online."
        }
      },
      {
        "@type": "Question",
        "name": "What services does Ziaftra offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ziaftra, founded by Raman Vishwari, offers premium web design, MERN stack full-stack development, React Native mobile app development, 3D web animation, and AI-powered solutions for clients across Bhopal, MP, and all of India."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Raman Vishwari from?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Raman Vishwari is based in Bhopal, Madhya Pradesh, India. He studied at Maharaja Chhatrasal Bundelkhand University (MCBU) in Chhatarpur and is currently pursuing his MCA at Lakshmi Narain College of Technology (LNCT) in Bhopal."
        }
      }
    ]
  };

  const siteNameLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Raman Vishwari",
    "alternateName": ["Ziaftra", "Rahiway", "Prompt Please"],
    "url": "https://ramanvishwari.ziaftra.in"
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme color doesn't support oklch so I'm hard coding these hexes for now */}
        <meta name="theme-color" content={theme === 'dark' ? '#111' : '#F2F2F2'} />
        <meta
          name="color-scheme"
          content={theme === 'light' ? 'light dark' : 'dark light'}
        />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameLd) }}
        />
      </head>
      <body data-theme={theme}>
        <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
          <Progress />
          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
            Skip to main content
          </VisuallyHidden>
          <Navbar />
          <main
            id="main-content"
            className={styles.container}
            tabIndex={-1}
            data-loading={state === 'loading'}
          >
            <Outlet />
          </main>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark">
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
