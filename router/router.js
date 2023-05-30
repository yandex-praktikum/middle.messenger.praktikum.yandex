import {routes} from "./routes.js"
import Error from "../src/pages/clientError/ClientError.js"

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

export const router = () => {
  const path = parseLocation();
  
  const { component = Error} = findComponentByPath(path, routes) || {};
  document.getElementById('root').innerHTML = component();
};
