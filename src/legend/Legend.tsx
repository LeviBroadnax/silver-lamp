import React from "react";
import styles from "./Legend.module.css";

export default function Legend() {
  return (
    <div className={styles.fade}>
      <div className={styles.legend}>
        <div className={styles.legendItem}> {EnterKeyIcon()} Guess</div>
        <div className={styles.legendItem}> {ShiftKeyIcon()} Flip</div>
        <div className={styles.legendItem}>
          {CtrlKeyIcon()}
          {BackspaceKeyIcon()} Clear
        </div>
      </div>
    </div>
  );
}
const ShiftKeyIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='30px'>
    <path d='M15,18V12H17.17L12,6.83L6.83,12H9V18H15M12,4L22,14H17V20H7V14H2L12,4Z' />
  </svg>
);

const EnterKeyIcon = () => (
  <svg width='30px' height='30px' viewBox='0 -100 1200 1200'>
    <path d='M808.969,133.929v257.06H942.94v267.899H417.981V508.763L0,787.417	l417.982,278.654V915.946h524.959H1200V658.888V390.988v-257.06H942.941H808.969L808.969,133.929z' />
  </svg>
);

const CtrlKeyIcon = () => (
  <svg
    width='30px'
    height='30px'
    viewBox='0 -2 16 16'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M9 7v-1h-1v-1h-1v1h-0.5v1h0.5v3.56c0.176 0.835 0.907 1.453 1.783 1.453 0.077 0 0.152-0.005 0.226-0.014l-0.009-0.999c-0.055 0.012-0.119 0.019-0.185 0.019-0.359 0-0.669-0.21-0.813-0.514l-0.002-3.505h1z'></path>
    <path d='M14 3h1v9h-1v-9z'></path>
    <path d='M13 6c-0.025-0.001-0.055-0.001-0.085-0.001-0.773 0-1.462 0.358-1.911 0.917l-0.004-0.915h-1v6h1v-3c-0.003-0.037-0.004-0.080-0.004-0.124 0-1.038 0.842-1.88 1.88-1.88 0.044 0 0.087 0.001 0.13 0.004l-0.006-1z'></path>
    <path d='M4.19 12c-2.030 0-3.19-1.46-3.19-4s1.16-4 3.19-4c0.009-0 0.019-0 0.029-0 0.539 0 1.052 0.114 1.515 0.32l-0.424 0.901c-0.319-0.139-0.69-0.22-1.080-0.22-0.014 0-0.028 0-0.042 0-1.808-0-2.188 1.63-2.188 3s0.38 3 2.19 3c0.497-0.013 0.96-0.145 1.366-0.368l0.444 0.898c-0.524 0.285-1.146 0.458-1.806 0.47z'></path>
  </svg>
);

const BackspaceKeyIcon = () => (
  <svg width='24px' height='24px' viewBox='0 -1 24 24'>
    <rect width='24' height='24' fill='rgba(0,0,0,0)' />
    <path d='M12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289C10.9024 9.68342 10.9024 10.3166 11.2929 10.7071L12.5858 12L11.2929 13.2929C10.9024 13.6834 10.9024 14.3166 11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L14 13.4142L15.2929 14.7071C15.6834 15.0976 16.3166 15.0976 16.7071 14.7071C17.0976 14.3166 17.0976 13.6834 16.7071 13.2929L15.4142 12L16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289C16.3166 8.90237 15.6834 8.90237 15.2929 9.29289L14 10.5858L12.7071 9.29289ZM8.77588 4.74227C9.32276 4.26375 10.0247 4 10.7514 4H16.3519C17.3317 4 18.1872 4.05119 18.9099 4.21181C19.644 4.37495 20.3008 4.66396 20.8184 5.18153C21.336 5.6991 21.625 6.35596 21.7881 7.09002C21.9487 7.81273 21.9999 8.66827 21.9999 9.648V14.352C21.9999 15.3317 21.9487 16.1873 21.7881 16.91C21.625 17.644 21.336 18.3009 20.8184 18.8185C20.3008 19.336 19.644 19.6251 18.9099 19.7882C18.1872 19.9488 17.3317 20 16.3519 20H10.7514C10.0247 20 9.32276 19.7362 8.77588 19.2577L3.0616 14.2577C1.69562 13.0625 1.69561 10.9375 3.06159 9.74227L8.77588 4.74227Z' />
  </svg>
);
