import './error404.sass';
import { Page404 } from './error404';
import { error404 } from '../../components/error/index';
import { render } from '../../utils/render';

const errorPage404 = new Page404({
  error404: error404,
});

render('.root', errorPage404);
