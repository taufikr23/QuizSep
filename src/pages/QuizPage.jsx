import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import {
  Search, ChevronLeft, ChevronRight,
  Telescope, Trophy, Rocket, ChevronDown,
  Brain, Globe, Atom, Beaker, Dna, Castle,
  Mountain, TrendingUp, Star
} from 'lucide-react';

const CATEGORY_CONFIG = {
  'Matematika': {
    gradient: 'from-blue-600/20 via-blue-900/10 to-cyan-600/20',
    darkGradient: 'from-blue-900/30 via-blue-950/20 to-cyan-900/30',
    icon: '∑',
    color: 'text-blue-400',
    iconComponent: <Brain className="w-6 h-6" />,
    primaryElements: 5,
    particleType: 'math',
    bgColor: 'bg-blue-900/20'
  },
  'Bahasa Inggris': {
    gradient: 'from-emerald-600/20 via-emerald-900/10 to-teal-600/20',
    darkGradient: 'from-emerald-900/30 via-emerald-950/20 to-teal-900/30',
    icon: '🇬🇧',
    color: 'text-emerald-400',
    iconComponent: <Globe className="w-6 h-6" />,
    primaryElements: 8,
    particleType: 'letter',
    bgColor: 'bg-emerald-900/20'
  },
  'Fisika': {
    gradient: 'from-purple-600/20 via-purple-900/10 to-violet-600/20',
    darkGradient: 'from-purple-900/30 via-purple-950/20 to-violet-900/30',
    icon: '⚛',
    color: 'text-purple-400',
    iconComponent: <Atom className="w-6 h-6" />,
    primaryElements: 3,
    particleType: 'electron',
    bgColor: 'bg-purple-900/20'
  },
  'Kimia': {
    gradient: 'from-amber-600/20 via-amber-900/10 to-orange-600/20',
    darkGradient: 'from-amber-900/30 via-amber-950/20 to-orange-900/30',
    icon: '🧪',
    color: 'text-amber-400',
    iconComponent: <Beaker className="w-6 h-6" />,
    primaryElements: 6,
    particleType: 'bubble',
    bgColor: 'bg-amber-900/20'
  },
  'Biologi': {
    gradient: 'from-rose-600/20 via-rose-900/10 to-pink-600/20',
    darkGradient: 'from-rose-900/30 via-rose-950/20 to-pink-900/30',
    icon: '🧬',
    color: 'text-rose-400',
    iconComponent: <Dna className="w-6 h-6" />,
    primaryElements: 5,
    particleType: 'cell',
    bgColor: 'bg-rose-900/20'
  },
  'Sejarah': {
    gradient: 'from-yellow-600/20 via-yellow-900/10 to-amber-600/20',
    darkGradient: 'from-yellow-900/30 via-yellow-950/20 to-amber-900/30',
    icon: '📜',
    color: 'text-yellow-400',
    iconComponent: <Castle className="w-6 h-6" />,
    primaryElements: 5,
    particleType: 'timeline',
    bgColor: 'bg-yellow-900/20'
  },
  'Geografi': {
    gradient: 'from-teal-600/20 via-teal-900/10 to-cyan-600/20',
    darkGradient: 'from-teal-900/30 via-teal-950/20 to-cyan-900/30',
    icon: '🌍',
    color: 'text-teal-400',
    iconComponent: <Mountain className="w-6 h-6" />,
    primaryElements: 4,
    particleType: 'island',
    bgColor: 'bg-teal-900/20'
  },
  'Ekonomi': {
    gradient: 'from-indigo-600/20 via-indigo-900/10 to-blue-600/20',
    darkGradient: 'from-indigo-900/30 via-indigo-950/20 to-blue-900/30',
    icon: '📈',
    color: 'text-indigo-400',
    iconComponent: <TrendingUp className="w-6 h-6" />,
    primaryElements: 6,
    particleType: 'money',
    bgColor: 'bg-indigo-900/20'
  }
};

const DIFFICULTY_COLORS = {
  'Mudah': 'from-emerald-500 to-emerald-600',
  'Sedang': 'from-amber-500 to-amber-600',
  'Sulit': 'from-rose-500 to-rose-600'
};

const DIFFICULTY_MAP = {
  'easy': 'Mudah',
  'medium': 'Sedang',
  'hard': 'Sulit',
  'all': 'all'
};

const ITEMS_PER_PAGE = 6;

const ParticleRenderer = React.memo(({ categoryName, config }) => {
  const elements = useMemo(() => {
    if (!config) return [];

    const particleConfig = {
      math: {
        symbols: ['π', '∫', '∞', '√', 'θ'],
        class: 'text-lg opacity-70 animate-math-numbers text-blue-300'
      },
      letter: {
        symbols: Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i)),
        class: 'text-sm animate-letters-float text-emerald-300'
      },
      money: {
        symbols: ['💰', '💵', '💎', '📊', '💹', '🏦'],
        class: 'text-base animate-money-fall'
      },
      electron: {
        count: config.primaryElements,
        class: 'w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg'
      },
      bubble: {
        count: config.primaryElements,
        class: 'rounded-full bg-gradient-to-br from-amber-300/60 to-orange-400/60 backdrop-blur-sm w-3 h-3 animate-bubbles-rise'
      },
      cell: {
        count: config.primaryElements,
        class: 'rounded-full bg-gradient-to-br from-rose-300/60 to-pink-400/60 backdrop-blur-sm w-4 h-4 animate-cells-float'
      },
      timeline: {
        count: config.primaryElements,
        class: 'rounded-full bg-gradient-to-br from-yellow-300/70 to-amber-400/70 w-2 h-2 animate-timeline-glow'
      },
      island: {
        count: config.primaryElements,
        class: 'rounded-full bg-gradient-to-br from-teal-300/50 to-cyan-400/50 w-6 h-3 animate-islands-drift'
      }
    };

    const typeConfig = particleConfig[config.particleType];
    if (!typeConfig) return [];

    if (typeConfig.symbols) {
      return typeConfig.symbols.slice(0, config.primaryElements).map((symbol, i) => ({
        type: 'symbol',
        value: symbol,
        class: typeConfig.class,
        style: {
          top: `${10 + Math.random() * 80}%`,
          left: `${10 + Math.random() * 80}%`,
          animationDelay: `${i * 0.3}s`
        }
      }));
    }

    if (typeConfig.count) {
      return Array.from({ length: typeConfig.count }, (_, i) => ({
        type: config.particleType,
        class: typeConfig.class,
        style: {
          animationDelay: `${i * 0.5}s`,
          ...(config.particleType === 'electron' && {
            marginTop: `-${20 + i * 10}px`,
            marginLeft: `-${20 + i * 10}px`,
            animation: `electron-orbit ${3 + i * 0.5}s linear infinite`
          })
        }
      }));
    }

    return [];
  }, [config]);

  if (!elements.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, idx) => (
        <div
          key={`${categoryName}-${idx}`}
          className={`absolute ${el.class}`}
          style={el.style}
        >
          {el.value}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-gradient-shift" />
    </div>
  );
});

ParticleRenderer.displayName = 'ParticleRenderer';

const CategoryCard = React.memo(({ category, onClick, index }) => {
  const config = CATEGORY_CONFIG[category.name] || CATEGORY_CONFIG['Matematika'];
  const difficultyColor = DIFFICULTY_COLORS[category.difficulty] || 'from-slate-500 to-slate-600';

  return (
    <div
      onClick={() => onClick(category)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 card-hover cursor-pointer animate-slide-up backdrop-blur-sm bg-gradient-to-br from-gray-900/80 to-gray-950/80"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${config.darkGradient} animate-gradient-shift`} />
      <ParticleRenderer categoryName={category.name} config={config} />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine-effect opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>

      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className={`w-14 h-14 ${config.bgColor} rounded-xl flex items-center justify-center text-2xl shadow-2xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all`}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className={`relative ${config.color}`}>{config.icon}</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg border border-white/20">
              {category.questions}
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${difficultyColor} text-white shadow-lg border border-white/20`}>
            {category.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {category.questions} Soal yang Menantang!
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-xs text-gray-500">{category.popularity}% popular</span>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold shadow-2xl group-hover:shadow-purple-500/30 group-hover:scale-105 transition-all flex items-center gap-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative">Mulai</span>
            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryCard.displayName = 'CategoryCard';

const QuizPage = () => {
  const navigate = useNavigate();
  const { categories: quizCategories, QUESTIONS_PER_QUIZ } = useQuiz();
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    searchTerm: '',
    difficulty: 'all',
    sortBy: 'name',
    currentPage: 1
  });

  const enhancedCategories = useMemo(() => {
    return quizCategories.map(cat => {
      const config = CATEGORY_CONFIG[cat.name] || CATEGORY_CONFIG['Matematika'];
      const difficulties = ['Mudah', 'Sedang', 'Sulit'];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

      return {
        ...cat,
        questions: QUESTIONS_PER_QUIZ,
        difficulty: randomDifficulty,
        popularity: Math.floor(Math.random() * 100),
        ...config
      };
    });
  }, [quizCategories, QUESTIONS_PER_QUIZ]);

  const filteredCategories = useMemo(() => {
    let result = [...enhancedCategories];

    // Filter berdasarkan pencarian
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(cat => cat.name.toLowerCase().includes(term));
    }

    // Filter berdasarkan kesulitan (FIXED)
    if (filters.difficulty !== 'all') {
      const difficultyToFilter = DIFFICULTY_MAP[filters.difficulty];
      if (difficultyToFilter && difficultyToFilter !== 'all') {
        result = result.filter(cat => cat.difficulty === difficultyToFilter);
      }
    }

    // Sort berdasarkan pilihan
    const sortFunctions = {
      name: (a, b) => a.name.localeCompare(b.name),
      difficulty: (a, b) => {
        const order = { 'Mudah': 1, 'Sedang': 2, 'Sulit': 3 };
        return order[a.difficulty] - order[b.difficulty];
      },
      popularity: (a, b) => b.popularity - a.popularity
    };

    return result.sort(sortFunctions[filters.sortBy] || sortFunctions.name);
  }, [enhancedCategories, filters]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCategories, filters.currentPage]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const handleCategoryClick = (category) => {
    if (!user) {
      navigate('/login');
      return;
    }

    navigate(`/quiz/${category.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 p-4 pt-16 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-full blur-3xl" />

        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Jelajahi <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Pengetahuan Kosmik</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih kategori untuk memulai perjalanan belajar antarbintang Anda. Setiap kuis berisi {QUESTIONS_PER_QUIZ} soal menantang dengan batas waktu 5 menit.
          </p>
        </div>

        <div className="rounded-xl shadow-lg p-4 mb-6 animate-fade-in backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <div className="relative group">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kategori..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value, currentPage: 1 }))}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm text-sm"
                />
              </div>
            </div>

            <div className="relative group">
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value, currentPage: 1 }))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 text-white transition-all backdrop-blur-sm appearance-none text-sm"
              >
                <option value="all" className="bg-gray-900">Semua Level</option>
                <option value="easy" className="bg-gray-900">Mudah</option>
                <option value="medium" className="bg-gray-900">Sedang</option>
                <option value="hard" className="bg-gray-900">Sulit</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative group">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value, currentPage: 1 }))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-white transition-all backdrop-blur-sm appearance-none text-sm"
              >
                <option value="name" className="bg-gray-900">Urutkan Nama</option>
                <option value="difficulty" className="bg-gray-900">Urutkan Kesulitan</option>
                <option value="popularity" className="bg-gray-900">Urutkan Popularitas</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                <span className="font-semibold text-white">{filteredCategories.length}</span> kategori
              </div>
              {filters.searchTerm && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}
                  className="px-2 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Perlu login terlebih dahulu?</div>
            <Link
              to={user ? '/profile' : '/login'}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              {user ? 'Lihat statistik Anda →' : 'Login untuk melacak progres →'}
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Telescope className="w-5 h-5 text-purple-400 animate-pulse" />
            Temukan Kategori
            <span className="text-xs font-normal text-gray-500 ml-1">
              ({paginatedCategories.length} ditampilkan)
            </span>
          </h2>

          {paginatedCategories.length === 0 ? (
            <div className="text-center py-12 rounded-xl shadow-lg backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
              <div className="text-5xl mb-3">🔭</div>
              <h3 className="text-lg font-semibold text-white mb-1">Tidak ada kategori ditemukan</h3>
              <p className="text-gray-500 text-sm">Coba sesuaikan filter kosmik Anda</p>
              <button
                onClick={() => setFilters({ searchTerm: '', difficulty: 'all', sortBy: 'name', currentPage: 1 })}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm hover:shadow-lg"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedCategories.map((cat, index) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onClick={handleCategoryClick}
                    index={index}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-8">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                    disabled={filters.currentPage === 1}
                    className="p-1.5 rounded border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = filters.currentPage <= 3 ? i + 1 :
                      filters.currentPage >= totalPages - 2 ? totalPages - 4 + i :
                        filters.currentPage - 2 + i;

                    return (
                      <button
                        key={page}
                        onClick={() => setFilters(prev => ({ ...prev, currentPage: page }))}
                        className={`w-8 h-8 rounded text-xs font-medium transition-all backdrop-blur-sm ${filters.currentPage === page
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110 border border-white/20'
                            : 'border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-sm'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setFilters(prev => ({ ...prev, currentPage: Math.min(totalPages, prev.currentPage + 1) }))}
                    disabled={filters.currentPage === totalPages}
                    className="p-1.5 rounded border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <span className="text-gray-500 text-xs ml-3">
                    Halaman {filters.currentPage} dari {totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {!user && (
          <div className="mt-8 p-6 rounded-xl backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Lacak Progres Anda</h3>
                  <p className="text-gray-400 text-sm">Login untuk menyimpan hasil kuis dan melacak perjalanan belajar Anda</p>
                </div>
              </div>
              <Link
                to="/login"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Login Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;