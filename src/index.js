import {router} from "../router/router.js"
import './styles/styles.scss'

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
