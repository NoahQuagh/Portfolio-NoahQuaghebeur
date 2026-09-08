function getCurrentLang() {
    const match = document.cookie.match(/(?:^|; )user_lang=([^;]*)/);
    return match ? match[1] : 'fr';
}

const lang = getCurrentLang();
