import './error500.sass';
import { Page500 } from './error500';
import { error500 } from '../../components/error/index';
import { render } from '../../utils/render';

const errorPage500 = new Page500({
  error500: error500,
});

render('.root', errorPage500);
