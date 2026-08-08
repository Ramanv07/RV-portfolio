import { VisuallyHidden } from '~/components/visually-hidden';
import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import { delay } from '~/utils/delay';
import { classes } from '~/utils/style';
import styles from './decoder-text.module.css';

const hindiMap = {
  a: 'अ', b: 'ब', c: 'च', d: 'द', e: 'इ', f: 'फ', g: 'ग', h: 'ह',
  i: 'इ', j: 'ज', k: 'क', l: 'ल', m: 'म', n: 'न', o: 'ओ', p: 'प',
  q: 'क', r: 'र', s: 'स', t: 'त', u: 'उ', v: 'व', w: 'व', x: 'क्ष',
  y: 'य', z: 'ज़', ' ': ' '
};

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(content, position, startText) {
  const result = [];
  const maxLen = Math.max(content.length, startText.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < position) {
      if (i < content.length) {
        result.push({ type: CharType.Value, value: content[i] });
      }
    } else {
      if (i < startText.length) {
        result.push({ type: CharType.Glyph, value: startText[i] });
      }
    }
  }
  return result;
}

export const DecoderText = memo(
  ({ text, startText, start = true, delay: startDelay = 0, className, ...rest }) => {
    const output = useRef([{ type: CharType.Glyph, value: '' }]);
    const container = useRef();
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
      const containerInstance = container.current;
      const content = text.split('');
      
      // Auto-generate startText from hindiMap if not provided
      const actualStartText = startText 
        ? startText.split('') 
        : content.map(char => hindiMap[char.toLowerCase()] || char);
        
      const maxLen = Math.max(content.length, actualStartText.length);

      let animation;

      const renderOutput = () => {
        const characterMap = output.current.map(item => {
          return `<span class="${styles[item.type]}">${item.value}</span>`;
        });

        containerInstance.innerHTML = characterMap.join('');
      };

      const unsubscribeSpring = decoderSpring.on('change', value => {
        output.current = shuffle(content, value, actualStartText);
        renderOutput();
      });

      const startSpring = async () => {
        await delay(startDelay);
        decoderSpring.set(maxLen);
      };

      if (start && !animation && !reduceMotion) {
        startSpring();
      }

      if (reduceMotion) {
        output.current = content.map((value, index) => ({
          type: CharType.Value,
          value: content[index],
        }));
        renderOutput();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, reduceMotion, start, startDelay, text, startText]);

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container} />
      </span>
    );
  }
);
