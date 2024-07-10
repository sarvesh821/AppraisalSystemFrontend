const getCSRFToken = (): string | null => {
    const name = 'csrftoken';
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
};

export default getCSRFToken;