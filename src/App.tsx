import { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  Search, 
  User, 
  Calendar, 
  Building2, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronLeft, 
  MapPin, 
  Mail, 
  Clock, 
  BookMarked, 
  FileCheck, 
  ChevronRight,
  Sparkles,
  SearchCode
} from 'lucide-react';
import { 
  PROFILE_INFO, 
  UNIVERSITY_EDUCATION, 
  SEMINARY_EDUCATION, 
  TEACHING_HISTORY, 
  BOOKS, 
  ARTICLES, 
  THESES, 
  HONORS,
  InstitutionTeaching,
  Article,
  Thesis,
  Honor
} from './data';
// @ts-ignore
import profileImg from './assets/images/dr_ahmadi_far_portrait_1782631003770.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [searchArticle, setSearchArticle] = useState<string>('');
  const [filterArticleType, setFilterArticleType] = useState<string>('all');
  
  const [searchThesis, setSearchThesis] = useState<string>('');
  const [filterThesisLevel, setFilterThesisLevel] = useState<string>('all');
  
  const [filterHonorCategory, setFilterHonorCategory] = useState<string>('all');
  const [selectedTeachingId, setSelectedTeachingId] = useState<string>('seminary');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Pagination for articles (since there are 57+ entries)
  const [articlePage, setArticlePage] = useState<number>(1);
  const articlesPerPage = 12;

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    let result = ARTICLES;
    
    // Search filter
    if (searchArticle.trim() !== '') {
      const q = searchArticle.toLowerCase();
      result = result.filter(art => 
        art.title.toLowerCase().includes(q) || 
        art.journal.toLowerCase().includes(q) || 
        (art.year && art.year.includes(q))
      );
    }
    
    // Type filter
    if (filterArticleType !== 'all') {
      if (filterArticleType === 'book') {
        // Handled differently or returns empty here
        return [];
      } else {
        result = result.filter(art => art.type === filterArticleType);
      }
    }
    
    return result;
  }, [searchArticle, filterArticleType]);

  // Paginated Articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (articlePage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, articlePage]);

  const totalArticlePages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Filtered Theses
  const filteredTheses = useMemo(() => {
    let result = THESES;
    
    if (searchThesis.trim() !== '') {
      const q = searchThesis.toLowerCase();
      result = result.filter(the => 
        the.title.toLowerCase().includes(q) || 
        the.studentName.toLowerCase().includes(q) || 
        the.university.toLowerCase().includes(q)
      );
    }
    
    if (filterThesisLevel !== 'all') {
      if (filterThesisLevel === 'phd') {
        result = result.filter(the => the.level.includes('دکتری') || the.level.includes('سطح ۴'));
      } else if (filterThesisLevel === 'arshad') {
        result = result.filter(the => the.level.includes('ارشد') || the.level.includes('سطح ۳'));
      }
    }
    
    return result;
  }, [searchThesis, filterThesisLevel]);

  // Filtered Honors
  const filteredHonors = useMemo(() => {
    if (filterHonorCategory === 'all') return HONORS;
    return HONORS.filter(hon => hon.category === filterHonorCategory);
  }, [filterHonorCategory]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* HEADER SECTION */}
      <header id="header-bar" className="sticky top-0 z-50 bg-[#0d2a23] text-white shadow-md border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Name */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-inner flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-amber-50">وبسایت علمی دکتر مصطفی احمدی فر</h1>
                <p className="text-xs text-emerald-300 font-light">عضو هیئت علمی و پژوهشگر برتر حوزه و دانشگاه</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 space-x-reverse text-sm font-medium">
              {[
                { id: 'profile', label: 'درباره استاد', icon: User },
                { id: 'teaching', label: 'سوابق تدریس', icon: BookOpen, badge: "۲۰+ سال" },
                { id: 'education', label: 'تحصیلات و مدارج', icon: GraduationCap },
                { id: 'publications', label: 'کتاب‌ها و مقالات', icon: FileText },
                { id: 'theses', label: 'راهنمایی رساله‌ها', icon: BookMarked },
                { id: 'honors', label: 'افتخارات و مسئولیت‌ها', icon: Award },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 relative ${
                      isActive 
                        ? 'bg-emerald-800/80 text-amber-300 shadow-sm border border-emerald-700/60' 
                        : 'text-emerald-100 hover:bg-emerald-800/40 hover:text-white'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 ml-1.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="mr-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-emerald-200 hover:bg-emerald-800 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1f1a] border-b border-emerald-950 px-2 pt-2 pb-4 space-y-1">
            {[
              { id: 'profile', label: 'درباره استاد', icon: User },
              { id: 'teaching', label: 'سوابق تدریس (۲۰+ سال)', icon: BookOpen },
              { id: 'education', label: 'تحصیلات و مدارج حوزوی و دانشگاهی', icon: GraduationCap },
              { id: 'publications', label: 'کتاب‌ها و مقالات علمی', icon: FileText },
              { id: 'theses', label: 'راهنمایی و مشاوره رساله‌ها', icon: BookMarked },
              { id: 'honors', label: 'افتخارات، مسئولیت‌ها و سفرها', icon: Award },
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-right text-sm font-medium ${
                    isActive 
                      ? 'bg-emerald-800 text-amber-300' 
                      : 'text-emerald-100 hover:bg-emerald-800/30'
                  }`}
                >
                  <IconComponent className="h-4 w-4 ml-3 text-amber-400/80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* HERO HERO SECTION / PROFILE CARD SUMMARY */}
      <section id="hero-banner" className="bg-gradient-to-b from-[#0e352c] to-[#0a1f1a] text-white pt-8 pb-12 px-4 shadow-inner relative overflow-hidden">
        {/* Abstract background Islamic geometric lines for high-fidelity look */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
          <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] rotate-45 border-[20px] border-emerald-500 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Styled Portrait Avatar Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-[#0d2a23] border-2 border-amber-400/40 rounded-2xl p-4 w-48 h-60 sm:w-56 sm:h-64 flex flex-col items-center justify-center text-center shadow-2xl">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-300/50 mb-3 shadow-md bg-emerald-950">
                  <img 
                    src={profileImg} 
                    alt="دکتر مصطفی احمدی فر" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-extrabold text-amber-100">دکتر مصطفی احمدی فر</h3>
                <p className="text-xs text-emerald-300 mt-1">عضو رسمی هیئت علمی</p>
                <div className="mt-3 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-emerald-900/80 text-emerald-200 border border-emerald-800">
                  <MapPin className="h-3 w-3 ml-1 text-amber-400" /> مشهد مقدس
                </div>
              </div>
            </div>

            {/* Quick Profile Overview */}
            <div className="flex-1 text-center md:text-right space-y-4">
              <div className="inline-flex items-center space-x-1 space-x-reverse px-3 py-1 rounded-full text-xs bg-emerald-950/80 border border-emerald-800/80 text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 ml-1" />
                <span>استعداد برتر پژوهشی حوزه علمیه خراسان</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight leading-snug">
                استاد سطوح عالی فقه، اصول و علوم قرآن
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
                {PROFILE_INFO.intro}
              </p>
              
              {/* Core Stats Overview widget */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
                {PROFILE_INFO.stats.map((stat, i) => {
                  let targetTab = 'profile';
                  if (stat.label.includes('تدریس')) targetTab = 'teaching';
                  else if (stat.label.includes('رساله') || stat.label.includes('پایان‌نامه')) targetTab = 'theses';
                  else if (stat.label.includes('مقاله')) targetTab = 'publications';
                  else if (stat.label.includes('کتاب')) targetTab = 'publications';
                  else if (stat.label.includes('ارزیابی')) targetTab = 'honors';

                  return (
                    <button 
                      key={i}
                      onClick={() => handleTabChange(targetTab)}
                      className="bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/50 hover:border-amber-400/30 rounded-xl p-3 text-center transition-all duration-300 hover:scale-105"
                    >
                      <p className="text-lg sm:text-2xl font-black text-amber-300 tracking-tight">{stat.value}</p>
                      <p className="text-[11px] text-emerald-200 mt-1 font-medium">{stat.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ============================================================= */}
        {/* 1. PROFILE & ABOUT TAB */}
        {/* ============================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Highlight Card 1: Teaching */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="bg-amber-100 text-amber-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">بیش از ۲۰ سال تدریس مستمر</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    سابقه تدریس علوم حوزوی (خارج فقه، مکاسب، اصول) و دروس دکتری در جامعه المصطفی و دانشگاه رضوی.
                  </p>
                </div>
                <button 
                  onClick={() => handleTabChange('teaching')}
                  className="mt-4 flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  مشاهده سوابق تدریس و مؤسسات <ChevronLeft className="h-4 w-4 mr-1" />
                </button>
              </div>

              {/* Highlight Card 2: Research & Publications */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="bg-emerald-100 text-emerald-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-emerald-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">۷۹ مقاله علمی و ۳ عنوان کتاب</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    تالیف کتب مرجع تفسیر موضوعی تربیتی و بهداشت روانی و ده‌ها مقاله علمی پژوهشی نمایه شده در وزارتین و ISI.
                  </p>
                </div>
                <button 
                  onClick={() => handleTabChange('publications')}
                  className="mt-4 flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  جستجو و مرور مقالات و کتب <ChevronLeft className="h-4 w-4 mr-1" />
                </button>
              </div>

              {/* Highlight Card 3: Academic Supervision */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="bg-blue-100 text-blue-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <BookMarked className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">۱۱۰+ راهنمایی پایان‌نامه</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    هدایت علمی و مشاوره تخصصی رساله‌های دکتری و پایان‌نامه‌های ارشد طلاب و دانشجویان سراسر جهان.
                  </p>
                </div>
                <button 
                  onClick={() => handleTabChange('theses')}
                  className="mt-4 flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  مشاهده لیست دانشجویان و موضوعات <ChevronLeft className="h-4 w-4 mr-1" />
                </button>
              </div>

            </div>

            {/* Featured Publications Block (Books) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                  <BookMarked className="h-5 w-5 text-amber-500 ml-2" />
                  کتاب‌های تالیف شده برجسته
                </h3>
                <p className="text-slate-500 text-xs mt-1">تألیفات چاپی دکتر مصطفی احمدی فر در ساحت قرآن، حدیث و روانشناسی اخلاقی</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BOOKS.map((book) => (
                  <div key={book.id} className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50/20 border border-slate-200 rounded-xl p-5 hover:border-emerald-200 transition duration-300">
                    {/* Minimalistic CSS book spines */}
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-700 rounded-l" />
                    <div className="pr-3">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full">تألیف رسمی</span>
                      <h4 className="font-bold text-slate-900 mt-2 text-sm sm:text-base leading-snug">{book.title}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">{book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card / Hours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 bg-[#09221b] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
                <h4 className="text-lg font-bold text-amber-300 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 ml-2" />
                  اطلاعات تماس و دفتر علمی
                </h4>
                
                <div className="space-y-4 text-sm text-emerald-100">
                  <div className="flex items-start">
                    <Building2 className="h-4 w-4 ml-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-50">آدرس دفتر اصلی:</p>
                      <p className="text-emerald-200 font-light mt-0.5">مشهد مقدس - کوی طلاب - خیابان دانشگاه علوم اسلامی رضوی یا مرکز علمی نمایندگی جامعه المصطفی العالمیه خراسان</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 ml-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-50">ساعات حضور جهت مشاوره‌های رساله علمی:</p>
                      <p className="text-emerald-200 font-light mt-0.5">روزهای زوج با هماهنگی قبلی دبیر پژوهشی مدرسه عالی علوم قرآن</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-4 w-4 ml-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-50">مکاتبات علمی:</p>
                      <p className="text-emerald-200 font-light mt-0.5">پذیرش درخواست تالیف، نقد کتاب و ارزیابی مقالات علمی پژوهشی تخصصی</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-full mb-3">
                  <Award className="h-8 w-8 text-amber-700" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg">ارزیاب بیش از ۳۰۰ مقاله علمی</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  دارای کد رسمی داوری و ارزیابی در برترین دوفصلنامه‌ها و نشریات علمی تخصصی کشور (وزارتین و حوزوی).
                </p>
                <button 
                  onClick={() => handleTabChange('honors')}
                  className="mt-4 text-xs font-bold text-emerald-700 hover:underline"
                >
                  مشاهده مسئولیت‌ها و شوراها
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* 2. TEACHING EXPERIENCE TAB (SPECIFICALLY REQUESTED & DETAILED) */}
        {/* ============================================================= */}
        {activeTab === 'teaching' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Spotlight Banner for 20+ Years history */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl" />
              <div className="absolute bottom-0 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-right">
                  <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    برجسته و طلایی
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100 pt-1">
                    بیش از ۲۰ سال سابقه تدریس مستمر در سطوح عالی
                  </h3>
                  <p className="text-emerald-100 text-sm font-light leading-relaxed max-w-2xl">
                    تدریس متون مرجع فقه استدلالی، اصول فقه، اصول عالی (رسائل و کفایه)، خارج فقه، ادبیات و تفسیر قرآن کریم در حوزه‌های علمیه و دانشگاه‌های طراز اول کشور.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-emerald-900/60 border border-emerald-700/80 rounded-2xl p-5 text-center">
                  <span className="text-4xl sm:text-5xl font-black text-amber-300">۲۰+</span>
                  <p className="text-xs text-emerald-200 mt-1 font-bold">سال تدریس مداوم</p>
                </div>
              </div>
            </div>

            {/* Interactive Browser Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar List of Institutions */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="text-sm font-bold text-slate-500 px-1 uppercase tracking-wider">لیست مؤسسات و مراکز آموزشی</h4>
                {TEACHING_HISTORY.map((inst) => {
                  const isSelected = selectedTeachingId === inst.id;
                  return (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedTeachingId(inst.id)}
                      className={`w-full text-right p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between relative ${
                        isSelected 
                          ? 'bg-white border-emerald-600 shadow-md translate-x-1' 
                          : 'bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-emerald-700 rounded-r-xl" />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${inst.logoColor}`} />
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">{inst.name}</span>
                        </div>
                        <ChevronLeft className={`h-4 w-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1 text-emerald-700' : ''}`} />
                      </div>
                      
                      <p className="text-xs text-slate-500 mt-2 font-medium line-clamp-1">{inst.historyText}</p>
                    </button>
                  );
                })}
              </div>

              {/* Detail Viewer Pane */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                
                {(() => {
                  const activeInst = TEACHING_HISTORY.find(h => h.id === selectedTeachingId);
                  if (!activeInst) return null;
                  return (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Header in details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                        <div>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                            مرکز علمی برگزیده
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeInst.name}</h3>
                        </div>
                        <div className="text-sm text-slate-500 font-bold bg-slate-100 px-3 py-1.5 rounded-lg text-center">
                          {activeInst.historyText}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {activeInst.description}
                      </p>

                      {/* Levels Badge list */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">مقاطع تحت تدریس:</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeInst.levels.map((lvl, index) => (
                            <span key={index} className="px-3 py-1 text-xs font-bold bg-amber-50 text-amber-950 border border-amber-200 rounded-full">
                              {lvl}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Courses Bullet grid */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
                          <BookOpen className="h-3.5 w-3.5 text-emerald-600 ml-1" />
                          لیست عناوین و دروس تدریس شده:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeInst.courses.map((course, index) => (
                            <div 
                              key={index} 
                              className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center space-x-2 space-x-reverse hover:border-emerald-100 hover:bg-emerald-50/20 transition-all"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                              <span className="text-sm font-bold text-slate-800 leading-snug">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subtle scholarly watermark */}
                      <div className="pt-4 border-t border-slate-50 text-left">
                        <span className="text-xs text-slate-400 italic font-light">تدریس تطبیقی متون اصیل با روش‌های نوین آموزشی</span>
                      </div>

                    </div>
                  );
                })()}

              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* 3. EDUCATION & DEGREES TAB */}
        {/* ============================================================= */}
        {activeTab === 'education' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Column 1: Academic Degrees */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 space-x-reverse border-b border-slate-200 pb-3">
                  <Building2 className="h-6 w-6 text-emerald-700" />
                  <h3 className="text-xl font-bold text-slate-900">تحصیلات دانشگاهی (دومدرکی)</h3>
                </div>

                <div className="space-y-6 relative border-r-2 border-emerald-600/30 pr-4 mr-2">
                  {UNIVERSITY_EDUCATION.map((edu, idx) => (
                    <div key={edu.id} className="relative space-y-2">
                      {/* Timeline dot */}
                      <div className="absolute right-[-21px] top-1.5 w-3 h-3 rounded-full bg-emerald-700 border-2 border-white shadow" />
                      
                      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{edu.degree}</h4>
                          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md flex-shrink-0">
                            {edu.years}
                          </span>
                        </div>
                        <p className="text-emerald-700 font-bold text-sm mt-1">{edu.field}</p>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">{edu.institution}</p>
                        
                        {edu.gpa && (
                          <p className="text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-block mt-2">
                            معدل کل: {edu.gpa}
                          </p>
                        )}

                        {edu.professors && (
                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                            <span className="font-extrabold text-slate-600">برخی اساتید شاخص:</span>
                            <div className="flex flex-wrap gap-1 mt-1 text-slate-500 font-light">
                              {edu.professors.map((prof, i) => (
                                <span key={i} className="bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded">
                                  {prof}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {edu.details && (
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 mt-3 pl-1 border-r-2 border-slate-200/60 pr-2">
                            {edu.details.map((det, i) => (
                              <li key={i}>{det}</li>
                            ))}
                          </ul>
                        )}

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Seminary Degrees */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 space-x-reverse border-b border-slate-200 pb-3">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900">تحصیلات حوزوی (مشهد مقدس)</h3>
                </div>

                <div className="space-y-6 relative border-r-2 border-amber-500/30 pr-4 mr-2">
                  {SEMINARY_EDUCATION.map((edu, idx) => (
                    <div key={edu.id} className="relative space-y-2">
                      {/* Timeline dot */}
                      <div className="absolute right-[-21px] top-1.5 w-3 h-3 rounded-full bg-amber-600 border-2 border-white shadow" />
                      
                      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{edu.degree}</h4>
                          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md flex-shrink-0">
                            {edu.years}
                          </span>
                        </div>
                        <p className="text-amber-700 font-bold text-sm mt-1">{edu.field}</p>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">{edu.institution}</p>
                        
                        {edu.gpa && (
                          <p className="text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-block mt-2">
                            معدل: {edu.gpa}
                          </p>
                        )}

                        {edu.professors && (
                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                            <span className="font-extrabold text-slate-600">برخی اساتید عالی حوزه:</span>
                            <div className="flex flex-wrap gap-1 mt-1 text-slate-500 font-light">
                              {edu.professors.map((prof, i) => (
                                <span key={i} className="bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded">
                                  {prof}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {edu.details && (
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 mt-3 pl-1 border-r-2 border-slate-200/60 pr-2">
                            {edu.details.map((det, i) => (
                              <li key={i}>{det}</li>
                            ))}
                          </ul>
                        )}

                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* 4. PUBLICATIONS & ARTICLES TAB */}
        {/* ============================================================= */}
        {activeTab === 'publications' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Quick overview metric banner */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">جستجو در آثار علمی و مقالات</h3>
                <p className="text-xs text-slate-500 mt-1">
                  شامل ۳ عنوان کتاب تالیفی رسمی و ۷۴ عنوان مقاله منتشر شده در مجلات معتبر علمی پژوهشی و ترویجی و کنفرانس‌ها
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1.5 rounded-full">
                  ۳۲ مقاله علمی پژوهشی وزارتین
                </span>
                <span className="bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1.5 rounded-full">
                  ۸ مقاله علمی ترویجی
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                  کتب و مقالات تخصصی همایشی
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
              {/* Search text */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو در عنوان مقاله، نشریه یا سال انتشار..."
                  value={searchArticle}
                  onChange={(e) => {
                    setSearchArticle(e.target.value);
                    setArticlePage(1); // reset to page 1
                  }}
                  className="w-full pr-10 pl-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Type Category Filter Chips */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'همه مقالات' },
                  { id: 'research', label: 'علمی پژوهشی' },
                  { id: 'extension', label: 'علمی ترویجی' },
                  { id: 'specialized', label: 'تخصصی و دانشجویی' },
                  { id: 'conference', label: 'همایش‌ها و کنفرانس‌ها' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => {
                      setFilterArticleType(chip.id);
                      setArticlePage(1); // reset to page 1
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                      filterArticleType === chip.id
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List / Grid with Search results indicator */}
            {filteredArticles.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-bold px-1">
                  یافت شده: {filteredArticles.length} مقاله علمی مطابق با فیلتر شما
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedArticles.map((art) => {
                    // Decide border/badge styling depending on type
                    let badgeBg = "bg-slate-100 text-slate-700 border-slate-200";
                    if (art.type === 'research') {
                      badgeBg = "bg-emerald-50 text-emerald-900 border-emerald-200/80";
                    } else if (art.type === 'extension') {
                      badgeBg = "bg-amber-50 text-amber-900 border-amber-200/80";
                    }

                    return (
                      <div 
                        key={art.id} 
                        className="bg-white rounded-xl p-5 border border-slate-200/80 hover:border-emerald-200 shadow-sm flex flex-col justify-between hover:shadow transition-all duration-200"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeBg}`}>
                              {art.typeFa}
                            </span>
                            {art.year && (
                              <span className="text-[11px] text-slate-400 flex items-center">
                                <Calendar className="h-3 w-3 ml-1" />
                                {art.year}
                              </span>
                            )}
                          </div>
                          
                          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                            {art.title}
                          </h4>
                          
                          <p className="text-xs text-slate-500 font-light flex items-center pt-1">
                            <Building2 className="h-3.5 w-3.5 ml-1 text-slate-400" />
                            {art.journal}
                          </p>
                        </div>

                        {art.doi && (
                          <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">شناسه دیجیتال (DOI):</span>
                            <a 
                              href={`https://doi.org/${art.doi}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-emerald-700 font-mono hover:underline flex items-center"
                            >
                              {art.doi}
                              <ExternalLink className="h-3 w-3 mr-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalArticlePages > 1 && (
                  <div className="flex justify-center items-center space-x-2 space-x-reverse pt-6">
                    <button
                      disabled={articlePage === 1}
                      onClick={() => setArticlePage(prev => Math.max(prev - 1, 1))}
                      className="p-1.5 rounded border border-slate-300 disabled:opacity-30 bg-white text-slate-600 hover:bg-slate-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    <span className="text-xs text-slate-600 font-bold px-3">
                      صفحه {articlePage} از {totalArticlePages}
                    </span>

                    <button
                      disabled={articlePage === totalArticlePages}
                      onClick={() => setArticlePage(prev => Math.min(prev + 1, totalArticlePages))}
                      className="p-1.5 rounded border border-slate-300 disabled:opacity-30 bg-white text-slate-600 hover:bg-slate-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <SearchCode className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-bold">هیچ مقاله‌ای با مشخصات جستجوی شما یافت نشد.</p>
                <button 
                  onClick={() => { setSearchArticle(''); setFilterArticleType('all'); }}
                  className="mt-3 text-xs text-emerald-700 font-bold underline"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}

          </div>
        )}

        {/* ============================================================= */}
        {/* 5. SUPERVISED DISSERTATIONS (THESES) TAB */}
        {/* ============================================================= */}
        {activeTab === 'theses' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">بانک اطلاعاتی رساله‌های علمی و پایان‌نامه‌ها</h3>
              <p className="text-xs text-slate-500 mt-1">
                دکتر مصطفی احمدی فر تا کنون راهنمایی و مشاوره بیش از ۱۱۰ پایان‌نامه ارشد و رساله دکتری طلاب المصطفی را برعهده داشته است. (لیست برخی موارد برجسته در زیر قابل جستجو است).
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
              {/* Search text */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو در موضوع پایان‌نامه، نام دانشجو یا دانشگاه..."
                  value={searchThesis}
                  onChange={(e) => setSearchThesis(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Level Filter Chips */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'همه مقاطع' },
                  { id: 'arshad', label: 'کارشناسی ارشد (سطح ۳)' },
                  { id: 'phd', label: 'دکتری تخصصی (سطح ۴)' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setFilterThesisLevel(chip.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                      filterThesisLevel === chip.id
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List Results */}
            {filteredTheses.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-bold px-1">
                  تعداد موارد یافت شده: {filteredTheses.length} پایان‌نامه تحت راهنمایی / مشاوره
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTheses.map((the) => {
                    const isPhd = the.level.includes('دکتری') || the.level.includes('سطح ۴');
                    return (
                      <div 
                        key={the.id}
                        className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-200 shadow-sm flex flex-col justify-between hover:shadow transition-all duration-200"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPhd ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-blue-50 text-blue-900 border border-blue-100'
                            }`}>
                              {the.level}
                            </span>
                            <span className="text-[10px] text-slate-400 font-light flex items-center">
                              <Calendar className="h-3 w-3 ml-1" />
                              دفاع: {the.defenseDate}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm leading-relaxed line-clamp-3">
                            {the.title}
                          </h4>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-50 text-xs space-y-1">
                          <p className="text-slate-600">
                            <span className="font-extrabold text-slate-500">دانشجو:</span> {the.studentName}
                          </p>
                          <p className="text-slate-400 flex items-center text-[11px]">
                            <Building2 className="h-3 w-3 ml-1" />
                            {the.university}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <SearchCode className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-bold">پایان‌نامه‌ای مطابق با فیلترها یافت نشد.</p>
                <button 
                  onClick={() => { setSearchThesis(''); setFilterThesisLevel('all'); }}
                  className="mt-3 text-xs text-emerald-700 font-bold underline"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}

          </div>
        )}

        {/* ============================================================= */}
        {/* 6. HONORS & RESPONSIBILITIES TAB */}
        {/* ============================================================= */}
        {activeTab === 'honors' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Filter tags for categories */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'همه افتخارات و فعالیت‌ها', icon: Award },
                { id: 'award', label: 'جوایز علمی و رتبه‌ها', icon: Sparkles },
                { id: 'position', label: 'مسئولیت‌های اجرایی-علمی', icon: Building2 },
                { id: 'council', label: 'عضویت در شوراها و هیئت داوران', icon: FileCheck },
                { id: 'journey', label: 'سفرهای پژوهشی و علمی بین‌المللی', icon: ChevronLeft },
              ].map((chip) => {
                const IconComponent = chip.icon;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setFilterHonorCategory(chip.id)}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center ${
                      filterHonorCategory === chip.id
                        ? 'bg-emerald-800 text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/55'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 ml-1.5" />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* List timeline cards */}
            <div className="space-y-4">
              {filteredHonors.map((hon) => {
                let cardColor = "border-l-4 border-l-slate-400";
                let iconBg = "bg-slate-100 text-slate-700";
                
                if (hon.category === 'award') {
                  cardColor = "border-r-4 border-r-amber-500 bg-amber-50/5 hover:bg-amber-50/20";
                  iconBg = "bg-amber-100 text-amber-900";
                } else if (hon.category === 'position') {
                  cardColor = "border-r-4 border-r-emerald-600 bg-emerald-50/5 hover:bg-emerald-50/15";
                  iconBg = "bg-emerald-100 text-emerald-900";
                } else if (hon.category === 'council') {
                  cardColor = "border-r-4 border-r-blue-500 bg-blue-50/5 hover:bg-blue-50/15";
                  iconBg = "bg-blue-100 text-blue-950";
                } else if (hon.category === 'journey') {
                  cardColor = "border-r-4 border-r-indigo-600 bg-indigo-50/5 hover:bg-indigo-50/15";
                  iconBg = "bg-indigo-100 text-indigo-950";
                }

                return (
                  <div 
                    key={hon.id}
                    className={`bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-4 transition-all duration-300 ${cardColor}`}
                  >
                    <div className={`p-2.5 rounded-lg flex-shrink-0 ${iconBg} hidden sm:flex`}>
                      {hon.category === 'award' && <Sparkles className="h-5 w-5" />}
                      {hon.category === 'position' && <Building2 className="h-5 w-5" />}
                      {hon.category === 'council' && <FileCheck className="h-5 w-5" />}
                      {hon.category === 'journey' && <MapPin className="h-5 w-5" />}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {hon.categoryFa}
                      </span>
                      <h4 className="text-slate-900 font-extrabold text-sm sm:text-base leading-relaxed">
                        {hon.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer id="footer-bottom" className="bg-[#0b1f1a] text-emerald-200 border-t border-emerald-950 py-12 mt-16 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-emerald-900/60">
            
            {/* About */}
            <div className="space-y-3 text-center md:text-right">
              <h4 className="font-extrabold text-white text-base">دکتر مصطفی احمدی فر</h4>
              <p className="text-emerald-300 font-light leading-relaxed">
                استاد عالی‌رتبه حوزه علمیه و عضو هیئت علمی دانشگاه، با بیش از ۲۰ سال سابقه پژوهش و تدریس در مجامع حوزوی و آکادمیک بین‌المللی.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 text-center">
              <h4 className="font-extrabold text-white text-base">بخش‌های وبسایت</h4>
              <div className="grid grid-cols-2 gap-2 text-emerald-300">
                <button onClick={() => handleTabChange('profile')} className="hover:text-amber-300 hover:underline text-right pr-4">صفحه اصلی</button>
                <button onClick={() => handleTabChange('teaching')} className="hover:text-amber-300 hover:underline text-right pr-4">سوابق تدریس</button>
                <button onClick={() => handleTabChange('education')} className="hover:text-amber-300 hover:underline text-right pr-4">تحصیلات</button>
                <button onClick={() => handleTabChange('publications')} className="hover:text-amber-300 hover:underline text-right pr-4">تالیفات علمی</button>
                <button onClick={() => handleTabChange('theses')} className="hover:text-amber-300 hover:underline text-right pr-4">بانک رساله‌ها</button>
                <button onClick={() => handleTabChange('honors')} className="hover:text-amber-300 hover:underline text-right pr-4">جوایز علمی</button>
              </div>
            </div>

            {/* Credits / Watermark */}
            <div className="space-y-3 text-center md:text-left">
              <h4 className="font-extrabold text-white text-base">مرکز زبان و معارف اسلامی</h4>
              <p className="text-emerald-300 font-light leading-relaxed">
                نمایندگی جامعه المصطفی العالمیه خراسان - حوزه علمیه مشهد مقدس.
              </p>
              <div className="text-slate-400 text-[10px] mt-4 font-mono">
                © {new Date().getFullYear()} Dr. Ahmadifar. All rights reserved.
              </div>
            </div>

          </div>

          {/* Humble scholarly quote as footer ornament */}
          <div className="pt-6 text-center text-[11px] text-emerald-400 font-light leading-relaxed">
            «أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ» - سوره مبارکه ابراهیم آیه ۲۴
          </div>

        </div>
      </footer>

    </div>
  );
}
