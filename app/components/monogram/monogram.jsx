import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="36"
      viewBox="0 0 48 36"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <text x="0" y="26" fontFamily="Playfair Display, Times New Roman, serif" fontSize="28">R</text>
          <text x="18" y="36" fontFamily="Playfair Display, Times New Roman, serif" fontSize="38">V</text>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
