import './App.scss'
import { useEffect, useState } from 'react'

function App() {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

    useEffect(() => {
        localStorage.setItem('lang', lang)
    }, [lang])

    const languages = ['en', 'ru', 'uz']

    const greetingByLang = (lang) => {
        switch (lang) {
            case 'uz':
                return 'Salom! Mening ismim Zahiriddin.'
            case 'ru':
                return 'Привет! Меня зовут Заха.'
            default:
                return "Hello! I'm Zaha."
        }
    }

    return (
        <div className="MainPage">
            <div className="Greeting">
                <h1>{greetingByLang(lang)}</h1>
            </div>
            <div className="Lang">
                {languages.map((l) => (
                    <div id={l} key={l} onClick={() => setLang(l)}>
                        {l}
                    </div>
                ))}
            </div>
            <div className="Contacts">
                <a
                    href="mailto:z@adhamov.com}"
                    target="_blank"
                    className="Mail"
                    rel="noreferrer"
                >
                    📧mail
                </a>
                <a
                    href=" https://telegram.me/zahadhamov"
                    target="_blank"
                    className="Telegram"
                >
                    ✈️telegram
                </a>
                <a
                    href="https://github.com/novda"
                    target="_blank"
                    className="Github"
                    rel="noreferrer"
                >
                    👨‍💻github{' '}
                </a>
            </div>
        </div>
    )
}

export default App
