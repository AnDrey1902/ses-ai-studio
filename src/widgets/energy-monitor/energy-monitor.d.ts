declare namespace JSX {
  interface IntrinsicElements {
    'energy-monitor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      type?: string;
      power?: string;
      'tariff-home'?: string;
      'tariff-biz'?: string;
      'powers-home'?: string;
      'powers-biz'?: string;
      autoplay?: string;
      'hour-ms'?: string;
      style?: React.CSSProperties;
    };
  }
}
