export type inputProps = {
  type: string;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: string;
  name?: string;
};

export const input = ({
  type = "text",
  value = "",
  placeholder = "",
  className = "",
  disabled = "",
  name = "",
}: inputProps) => {
  const disabledContent = disabled === "true" ? 'disabled="disabled"' : "";
  if (type === "textarea")
    return `<textarea name="${name}" class="${className}" placeholder="${placeholder}">${value}</textarea>`;
  return `<input name="${name}" type="${type}" class="${className}" value="${value}" placeholder="${placeholder}" ${disabledContent}>`;
};
