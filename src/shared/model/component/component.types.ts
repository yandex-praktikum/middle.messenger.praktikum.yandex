type Events = Record<string, () => void>;

interface ComponentProps {
  events?: Events;
}

export type { ComponentProps };
