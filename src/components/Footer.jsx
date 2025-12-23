// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { Brain, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Brain className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-2xl font-bold">QuizSep</h2>
                <p className="text-gray-400">Challenge Your Mind</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Platform quiz interaktif terbaik dengan ribuan soal dari berbagai kategori.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              {['/', '/quiz', '/profile'].map((path, idx) => (
                <li key={idx}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {['Home', 'Quiz', 'Profil'][idx]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kategori</h3>
            <ul className="space-y-2">
              {['Matematika', 'Bahasa Inggris', 'Fisika', 'Kimia'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/quiz/${cat}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} QuizSep.
          </p>
          <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
            By:<Heart className="w-3 h-3 text-red-500" /> Taufik Rahman
          </p>
        </div>
      </div>
    </footer>
  )
}