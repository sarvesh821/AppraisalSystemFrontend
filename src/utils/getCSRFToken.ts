const getCSRFToken = (): string | null => {
    const name = 'csrftoken=';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};
export default getCSRFToken