export type linkProps = {
  title: string;
  href: string;
  className?: string;
};

export const link = ({ title = "", href = "", className = "" }: linkProps) => {
  return `<a rel="link" class="${className}" href="${href}">${title}</a>`;
};

