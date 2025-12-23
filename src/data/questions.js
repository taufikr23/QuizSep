// File questions.js - VERSI VALIDASI (semua jawaban sudah benar)
export const categories = [
  { id: 1, name: 'Matematika' },
  { id: 2, name: 'Bahasa Inggris' },
  { id: 3, name: 'Fisika' },
  { id: 4, name: 'Kimia' },
  { id: 5, name: 'Biologi' },
  { id: 6, name: 'Sejarah' },
  { id: 7, name: 'Geografi' },
  { id: 8, name: 'Ekonomi' }
]

export const initialQuestions = [
  // ========== MATEMATIKA ==========
  {
    id: 1,
    question: 'Berapakah hasil dari 15 × 8?',
    category: 'Matematika',
    options: ['100', '110', '120', '130'],
    correctAnswer: 2, // C (120) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '15 × 8 = 120'
  },
  {
    id: 2,
    question: 'Berapakah hasil dari √144?',
    category: 'Matematika',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2, // C (12) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '√144 = 12 karena 12 × 12 = 144'
  },
  {
    id: 3,
    question: 'Berapakah hasil dari 25²?',
    category: 'Matematika',
    options: ['500', '550', '600', '625'],
    correctAnswer: 3, // D (625) ✓ BENAR
    difficulty: 'Sedang',
    explanation: '25² = 25 × 25 = 625'
  },
  {
    id: 4,
    question: 'Berapakah hasil dari 3/4 + 1/2?',
    category: 'Matematika',
    options: ['1/4', '5/4', '3/8', ' 9/4'],
    correctAnswer: 1, // B (5/4) ✓ BENAR
    difficulty: 'Sedang',
    explanation: '3/4 + 1/2 = 3/4 + 2/4 = 5/4'
  },
  {
    id: 5,
    question: 'Nilai x dari persamaan 2x + 5 = 15 adalah...',
    category: 'Matematika',
    options: ['5', '10', '15', '20'],
    correctAnswer: 0, // A (5) ✓ BENAR
    difficulty: 'Sedang',
    explanation: '2x + 5 = 15 → 2x = 10 → x = 5'
  },
  {
    id: 6,
    question: 'Berapakah 30% dari 200?',
    category: 'Matematika',
    options: ['40', '50', '60', '70'],
    correctAnswer: 2, // C (60) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '30% × 200 = 0.3 × 200 = 60'
  },
  {
    id: 7,
    question: 'Berapakah hasil dari 7² + 8²?',
    category: 'Matematika',
    options: ['100', '110', '113', '120'],
    correctAnswer: 2, // C (113) ✓ BENAR
    difficulty: 'Sedang',
    explanation: '7² = 49, 8² = 64, 49 + 64 = 113'
  },

  // ========== BAHASA INGGRIS ==========
  {
    id: 8,
    question: 'What is the past tense of "go"?',
    category: 'Bahasa Inggris',
    options: ['goed', 'went', 'goes', 'going'],
    correctAnswer: 1, // B (went) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'The past tense of "go" is "went"'
  },
  {
    id: 9,
    question: 'Synonym dari "happy" adalah...',
    category: 'Bahasa Inggris',
    options: ['Sad', 'Angry', 'Joyful', 'Tired'],
    correctAnswer: 2, // C (Joyful) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '"Joyful" memiliki arti yang sama dengan "happy"'
  },
  {
    id: 10,
    question: 'Simple present tense dari kata kerja "to be" untuk subjek "he/she/it" adalah...',
    category: 'Bahasa Inggris',
    options: ['am', 'are', 'is', 'be'],
    correctAnswer: 2, // C (is) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'He/She/It menggunakan "is" dalam simple present tense'
  },
  {
    id: 11,
    question: '"How are you?" merupakan contoh kalimat...',
    category: 'Bahasa Inggris',
    options: ['Declarative', 'Interrogative', 'Imperative', 'Exclamatory'],
    correctAnswer: 1, // B (Interrogative) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '"How are you?" adalah kalimat tanya (interrogative)'
  },
  {
    id: 12,
    question: 'Kata "beautiful" termasuk dalam kelas kata...',
    category: 'Bahasa Inggris',
    options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    correctAnswer: 2, // C (Adjective) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '"Beautiful" adalah adjective (kata sifat) yang berarti cantik/indah'
  },
  {
    id: 13,
    question: 'Arti dari kata "diligent" adalah...',
    category: 'Bahasa Inggris',
    options: ['Malas', 'Rajin', 'Cerdas', 'Kaya'],
    correctAnswer: 1, // B (Rajin) ✓ BENAR
    difficulty: 'Mudah',
    explanation: '"Diligent" berarti rajin atau tekun'
  },
  {
    id: 14,
    question: 'Plural form dari "child" adalah...',
    category: 'Bahasa Inggris',
    options: ['childs', 'children', 'childes', 'childern'],
    correctAnswer: 1, // B (children) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Bentuk jamak dari "child" adalah "children"'
  },

  // ========== FISIKA ==========
  {
    id: 15,
    question: 'Siapa penemu hukum gravitasi?',
    category: 'Fisika',
    options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
    correctAnswer: 1, // B (Isaac Newton) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Isaac Newton menemukan hukum gravitasi'
  },
  {
    id: 16,
    question: 'Hukum Newton pertama disebut juga hukum...',
    category: 'Fisika',
    options: ['Aksi-reaksi', 'Kelembaman', 'Gravitasi', 'Gerak'],
    correctAnswer: 1, // B (Kelembaman) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Hukum Newton pertama dikenal sebagai hukum kelembaman/inersia'
  },
  {
    id: 17,
    question: 'Satuan SI untuk gaya adalah...',
    category: 'Fisika',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1, // B (Newton) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Gaya diukur dalam Newton (N) sesuai dengan satuan SI'
  },
  {
    id: 18,
    question: 'Energi potensial gravitasi bergantung pada...',
    category: 'Fisika',
    options: ['Massa, kecepatan, dan waktu', 'Massa, gravitasi, dan ketinggian', 'Gaya, jarak, dan sudut', 'Daya, waktu, dan efisiensi'],
    correctAnswer: 1, // B (Massa, gravitasi, dan ketinggian) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Ep = m × g × h (bergantung pada massa, gravitasi, dan ketinggian)'
  },
  {
    id: 19,
    question: 'Kecepatan cahaya dalam ruang hampa adalah...',
    category: 'Fisika',
    options: ['300.000 m/s', '3.000.000 m/s', '30.000.000 m/s', '300.000.000 m/s'],
    correctAnswer: 3, // D (300.000.000 m/s) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Kecepatan cahaya dalam vakum adalah sekitar 300.000.000 m/s'
  },
  {
    id: 20,
    question: 'Alat untuk mengukur suhu adalah...',
    category: 'Fisika',
    options: ['Barometer', 'Termometer', 'Hygrometer', 'Speedometer'],
    correctAnswer: 1, // B (Termometer) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Termometer adalah alat untuk mengukur suhu'
  },

  // ========== KIMIA ==========
  {
    id: 21,
    question: 'Unsur kimia dengan simbol O adalah...',
    category: 'Kimia',
    options: ['Osmium', 'Oksigen', 'Ozon', 'Oganeson'],
    correctAnswer: 1, // B (Oksigen) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'O adalah simbol untuk Oksigen (Oxygen)'
  },
  {
    id: 22,
    question: 'Rumus kimia untuk air adalah...',
    category: 'Kimia',
    options: ['CO₂', 'NaCl', 'H₂O', 'O₂'],
    correctAnswer: 2, // C (H₂O) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Air memiliki rumus kimia H₂O (dua atom hidrogen dan satu atom oksigen)'
  },
  {
    id: 23,
    question: 'pH netral memiliki nilai...',
    category: 'Kimia',
    options: ['0', '7', '14', '10'],
    correctAnswer: 1, // B (7) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'pH netral adalah 7 (skala 0-14)'
  },
  {
    id: 24,
    question: 'Unsur dengan nomor atom 1 adalah...',
    category: 'Kimia',
    options: ['Helium', 'Litium', 'Hidrogen', 'Natrium'],
    correctAnswer: 2, // C (Hidrogen) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Hidrogen memiliki nomor atom 1 (satu proton)'
  },
  {
    id: 25,
    question: 'Logam yang cair pada suhu ruang adalah...',
    category: 'Kimia',
    options: ['Emas', 'Perak', 'Raksa', 'Tembaga'],
    correctAnswer: 2, // C (Raksa) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Raksa (merkuri) adalah logam yang berwujud cair pada suhu ruang'
  },
  {
    id: 26,
    question: 'Gas yang paling banyak di atmosfer bumi adalah...',
    category: 'Kimia',
    options: ['Oksigen', 'Nitrogen', 'Karbon dioksida', 'Argon'],
    correctAnswer: 1, // B (Nitrogen) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Nitrogen menempati sekitar 78% atmosfer bumi'
  },

  // ========== BIOLOGI ==========
  {
    id: 27,
    question: 'Organel sel yang berfungsi sebagai tempat respirasi adalah...',
    category: 'Biologi',
    options: ['Nukleus', 'Mitokondria', 'Ribosom', 'Lisosom'],
    correctAnswer: 1, // B (Mitokondria) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Mitokondria adalah organel tempat berlangsungnya respirasi sel'
  },
  {
    id: 28,
    question: 'Proses fotosintesis pada tumbuhan menghasilkan...',
    category: 'Biologi',
    options: ['Oksigen', 'Karbondioksida', 'Nitrogen', 'Metana'],
    correctAnswer: 0, // A (Oksigen) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Fotosintesis menghasilkan oksigen sebagai produk sampingan'
  },
  {
    id: 29,
    question: 'Jaringan yang mengangkut air pada tumbuhan adalah...',
    category: 'Biologi',
    options: ['Floem', 'Xilem', 'Epidermis', 'Kambium'],
    correctAnswer: 1, // B (Xilem) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Xilem berfungsi mengangkut air dan mineral dari akar ke daun'
  },
  {
    id: 30,
    question: 'Bagian sel yang mengendalikan aktivitas sel adalah...',
    category: 'Biologi',
    options: ['Sitoplasma', 'Membran sel', 'Nukleus', 'Ribosom'],
    correctAnswer: 2, // C (Nukleus) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Nukleus adalah pusat kontrol sel yang mengandung DNA'
  },
  {
    id: 31,
    question: 'Proses pencernaan dimulai di...',
    category: 'Biologi',
    options: ['Lambung', 'Usus halus', 'Mulut', 'Kerongkongan'],
    correctAnswer: 2, // C (Mulut) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Pencernaan dimulai di mulut dengan enzim amilase'
  },
  {
    id: 32,
    question: 'Penyakit yang disebabkan oleh kekurangan vitamin C adalah...',
    category: 'Biologi',
    options: ['Rabun senja', 'Scurvy', 'Rickets', 'Anemia'],
    correctAnswer: 1, // B (Scurvy) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Scurvy (skorbut) disebabkan oleh kekurangan vitamin C'
  },

  // ========== SEJARAH ==========
  {
    id: 33,
    question: 'Siapakah proklamator kemerdekaan Indonesia?',
    category: 'Sejarah',
    options: ['Soekarno-Hatta', 'Soeharto-Habibie', 'Gus Dur-Megawati', 'Jokowi-Kalla'],
    correctAnswer: 0, // A (Soekarno-Hatta) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Soekarno dan Hatta adalah proklamator kemerdekaan Indonesia'
  },
  {
    id: 34,
    question: 'Kerajaan pertama di Indonesia adalah...',
    category: 'Sejarah',
    options: ['Majapahit', 'Sriwijaya', 'Kutai', 'Tarumanegara'],
    correctAnswer: 2, // C (Kutai) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Kerajaan Kutai adalah kerajaan tertua di Indonesia (abad ke-4 M)'
  },
  {
    id: 35,
    question: 'Perang Dunia I terjadi pada tahun...',
    category: 'Sejarah',
    options: ['1914-1918', '1939-1945', '1912-1916', '1941-1945'],
    correctAnswer: 0, // A (1914-1918) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Perang Dunia I berlangsung dari tahun 1914 hingga 1918'
  },
  {
    id: 36,
    question: 'Sumpah Pemuda terjadi pada tanggal...',
    category: 'Sejarah',
    options: ['20 Mei 1908', '28 Oktober 1928', '17 Agustus 1945', '10 November 1945'],
    correctAnswer: 1, // B (28 Oktober 1928) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Sumpah Pemuda diperingati setiap tanggal 28 Oktober'
  },
  {
    id: 37,
    question: 'Kerajaan maritim terbesar di Indonesia adalah...',
    category: 'Sejarah',
    options: ['Majapahit', 'Sriwijaya', 'Singasari', 'Demak'],
    correctAnswer: 1, // B (Sriwijaya) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Sriwijaya adalah kerajaan maritim terbesar di Nusantara'
  },

  // ========== GEOGRAFI ==========
  {
    id: 38,
    question: 'Ibukota negara Jepang adalah...',
    category: 'Geografi',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctAnswer: 2, // C (Tokyo) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Tokyo adalah ibukota Jepang'
  },
  {
    id: 39,
    question: 'Gunung tertinggi di dunia adalah...',
    category: 'Geografi',
    options: ['Kilimanjaro', 'Everest', 'Fuji', 'Denali'],
    correctAnswer: 1, // B (Everest) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Gunung Everest adalah gunung tertinggi di dunia dengan ketinggian 8.848 mdpl'
  },
  {
    id: 40,
    question: 'Benua terbesar di dunia adalah...',
    category: 'Geografi',
    options: ['Afrika', 'Asia', 'Amerika', 'Eropa'],
    correctAnswer: 1, // B (Asia) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Asia adalah benua terbesar dengan luas sekitar 44,58 juta km²'
  },
  {
    id: 41,
    question: 'Sungai terpanjang di dunia adalah...',
    category: 'Geografi',
    options: ['Amazon', 'Nil', 'Yangtze', 'Mississippi'],
    correctAnswer: 1, // B (Nil) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Sungai Nil di Afrika adalah sungai terpanjang di dunia (6.650 km)'
  },
  {
    id: 42,
    question: 'Gurun terluas di dunia adalah...',
    category: 'Geografi',
    options: ['Gobi', 'Sahara', 'Arab', 'Kalahari'],
    correctAnswer: 1, // B (Sahara) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Gurun Sahara di Afrika adalah gurun terluas di dunia'
  },
  {
    id: 43,
    question: 'Samudra terluas di dunia adalah...',
    category: 'Geografi',
    options: ['Atlantik', 'Pasifik', 'Hindia', 'Arktik'],
    correctAnswer: 1, // B (Pasifik) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Samudra Pasifik adalah samudra terluas di dunia'
  },

  // ========== EKONOMI ==========
  {
    id: 44,
    question: 'Inflasi adalah...',
    category: 'Ekonomi',
    options: [
      'Penurunan harga barang',
      'Kenaikan harga barang secara umum',
      'Stabilitas harga',
      'Defisit anggaran'
    ],
    correctAnswer: 1, // B (Kenaikan harga barang secara umum) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Inflasi adalah kenaikan harga barang dan jasa secara umum dan terus-menerus'
  },
  {
    id: 45,
    question: 'PDB (Produk Domestik Bruto) mengukur...',
    category: 'Ekonomi',
    options: [
      'Tingkat inflasi suatu negara',
      'Total nilai barang dan jasa yang diproduksi suatu negara',
      'Jumlah penduduk suatu negara',
      'Nilai ekspor suatu negara'
    ],
    correctAnswer: 1, // B (Total nilai barang dan jasa yang diproduksi suatu negara) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'PDB mengukur total nilai pasar semua barang dan jasa akhir yang diproduksi dalam suatu negara'
  },
  {
    id: 46,
    question: 'Investasi dalam bentuk surat utang disebut...',
    category: 'Ekonomi',
    options: ['Saham', 'Obligasi', 'Reksadana', 'Deposito'],
    correctAnswer: 1, // B (Obligasi) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'Obligasi adalah surat utang jangka panjang yang dapat diperdagangkan'
  },
  {
    id: 47,
    question: 'Bank sentral Indonesia adalah...',
    category: 'Ekonomi',
    options: ['Bank BRI', 'Bank Mandiri', 'Bank Indonesia', 'Bank BCA'],
    correctAnswer: 2, // C (Bank Indonesia) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Bank Indonesia (BI) adalah bank sentral Republik Indonesia'
  },
  {
    id: 48,
    question: 'Sistem ekonomi yang dianut Indonesia adalah...',
    category: 'Ekonomi',
    options: ['Kapitalis', 'Sosialis', 'Pancasila', 'Komunis'],
    correctAnswer: 2, // C (Pancasila) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'Indonesia menganut sistem ekonomi Pancasila'
  },
  {
    id: 49,
    question: 'APBN adalah singkatan dari...',
    category: 'Ekonomi',
    options: [
      'Anggaran Pembangunan Berbasis Nasional',
      'Anggaran Pendapatan dan Belanja Negara',
      'Analisis Pembangunan Berkelanjutan Nasional',
      'Aset Pemerintah Berwujud Negara'
    ],
    correctAnswer: 1, // B (Anggaran Pendapatan dan Belanja Negara) ✓ BENAR
    difficulty: 'Mudah',
    explanation: 'APBN = Anggaran Pendapatan dan Belanja Negara'
  },
  {
    id: 50,
    question: 'Pajak yang dikenakan atas konsumsi barang mewah disebut...',
    category: 'Ekonomi',
    options: ['PPN', 'PPnBM', 'PPh', 'PBB'],
    correctAnswer: 1, // B (PPnBM) ✓ BENAR
    difficulty: 'Sedang',
    explanation: 'PPnBM = Pajak Penjualan atas Barang Mewah'
  },
  // ========== TAMBAHAN SOAL UNTUK MEMENUHI 10 SOAL PER KATEGORI ==========

// Tambahan MATEMATIKA (3 soal)
{
  id: 51,
  question: 'Berapakah hasil dari 18 ÷ 3 × 2?',
  category: 'Matematika',
  options: ['6', '9', '12', '15'],
  correctAnswer: 2, // C (12) ✓ BENAR
  difficulty: 'Sedang',
  explanation: '18 ÷ 3 = 6, 6 × 2 = 12'
},
{
  id: 52,
  question: 'Berapakah luas persegi dengan sisi 8 cm?',
  category: 'Matematika',
  options: ['16 cm²', '32 cm²', '64 cm²', '128 cm²'],
  correctAnswer: 2, // C (64 cm²) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Luas persegi = sisi × sisi = 8 × 8 = 64 cm²'
},
{
  id: 53,
  question: 'Nilai dari 5! (5 faktorial) adalah...',
  category: 'Matematika',
  options: ['60', '120', '240', '720'],
  correctAnswer: 1, // B (120) ✓ BENAR
  difficulty: 'Sedang',
  explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120'
},

// Tambahan BAHASA INGGRIS (3 soal)
{
  id: 54,
  question: 'Antonym dari kata "ancient" adalah...',
  category: 'Bahasa Inggris',
  options: ['Old', 'Modern', 'Historic', 'Classic'],
  correctAnswer: 1, // B (Modern) ✓ BENAR
  difficulty: 'Sedang',
  explanation: '"Ancient" berarti kuno, lawan katanya adalah "modern" (modern)'
},
{
  id: 55,
  question: 'Kalimat "She is reading a book" menggunakan tense...',
  category: 'Bahasa Inggris',
  options: ['Past Continuous', 'Present Perfect', 'Present Continuous', 'Future Simple'],
  correctAnswer: 2, // C (Present Continuous) ✓ BENAR
  difficulty: 'Sedang',
  explanation: '"is reading" adalah bentuk Present Continuous Tense'
},
{
  id: 56,
  question: 'Kata "quickly" termasuk dalam kelas kata...',
  category: 'Bahasa Inggris',
  options: ['Noun', 'Adjective', 'Adverb', 'Verb'],
  correctAnswer: 2, // C (Adverb) ✓ BENAR
  difficulty: 'Mudah',
  explanation: '"Quickly" adalah adverb (kata keterangan) yang berarti dengan cepat'
},

// Tambahan FISIKA (4 soal)
{
  id: 57,
  question: 'Rumus untuk menghitung kecepatan adalah...',
  category: 'Fisika',
  options: ['v = s × t', 'v = s ÷ t', 'v = t ÷ s', 'v = s² × t'],
  correctAnswer: 1, // B (v = s ÷ t) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Kecepatan = jarak ÷ waktu (v = s/t)'
},
{
  id: 58,
  question: 'Hukum kekekalan energi menyatakan bahwa...',
  category: 'Fisika',
  options: [
    'Energi dapat diciptakan',
    'Energi dapat dimusnahkan',
    'Energi berubah bentuk tapi tidak hilang',
    'Energi selalu bertambah'
  ],
  correctAnswer: 2, // C (Energi berubah bentuk tapi tidak hilang) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk'
},
{
  id: 59,
  question: 'Alat untuk mengukur tekanan udara adalah...',
  category: 'Fisika',
  options: ['Termometer', 'Barometer', 'Hygrometer', 'Speedometer'],
  correctAnswer: 1, // B (Barometer) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Barometer adalah alat untuk mengukur tekanan udara'
},
{
  id: 60,
  question: 'Warna pelangi yang memiliki frekuensi tertinggi adalah...',
  category: 'Fisika',
  options: ['Merah', 'Hijau', 'Biru', 'Ungu'],
  correctAnswer: 3, // D (Ungu) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Ungu memiliki frekuensi tertinggi dan panjang gelombang terpendek dalam spektrum cahaya tampak'
},

// Tambahan KIMIA (4 soal)
{
  id: 61,
  question: 'Unsur dengan simbol Fe adalah...',
  category: 'Kimia',
  options: ['Fermium', 'Fosfor', 'Besi', 'Fluor'],
  correctAnswer: 2, // C (Besi) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Fe adalah simbol untuk Besi (Iron)'
},
{
  id: 62,
  question: 'Reaksi yang melepaskan panas disebut...',
  category: 'Kimia',
  options: ['Endoterm', 'Eksoterm', 'Isoterm', 'Adiabatik'],
  correctAnswer: 1, // B (Eksoterm) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Reaksi eksoterm melepaskan panas ke lingkungan'
},
{
  id: 63,
  question: 'Golongan gas mulia dalam tabel periodik adalah...',
  category: 'Kimia',
  options: ['Golongan IA', 'Golongan IIA', 'Golongan VIIA', 'Golongan VIIIA'],
  correctAnswer: 3, // D (Golongan VIIIA) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Gas mulia (He, Ne, Ar, Kr, Xe, Rn) berada di golongan VIIIA'
},
{
  id: 64,
  question: 'Asam yang terdapat dalam cuka adalah...',
  category: 'Kimia',
  options: ['Asam sulfat', 'Asam sitrat', 'Asam asetat', 'Asam klorida'],
  correctAnswer: 2, // C (Asam asetat) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Cuka mengandung asam asetat (CH₃COOH)'
},

// Tambahan BIOLOGI (4 soal)
{
  id: 65,
  question: 'Penyakit akibat kekurangan vitamin D adalah...',
  category: 'Biologi',
  options: ['Scurvy', 'Rickets', 'Beriberi', 'Anemia'],
  correctAnswer: 1, // B (Rickets) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Rickets (rakhitis) disebabkan oleh kekurangan vitamin D'
},
{
  id: 66,
  question: 'Organ tubuh yang berfungsi menyaring darah adalah...',
  category: 'Biologi',
  options: ['Jantung', 'Paru-paru', 'Ginjal', 'Hati'],
  correctAnswer: 2, // C (Ginjal) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Ginjal berfungsi menyaring darah dan membuang zat sisa metabolisme'
},
{
  id: 67,
  question: 'Bagian bunga yang berfungsi sebagai alat kelamin betina adalah...',
  category: 'Biologi',
  options: ['Benang sari', 'Putik', 'Mahkota', 'Kelopak'],
  correctAnswer: 1, // B (Putik) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Putik (pistil) adalah alat kelamin betina pada bunga'
},
{
  id: 68,
  question: 'Penyakit menular yang disebabkan virus adalah...',
  category: 'Biologi',
  options: ['TBC', 'Malaria', 'Influenza', 'Kolera'],
  correctAnswer: 2, // C (Influenza) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Influenza (flu) disebabkan oleh virus influenza'
},

// Tambahan SEJARAH (5 soal)
{
  id: 69,
  question: 'Perang Diponegoro terjadi pada tahun...',
  category: 'Sejarah',
  options: ['1825-1830', '1830-1835', '1840-1845', '1850-1855'],
  correctAnswer: 0, // A (1825-1830) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Perang Diponegoro berlangsung dari tahun 1825 hingga 1830'
},
{
  id: 70,
  question: 'Kerajaan Hindu pertama di Indonesia adalah...',
  category: 'Sejarah',
  options: ['Majapahit', 'Sriwijaya', 'Kutai', 'Tarumanegara'],
  correctAnswer: 2, // C (Kutai) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Kerajaan Kutai adalah kerajaan Hindu pertama di Indonesia'
},
{
  id: 71,
  question: 'Tokoh yang dikenal sebagai Bapak Pendidikan Indonesia adalah...',
  category: 'Sejarah',
  options: ['Ki Hajar Dewantara', 'R.A. Kartini', 'Dewi Sartika', 'Ahmad Dahlan'],
  correctAnswer: 0, // A (Ki Hajar Dewantara) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Ki Hajar Dewantara dijuluki sebagai Bapak Pendidikan Indonesia'
},
{
  id: 72,
  question: 'Peristiwa Bandung Lautan Api terjadi pada tanggal...',
  category: 'Sejarah',
  options: ['23 Maret 1946', '10 November 1945', '17 Agustus 1945', '28 Oktober 1928'],
  correctAnswer: 0, // A (23 Maret 1946) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Peristiwa Bandung Lautan Api terjadi pada 23 Maret 1946'
},
{
  id: 73,
  question: 'Kerajaan Islam pertama di Jawa adalah...',
  category: 'Sejarah',
  options: ['Demak', 'Mataram', 'Cirebon', 'Banten'],
  correctAnswer: 0, // A (Demak) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Kerajaan Demak adalah kerajaan Islam pertama di Jawa'
},

// Tambahan GEOGRAFI (4 soal)
{
  id: 74,
  question: 'Negara dengan populasi terbesar di dunia adalah...',
  category: 'Geografi',
  options: ['India', 'Amerika Serikat', 'Cina', 'Indonesia'],
  correctAnswer: 2, // C (Cina) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Cina memiliki populasi terbesar di dunia (lebih dari 1,4 miliar jiwa)'
},
{
  id: 75,
  question: 'Danau terdalam di dunia adalah...',
  category: 'Geografi',
  options: ['Danau Superior', 'Danau Baikal', 'Danau Victoria', 'Danau Tanganika'],
  correctAnswer: 1, // B (Danau Baikal) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Danau Baikal di Rusia adalah danau terdalam di dunia (1.642 meter)'
},
{
  id: 76,
  question: 'Gunung api tertinggi di Indonesia adalah...',
  category: 'Geografi',
  options: ['Semeru', 'Merapi', 'Kerinci', 'Rinjani'],
  correctAnswer: 2, // C (Kerinci) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Gunung Kerinci di Sumatera adalah gunung api tertinggi di Indonesia (3.805 mdpl)'
},
{
  id: 77,
  question: 'Benua terkecil di dunia adalah...',
  category: 'Geografi',
  options: ['Eropa', 'Australia', 'Antartika', 'Amerika Selatan'],
  correctAnswer: 1, // B (Australia) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Australia adalah benua terkecil dengan luas sekitar 7,7 juta km²'
},

// Tambahan EKONOMI (3 soal)
{
  id: 78,
  question: 'Indeks yang mengukur harga saham di Bursa Efek Indonesia adalah...',
  category: 'Ekonomi',
  options: ['DJIA', 'NASDAQ', 'IHSG', 'Nikkei'],
  correctAnswer: 2, // C (IHSG) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'IHSG (Indeks Harga Saham Gabungan) adalah indeks utama di Bursa Efek Indonesia'
},
{
  id: 79,
  question: 'Kebijakan moneter yang dilakukan bank sentral untuk mengurangi jumlah uang beredar disebut...',
  category: 'Ekonomi',
  options: ['Kebijakan ekspansif', 'Kebijakan kontraktif', 'Kebijakan fiskal', 'Kebijakan perdagangan'],
  correctAnswer: 1, // B (Kebijakan kontraktif) ✓ BENAR
  difficulty: 'Sedang',
  explanation: 'Kebijakan moneter kontraktif bertujuan mengurangi jumlah uang beredar'
},
{
  id: 80,
  question: 'Ilmu yang mempelajari perilaku individu dalam memenuhi kebutuhannya yang tidak terbatas dengan sumber daya yang terbatas adalah...',
  category: 'Ekonomi',
  options: ['Akuntansi', 'Manajemen', 'Ekonomi Mikro', 'Ekonomi Makro'],
  correctAnswer: 2, // C (Ekonomi Mikro) ✓ BENAR
  difficulty: 'Mudah',
  explanation: 'Ekonomi Mikro mempelajari perilaku individu dan perusahaan dalam pengambilan keputusan ekonomi'
}
]