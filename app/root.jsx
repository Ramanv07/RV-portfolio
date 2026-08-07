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
    "url": "https://ramanvishwari.ziaftra.in",
    "jobTitle": "Full-Stack Developer, SAP Consultant & Tech Entrepreneur",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhopal",
      "addressCountry": "India"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Lakshmi Narain College of Technology (LNCT), Bhopal"
    },
    "knowsAbout": [
      "MERN Stack",
      "React Native",
      "Three.js",
      "GSAP",
      "SAP UI5",
      "SAP Fiori",
      "SAP ABAP",
      "SAP BTP",
      "System Design",
      "Web3"
    ],
    "founderOf": [
      {
        "@type": "Organization",
        "name": "Ziaftra",
        "url": "https://ziaftra.in"
      },
      {
        "@type": "Organization",
        "name": "Rahiway",
        "url": "https://rahiway.online"
      },
      {
        "@type": "Organization",
        "name": "Prompt Please",
        "url": "https://promptplease.in"
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
          "text": "Raman Vishwari is a top web developer, SAP Fiori/ABAP consultant, and MERN Full Stack developer based in Bhopal, MP, India. He is an alumnus of LNCT Bhopal and the founder of Rahiway and Ziaftra AI, and co-founder of PromptPlease."
        }
      },
      {
        "@type": "Question",
        "name": "Who is the best web developer in Bhopal and Khajuraho?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Raman Vishwari is highly regarded as one of the best web developers in Bhopal, Chhatarpur, and Khajuraho. He specializes in creating modern, high-performance websites and enterprise SAP solutions."
        }
      },
      {
        "@type": "Question",
        "name": "What services do Ziaftra Dev and Rahiway offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ziaftra AI and Ziaftra Dev, founded by Raman Vishwari, offer premium web design, MERN stack full-stack development, AI solutions, and SAP Fiori/ABAP development services globally and locally in MP, India."
        }
      },
      {
        "@type": "Question",
        "name": "Bhopal me website banane wala sabse acha developer kaun hai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bhopal me website banwane ke liye Raman Vishwari (Founder of Ziaftra) ek best choice hain. Unhe MERN stack, Web Design, aur Enterprise SAP development me kaafi experience hai."
        }
      }
    ]
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
