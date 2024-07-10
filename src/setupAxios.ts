import axios from 'axios';
import getCSRFToken from './utils/getCSRFToken';

// Set CSRF token headers
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const csrfToken = getCSRFToken();
if (csrfToken) {
    axios.defaults.headers.common['X-CSRFTOKEN'] = csrfToken;
}
export default axios;