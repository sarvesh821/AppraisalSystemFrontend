import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchCSRFToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/csrf-token/');
        const csrfToken = response.data.csrfToken;
        Cookies.set('csrftoken', csrfToken); // Store token in cookies
        return csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};