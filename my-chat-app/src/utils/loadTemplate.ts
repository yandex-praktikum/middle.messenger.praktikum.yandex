import fs from 'fs';
import Handlebars from 'handlebars';

export function loadTemplate(path: string) {
  const template = fs.readFileSync(path, 'utf8');
  return Handlebars.compile(template);
}
