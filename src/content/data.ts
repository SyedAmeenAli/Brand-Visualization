import type { L } from '@/lib/i18n';

/* ---------------------------------------------------------------------------------------------
 * Structured content. Every value here is traceable to SOURCE_MAP.md (Figma file Final-Aqarati,
 * FigJam Aqarati-Architecture). Items marked status:'proposed' are PROPOSED in the Figma source.
 * ------------------------------------------------------------------------------------------- */

export type NavItem = { key: string; href: string; label: L; num: string };

/** One entry per page. The dock, the footer and the chapter index all read this list. */
export const NAV: NavItem[] = [
  { key: 'home', href: '/', num: '00', label: { en: 'Home', ar: 'الرئيسية' } },
  { key: 'identity', href: '/identity', num: '02', label: { en: 'Identity', ar: 'الهوية' } },
  { key: 'typography', href: '/typography', num: '03', label: { en: 'Typography', ar: 'الخطوط' } },
  { key: 'colour', href: '/colour', num: '04', label: { en: 'Colour', ar: 'الألوان' } },
  { key: 'visual-language', href: '/visual-language', num: '05', label: { en: 'Visual Language', ar: 'اللغة البصرية' } },
  { key: 'product', href: '/product', num: '09', label: { en: 'Product', ar: 'المنتج' } },
  { key: 'applications', href: '/applications', num: '10', label: { en: 'Applications', ar: 'التطبيقات' } },
  { key: 'usage', href: '/usage', num: '11', label: { en: 'Usage', ar: 'الاستخدام' } },
];

export type ChapterCard = { key: string; blurb: L; image: { file: string; w: number; h: number; focus?: string; alt: L } };

/** Chapter index cards (home) and page banners. Imagery is the approved Figma photography. */
export const CHAPTERS: ChapterCard[] = [
  { key: 'identity', blurb: { en: 'The master mark, how it is built, how much room it needs and where it can go.', ar: 'الشعار الرئيسي، كيف بُني، وكم يحتاج من مساحة وأين يمكن أن يظهر.' }, image: { file: 'p19-5184x3888.webp', w: 1800, h: 1350, focus: '50% 35%', alt: { en: 'A concrete facade with louvred screening.', ar: 'واجهة خرسانية بحاجب مشبّك.' } } },
  { key: 'typography', blurb: { en: 'Fraunces and Plus Jakarta Sans in English, with Arabic set as an equal.', ar: 'Fraunces وPlus Jakarta Sans بالإنجليزية، والعربية على قدم المساواة.' }, image: { file: 'p25-1920x897.webp', w: 1800, h: 841, focus: '50% 50%', alt: { en: 'A grand reading room filled with people at long tables.', ar: 'قاعة قراءة فسيحة يملؤها الناس على طاولات طويلة.' } } },
  { key: 'colour', blurb: { en: 'Mocha, Ivory and Deep Mocha, with warm neutrals designed for light and dark.', ar: 'موكا وعاجي وموكا داكن، مع محايدات دافئة للوضعين الفاتح والداكن.' }, image: { file: 'p08-3888x2592.webp', w: 1800, h: 1200, focus: '50% 55%', alt: { en: 'Arched windows glowing on a sand-coloured facade at night.', ar: 'نوافذ مقوّسة مضيئة على واجهة رملية ليلاً.' } } },
  { key: 'visual-language', blurb: { en: 'Photography, iconography, illustration, spacing, radius, elevation and motion.', ar: 'التصوير والأيقونات والرسوم والمسافات والزوايا والارتفاع والحركة.' }, image: { file: 'p20-3016x2415.webp', w: 1800, h: 1441, focus: '50% 50%', alt: { en: 'A terraced village among palms below rocky mountains.', ar: 'قرية مدرّجة بين النخيل أسفل جبال صخرية.' } } },
  { key: 'product', blurb: { en: 'Light and dark product screens, navigation, a property expressed and verification.', ar: 'شاشات المنتج الفاتحة والداكنة والتنقل والعقار والتوثيق.' }, image: { file: 'p19-1920x1731.webp', w: 1800, h: 1623, focus: '50% 55%', alt: { en: 'A modern two-storey house with a timber garage door and glazed upper floor.', ar: 'منزل عصري من طابقين ببوابة جراج خشبية وطابق علوي زجاجي.' } } },
  { key: 'applications', blurb: { en: 'The app icon, the launch screen and the brand on the web, paper and social.', ar: 'أيقونة التطبيق وشاشة الإطلاق والعلامة على الويب والورق والتواصل.' }, image: { file: 'p05-3264x2448.webp', w: 1800, h: 1350, focus: '50% 60%', alt: { en: 'Two people walking across a paved plaza.', ar: 'شخصان يعبران ساحة مرصوفة.' } } },
  { key: 'usage', blurb: { en: 'What to do, what to avoid, and the rules that keep the brand quietly distinctive.', ar: 'ما يجب فعله وما يجب تجنبه والقواعد التي تُبقي العلامة هادئة ومميزة.' }, image: { file: 'p13-2000x2000.webp', w: 2000, h: 2000, focus: '50% 40%', alt: { en: 'An open window with a balcony railing above a bed.', ar: 'نافذة مفتوحة بدرابزين شرفة فوق سرير.' } } },
];

/* ---------------- colour (Figma step 08 + 09) ---------------- */

export type Swatch = {
  id: string;
  name: L;
  hex: string;
  dark?: string; // dark-theme value for semantic tokens
  role: L;
  token?: string;
  status: 'measured' | 'proposed';
};

export const BRAND_COLOURS: Swatch[] = [
  { id: 'mocha', name: { en: 'Mocha', ar: 'موكا' }, hex: '#825C3F', role: { en: 'Primary brand colour. CTA fill, the master logo.', ar: 'اللون الأساسي للعلامة. زر الإجراء الرئيسي وشعار الهوية.' }, token: 'brand/primary', status: 'measured' },
  { id: 'ivory', name: { en: 'Ivory', ar: 'عاجي' }, hex: '#ECE3D7', role: { en: 'The master logo presentation surface. Warm, paper-like.', ar: 'سطح عرض الشعار الرئيسي. دافئ بملمس الورق.' }, token: 'background/secondary', status: 'measured' },
  { id: 'deep-mocha', name: { en: 'Deep Mocha', ar: 'موكا داكن' }, hex: '#674830', role: { en: 'Deep accents measured from the artwork.', ar: 'درجات داكنة مقاسة من العمل الفني.' }, token: 'artwork accent', status: 'measured' },
];

export const NEUTRAL_COLOURS: Swatch[] = [
  { id: 'n-bg', name: { en: 'Warm Paper', ar: 'ورق دافئ' }, hex: '#F7F4EF', dark: '#211E1B', role: { en: 'Primary background.', ar: 'الخلفية الأساسية.' }, token: 'background/primary', status: 'proposed' },
  { id: 'n-surface', name: { en: 'White', ar: 'أبيض' }, hex: '#FFFFFF', dark: '#302B26', role: { en: 'Cards and surfaces.', ar: 'البطاقات والأسطح.' }, token: 'surface/primary', status: 'proposed' },
  { id: 'n-ink', name: { en: 'Deep Warm Ink', ar: 'حبر دافئ' }, hex: '#2D2823', dark: '#F4EEE6', role: { en: 'Primary text.', ar: 'النص الأساسي.' }, token: 'text/primary', status: 'proposed' },
  { id: 'n-ink2', name: { en: 'Warm Grey', ar: 'رمادي دافئ' }, hex: '#655C52', dark: '#C8BCAD', role: { en: 'Secondary text.', ar: 'النص الثانوي.' }, token: 'text/secondary', status: 'proposed' },
  { id: 'n-line', name: { en: 'Stone', ar: 'حجر' }, hex: '#C9BFB2', dark: '#615548', role: { en: 'Borders and dividers.', ar: 'الحدود والفواصل.' }, token: 'border/default', status: 'proposed' },
];

export const SEMANTIC_COLOURS: Swatch[] = [
  { id: 's-success', name: { en: 'Success', ar: 'نجاح' }, hex: '#3E6E51', dark: '#A4C6AD', role: { en: 'Approved, verified.', ar: 'معتمد، موثّق.' }, token: 'success', status: 'proposed' },
  { id: 's-warning', name: { en: 'Warning', ar: 'تنبيه' }, hex: '#956620', dark: '#D8B67C', role: { en: 'Pending, needs action.', ar: 'قيد المراجعة، يتطلب إجراء.' }, token: 'warning', status: 'proposed' },
  { id: 's-error', name: { en: 'Error', ar: 'خطأ' }, hex: '#A0443F', dark: '#E0AAA4', role: { en: 'Rejected, failed.', ar: 'مرفوض، فشل.' }, token: 'error', status: 'proposed' },
  { id: 's-info', name: { en: 'Info', ar: 'معلومة' }, hex: '#4F6980', dark: '#A4BDD1', role: { en: 'Informational.', ar: 'للإحاطة.' }, token: 'info', status: 'proposed' },
  { id: 's-disabled', name: { en: 'Disabled', ar: 'معطّل' }, hex: '#A69E94', dark: '#786C60', role: { en: 'Unavailable controls.', ar: 'عناصر غير متاحة.' }, token: 'disabled', status: 'proposed' },
];

/** Light and dark UI tokens, Figma S09-F11 / S09-F12 */
export const UI_TOKENS: { token: string; light: string; dark: string }[] = [
  { token: 'background/primary', light: '#F7F4EF', dark: '#211E1B' },
  { token: 'background/secondary', light: '#ECE3D7', dark: '#2B2622' },
  { token: 'surface/primary', light: '#FFFFFF', dark: '#302B26' },
  { token: 'surface/elevated', light: '#FFFFFF', dark: '#3A332D' },
  { token: 'text/primary', light: '#2D2823', dark: '#F4EEE6' },
  { token: 'text/secondary', light: '#655C52', dark: '#C8BCAD' },
  { token: 'text/tertiary', light: '#81776C', dark: '#A99C8C' },
  { token: 'border/default', light: '#C9BFB2', dark: '#615548' },
  { token: 'border/subtle', light: '#E1DAD0', dark: '#443B32' },
  { token: 'brand/primary', light: '#825C3F', dark: '#825C3F' },
  { token: 'success', light: '#3E6E51', dark: '#A4C6AD' },
  { token: 'warning', light: '#956620', dark: '#D8B67C' },
  { token: 'error', light: '#A0443F', dark: '#E0AAA4' },
  { token: 'info', light: '#4F6980', dark: '#A4BDD1' },
  { token: 'disabled', light: '#A69E94', dark: '#786C60' },
];

/* ---------------- typography (Figma step 07 + 10) ---------------- */

export type TypeRole = {
  role: string;
  size: number;
  line: number;
  weight: number;
  family: 'display' | 'sans';
  sample: L;
  usage: L;
};

export const TYPE_ROLES: TypeRole[] = [
  { role: 'DisplayLarge', size: 72, line: 84, weight: 400, family: 'display', sample: { en: 'A place to belong.', ar: 'مكان تنتمي إليه.' }, usage: { en: 'Hero statements', ar: 'العبارات الرئيسية' } },
  { role: 'Display', size: 56, line: 64, weight: 400, family: 'display', sample: { en: 'Your next chapter.', ar: 'فصلك القادم.' }, usage: { en: 'Large editorial moments', ar: 'اللحظات التحريرية الكبرى' } },
  { role: 'H1', size: 40, line: 48, weight: 600, family: 'display', sample: { en: '4-Bedroom Contemporary Villa', ar: 'فيلا عصرية من 4 غرف' }, usage: { en: 'Property title', ar: 'عنوان العقار' } },
  { role: 'H2', size: 32, line: 40, weight: 600, family: 'display', sample: { en: 'Al Mouj, Muscat', ar: 'الموج، مسقط' }, usage: { en: 'Location, section heads', ar: 'الموقع وعناوين الأقسام' } },
  { role: 'H3', size: 24, line: 32, weight: 600, family: 'sans', sample: { en: 'Property details', ar: 'تفاصيل العقار' }, usage: { en: 'Sub-sections', ar: 'الأقسام الفرعية' } },
  { role: 'H4', size: 20, line: 28, weight: 600, family: 'sans', sample: { en: 'Request a viewing', ar: 'اطلب معاينة' }, usage: { en: 'Card titles, actions', ar: 'عناوين البطاقات والإجراءات' } },
  { role: 'BodyLarge', size: 18, line: 28, weight: 400, family: 'sans', sample: { en: 'Explore spaces shaped for everyday life.', ar: 'اكتشف مساحات صُممت للحياة اليومية.' }, usage: { en: 'Lead paragraphs', ar: 'الفقرات التمهيدية' } },
  { role: 'Body', size: 16, line: 24, weight: 400, family: 'sans', sample: { en: 'Select a preferred date and review the property details.', ar: 'اختر موعداً مناسباً وراجع تفاصيل العقار.' }, usage: { en: 'Reading text', ar: 'نص القراءة' } },
  { role: 'BodySmall', size: 14, line: 20, weight: 400, family: 'sans', sample: { en: 'Sample property information, not actual inventory.', ar: 'معلومات عقار تجريبية وليست مخزوناً فعلياً.' }, usage: { en: 'Supporting copy', ar: 'نص داعم' } },
  { role: 'LabelLarge', size: 16, line: 24, weight: 500, family: 'sans', sample: { en: 'Preferred viewing date', ar: 'موعد المعاينة المفضل' }, usage: { en: 'Form labels', ar: 'عناوين الحقول' } },
  { role: 'Label', size: 14, line: 20, weight: 500, family: 'sans', sample: { en: 'Property type', ar: 'نوع العقار' }, usage: { en: 'Filters, tabs', ar: 'المرشحات والتبويبات' } },
  { role: 'Caption', size: 12, line: 18, weight: 400, family: 'sans', sample: { en: 'Updated sample / Muscat', ar: 'عينة محدّثة / مسقط' }, usage: { en: 'Metadata', ar: 'البيانات الوصفية' } },
];

/* ---------------- photography (Figma step 11) ---------------- */

export type PhotoCategory = 'architecture' | 'interiors' | 'exteriors' | 'oman' | 'human' | 'daylight';

export type Photo = {
  file: string;
  w: number;
  h: number;
  category: PhotoCategory;
  caption: L;
  alt: L;
  focus?: string; // object-position
};

export const PHOTO_CATEGORIES: { id: PhotoCategory; label: L; note: L }[] = [
  { id: 'architecture', label: { en: 'Architecture', ar: 'العمارة' }, note: { en: 'Honest arrival, material and street continuity.', ar: 'مدخل صادق، مواد وامتداد الشارع.' } },
  { id: 'interiors', label: { en: 'Interiors', ar: 'التصميم الداخلي' }, note: { en: 'Uncluttered scale, timber and practical materials.', ar: 'مقياس هادئ، خشب ومواد عملية.' } },
  { id: 'exteriors', label: { en: 'Exteriors', ar: 'الواجهات' }, note: { en: 'Facades read in shade and depth.', ar: 'واجهات تُقرأ بالظل والعمق.' } },
  { id: 'oman', label: { en: 'Oman', ar: 'عُمان' }, note: { en: 'Context that belongs to the place.', ar: 'سياق ينتمي إلى المكان.' } },
  { id: 'human', label: { en: 'Human scale', ar: 'المقياس الإنساني' }, note: { en: 'Spaces measured by people, not staged.', ar: 'مساحات تُقاس بالناس لا بالتصوير المصطنع.' } },
  { id: 'daylight', label: { en: 'Daylight', ar: 'ضوء النهار' }, note: { en: 'Light that belongs to the space.', ar: 'ضوء ينتمي إلى المكان.' } },
];

export const PHOTOS: Photo[] = [
  { file: 'p19-1920x1731.webp', w: 1920, h: 1731, category: 'architecture', caption: { en: 'Architecture / honest arrival', ar: 'عمارة / مدخل صادق' }, alt: { en: 'A modern two-storey house with a timber garage door and glazed upper floor.', ar: 'منزل عصري من طابقين ببوابة جراج خشبية وطابق علوي زجاجي.' } },
  { file: 'p20-1895x1272.webp', w: 1895, h: 1272, category: 'architecture', caption: { en: 'Residential block / street continuity', ar: 'مبنى سكني / امتداد الشارع' }, alt: { en: 'White residential buildings below a mountain ridge.', ar: 'مبانٍ سكنية بيضاء أسفل سلسلة جبلية.' } },
  { file: 'p19-1920x1199.webp', w: 1920, h: 1199, category: 'architecture', caption: { en: 'Material / shade and screening', ar: 'مادة / ظل وحجب' }, alt: { en: 'A concrete facade with louvred screening.', ar: 'واجهة خرسانية بحاجب مشبّك.' } },
  { file: 'p09-5346x3568.webp', w: 1800, h: 1201, category: 'interiors', caption: { en: 'Living / timber and daylight', ar: 'معيشة / خشب وضوء نهار' }, alt: { en: 'A bright living room with a herringbone timber floor.', ar: 'غرفة معيشة مشرقة بأرضية خشبية.' } },
  { file: 'p09-2000x1333.webp', w: 2000, h: 1333, category: 'interiors', caption: { en: 'Bedroom / uncluttered scale', ar: 'غرفة نوم / مقياس هادئ' }, alt: { en: 'A calm bedroom with a timber wall and a desk by the window.', ar: 'غرفة نوم هادئة بجدار خشبي ومكتب عند النافذة.' } },
  { file: 'p12-2000x1328.webp', w: 2000, h: 1328, category: 'interiors', caption: { en: 'Kitchen / practical materials', ar: 'مطبخ / مواد عملية' }, alt: { en: 'A white kitchen with dark pendant lights.', ar: 'مطبخ أبيض بإضاءة معلّقة داكنة.' } },
  { file: 'p19-5184x3888.webp', w: 1800, h: 1350, category: 'exteriors', caption: { en: 'Facade / shade and depth', ar: 'واجهة / ظل وعمق' }, alt: { en: 'Carved timber balconies on a white facade.', ar: 'شرفات خشبية منحوتة على واجهة بيضاء.' } },
  { file: 'p20-3016x2415.webp', w: 1800, h: 1441, category: 'exteriors', caption: { en: 'Context / terraced village and palms', ar: 'سياق / قرية مدرّجة ونخيل' }, alt: { en: 'A terraced village among palms below rocky mountains.', ar: 'قرية مدرّجة بين النخيل أسفل جبال صخرية.' } },
  { file: 'p05-3264x2448.webp', w: 1800, h: 1350, category: 'oman', caption: { en: 'Muscat residential lane', ar: 'زقاق سكني في مسقط' }, alt: { en: 'A quiet residential lane with white houses under a mountain.', ar: 'زقاق سكني هادئ ببيوت بيضاء تحت جبل.' } },
  { file: 'p05-2736x3648.webp', w: 1350, h: 1800, category: 'oman', caption: { en: 'Misfah timber door', ar: 'باب خشبي في مسفاة' }, alt: { en: 'A carved terracotta-coloured timber door.', ar: 'باب خشبي منحوت بلون الطين.' }, focus: '50% 40%' },
  { file: 'p08-3888x2592.webp', w: 1800, h: 1200, category: 'oman', caption: { en: 'Muttrah / facade at night', ar: 'مطرح / واجهة ليلاً' }, alt: { en: 'Arched windows glowing on a sand-coloured facade at night.', ar: 'نوافذ مقوّسة مضيئة على واجهة رملية ليلاً.' } },
  { file: 'p24-1920x2887.webp', w: 1280, h: 1925, category: 'human', caption: { en: 'Context / everyday street', ar: 'سياق / شارع يومي' }, alt: { en: 'People walking down a cobbled street.', ar: 'أشخاص يسيرون في شارع مرصوف.' } },
  { file: 'p25-1920x1440.webp', w: 1920, h: 1440, category: 'human', caption: { en: 'Life / walking the plaza', ar: 'حياة / السير في الساحة' }, alt: { en: 'Two people walking across a paved plaza.', ar: 'شخصان يعبران ساحة مرصوفة.' } },
  { file: 'p25-1920x897.webp', w: 1800, h: 841, category: 'human', caption: { en: 'Belonging / reading room', ar: 'انتماء / قاعة قراءة' }, alt: { en: 'A grand reading room filled with people at long tables.', ar: 'قاعة قراءة فسيحة يملؤها الناس على طاولات طويلة.' } },
  { file: 'p23-1920x1385.webp', w: 1800, h: 1298, category: 'architecture', caption: { en: 'Material / brick and rhythm', ar: 'مادة / طوب وإيقاع' }, alt: { en: 'A brick building with a stepped silhouette against the sky.', ar: 'مبنى من الطوب بصورة متدرجة أمام السماء.' } },
  { file: 'p19-1920x1640.webp', w: 1800, h: 1538, category: 'architecture', caption: { en: 'Street / continuity of frontage', ar: 'شارع / امتداد الواجهات' }, alt: { en: 'A tall building and a stone church along a quiet street.', ar: 'مبنى شاهق وكنيسة حجرية على شارع هادئ.' } },
  { file: 'p16-3840x2560.webp', w: 1800, h: 1200, category: 'interiors', caption: { en: 'Kitchen / daylight and colour', ar: 'مطبخ / ضوء نهار ولون' }, alt: { en: 'A bright kitchen with pendant lights and a dining table by the windows.', ar: 'مطبخ مشرق بإضاءة معلّقة وطاولة طعام عند النوافذ.' } },
  { file: 'p09-2000x1333-3.webp', w: 1800, h: 1200, category: 'interiors', caption: { en: 'Bedroom / soft light', ar: 'غرفة نوم / ضوء ناعم' }, alt: { en: 'A bedroom with purple curtains and framed prints above the bed.', ar: 'غرفة نوم بستائر بنفسجية ولوحات مؤطرة فوق السرير.' } },
  { file: 'p12-1920x1434.webp', w: 1800, h: 1344, category: 'interiors', caption: { en: 'Bathroom / stone and light', ar: 'حمّام / حجر وضوء' }, alt: { en: 'A granite vanity with two basins and a mirror.', ar: 'حوض غرانيت مزدوج ومرآة.' } },
  { file: 'p06-4000x3000.webp', w: 1800, h: 1350, category: 'oman', caption: { en: 'Waterfront / evening light', ar: 'واجهة بحرية / ضوء المساء' }, alt: { en: 'A marina at night with moored boats and lit apartment buildings.', ar: 'مرسى ليلاً بقوارب راسية ومبانٍ سكنية مضاءة.' } },
  { file: 'p19-4416x3312.webp', w: 1800, h: 1350, category: 'oman', caption: { en: 'City street / daily movement', ar: 'شارع المدينة / حركة يومية' }, alt: { en: 'A busy street with a bus, taxis and pale mid-rise buildings.', ar: 'شارع مزدحم بحافلة وسيارات أجرة ومبانٍ فاتحة متوسطة الارتفاع.' } },
  { file: 'p25-1920x1440-2.webp', w: 1800, h: 1350, category: 'human', caption: { en: 'Life / a quiet library', ar: 'حياة / مكتبة هادئة' }, alt: { en: 'A person browsing between yellow library shelves.', ar: 'شخص يتصفح بين رفوف مكتبة صفراء.' } },
  { file: 'p13-2000x2000.webp', w: 2000, h: 2000, category: 'daylight', caption: { en: 'Light / window and threshold', ar: 'ضوء / نافذة وعتبة' }, alt: { en: 'An open window with a balcony railing above a bed.', ar: 'نافذة مفتوحة بدرابزين شرفة فوق سرير.' } },
  { file: 'p19-2373x3160.webp', w: 1350, h: 1798, category: 'daylight', caption: { en: 'Light / a quiet window', ar: 'ضوء / نافذة هادئة' }, alt: { en: 'Soft daylight at a window, in black and white.', ar: 'ضوء نهار ناعم عند نافذة بالأبيض والأسود.' } },
];

/** Credits recorded in the Figma photography pages (S11). Per-image attribution is also documented in the source plates. */
export const PHOTO_CREDITS: { id: string; author: string; license: string }[] = [
  { id: 'P01', author: 'Yourusernamewillbepublic2', license: 'CC0' },
  { id: 'P02', author: 'Joe Castleman', license: 'CC BY-SA 3.0' },
  { id: 'P03', author: 'Francisco Anzola', license: 'CC BY 2.0' },
  { id: 'P04', author: 'Broc', license: 'CC0' },
  { id: 'P05', author: 'Ji-Elle', license: 'CC BY-SA 3.0' },
  { id: 'P06', author: 'Omar AV', license: 'CC BY 3.0' },
  { id: 'P07', author: 'Karananand2', license: 'CC0' },
  { id: 'P08', author: 'Izeberg007', license: 'CC0' },
  { id: 'P09', author: 'Jarosław Ceborski', license: 'CC0' },
  { id: 'P10', author: 'Viktoria Hall-Waldhauser', license: 'CC0' },
  { id: 'P11', author: 'Markus Spiske', license: 'CC0' },
  { id: 'P12', author: 'Gabriel Beaudry', license: 'CC0' },
  { id: 'P13', author: 'John Towner', license: 'CC0' },
  { id: 'P14', author: 'Christopher Johnson', license: 'CC0' },
  { id: 'P15', author: 'NeONBRAND', license: 'CC0' },
  { id: 'P16', author: 'Naomi Hébert', license: 'CC0' },
  { id: 'P17', author: 'Dan Watson', license: 'CC0' },
  { id: 'P18', author: 'XanderL', license: 'CC BY-SA 4.0' },
  { id: 'P19', author: 'Sardaka', license: 'CC BY-SA 4.0' },
  { id: 'P20', author: 'Paora', license: 'CC0' },
  { id: 'P21', author: 'The Chroniclers', license: 'CC BY-SA 4.0' },
  { id: 'P23', author: 'DiscoA340', license: 'CC BY-SA 4.0' },
  { id: 'P24', author: 'Jules Verne Times Two', license: 'CC BY-SA 4.0' },
  { id: 'P25', author: 'Fons Heijnsbroek', license: 'CC0' },
  { id: 'P27', author: 'Diliff', license: 'CC BY 2.5' },
  { id: 'P28', author: 'Woomiusee', license: 'CC BY-SA 3.0' },
];

/* ---------------- identity plates (Figma steps 01-05) ---------------- */

export type Plate = { id: string; title: L; note?: L };
export type PlateSet = { id: string; label: L; status: 'measured' | 'proposed'; lead: L; plates: Plate[] };

export const PLATE_SETS: PlateSet[] = [
  {
    id: 'construction',
    label: { en: 'Construction', ar: 'البناء' },
    status: 'measured',
    lead: { en: 'Built from a house, a wave and two wordmarks. Every measurement is read from the approved master vector.', ar: 'تتكوّن من بيت وموجة وكلمتين. كل قياس مأخوذ من الملف المعتمد للشعار.' },
    plates: [
      { id: 'con-overview', title: { en: 'Construction overview', ar: 'نظرة على البناء' } },
      { id: 'con-symbol', title: { en: 'Symbol construction', ar: 'بناء الرمز' } },
      { id: 'con-house', title: { en: 'House geometry', ar: 'هندسة البيت' } },
      { id: 'con-wave', title: { en: 'Wave geometry', ar: 'هندسة الموجة' } },
      { id: 'con-negative', title: { en: 'Negative space', ar: 'الفراغ السالب' } },
      { id: 'con-proportion', title: { en: 'Symbol proportion', ar: 'نسبة الرمز' } },
      { id: 'con-alignment', title: { en: 'Lockup alignment', ar: 'محاذاة التركيب' } },
      { id: 'con-wordmark', title: { en: 'Arabic + Latin wordmark', ar: 'الكلمة العربية واللاتينية' } },
      { id: 'con-grid', title: { en: 'Construction grid', ar: 'شبكة البناء' } },
    ],
  },
  {
    id: 'clear-space',
    label: { en: 'Clear space', ar: 'المساحة الآمنة' },
    status: 'proposed',
    lead: { en: 'One unit, X, is the height of the first Latin capital A. Proposed protected area: X on every side. Awaiting brand approval.', ar: 'وحدة واحدة X هي ارتفاع أول حرف A لاتيني. المساحة المقترحة: X من كل جانب. بانتظار اعتماد العلامة.' },
    plates: [
      { id: 'cs-overview', title: { en: 'Clear space overview', ar: 'نظرة على المساحة الآمنة' } },
      { id: 'cs-unit', title: { en: 'The unit X', ar: 'الوحدة X' } },
      { id: 'cs-protected', title: { en: 'Minimum protected area', ar: 'أقل مساحة محمية' } },
      { id: 'cs-lockup', title: { en: 'Primary lockup', ar: 'التركيب الأساسي' } },
      { id: 'cs-symbol', title: { en: 'Symbol', ar: 'الرمز' } },
      { id: 'cs-context', title: { en: 'Three surfaces', ar: 'ثلاثة أسطح' } },
      { id: 'cs-crowded', title: { en: 'Protected versus crowded', ar: 'محمي مقابل مزدحم' } },
      { id: 'cs-incorrect', title: { en: 'Incorrect', ar: 'غير صحيح' } },
    ],
  },
  {
    id: 'minimum-size',
    label: { en: 'Minimum size', ar: 'الحد الأدنى للحجم' },
    status: 'proposed',
    lead: { en: 'Tested on the intact master. These are visual observations, not locked thresholds; the final minimum is set after review.', ar: 'اختبار على الشعار الكامل. هذه ملاحظات بصرية وليست حدوداً نهائية؛ يُحدد الحد الأدنى بعد المراجعة.' },
    plates: [
      { id: 'ms-overview', title: { en: 'Minimum size', ar: 'الحد الأدنى للحجم' } },
      { id: 'ms-full', title: { en: 'Full lockup size test', ar: 'اختبار حجم التركيب الكامل' } },
      { id: 'ms-legibility', title: { en: 'Legibility test', ar: 'اختبار الوضوح' } },
      { id: 'ms-symbol', title: { en: 'Symbol-only size test', ar: 'اختبار الرمز وحده' } },
      { id: 'ms-zones', title: { en: 'Practical size zones', ar: 'نطاقات الحجم العملية' } },
      { id: 'ms-proposed', title: { en: 'Proposed minimum', ar: 'الحد الأدنى المقترح' } },
    ],
  },
  {
    id: 'variants',
    label: { en: 'Variants', ar: 'النسخ' },
    status: 'proposed',
    lead: { en: 'One master, controlled variants. Every variant is derived from the unchanged master artwork.', ar: 'شعار رئيسي واحد ونسخ مضبوطة. كل نسخة مشتقة من الملف الرئيسي دون تغيير.' },
    plates: [
      { id: 'var-overview', title: { en: 'Variant system', ar: 'منظومة النسخ' } },
      { id: 'var-primary', title: { en: 'Primary', ar: 'الأساسي' } },
      { id: 'var-compact', title: { en: 'Compact', ar: 'المدمج' } },
      { id: 'var-symbol', title: { en: 'Symbol', ar: 'الرمز' } },
      { id: 'var-horizontal', title: { en: 'Horizontal', ar: 'الأفقي' } },
      { id: 'var-stacked', title: { en: 'Stacked', ar: 'العمودي' } },
      { id: 'var-mono', title: { en: 'Monochrome', ar: 'أحادي اللون' } },
      { id: 'var-reverse', title: { en: 'Reverse', ar: 'معكوس' } },
      { id: 'var-light', title: { en: 'On light', ar: 'على الفاتح' } },
      { id: 'var-dark', title: { en: 'On dark', ar: 'على الداكن' } },
      { id: 'var-compare', title: { en: 'Comparison', ar: 'مقارنة' } },
    ],
  },
];

/* ---------------- product screens (Figma steps 18, 19) ---------------- */

export type Screen = { file: string; title: L; note: L; ratio: number };

export const LIGHT_SCREENS: Screen[] = [
  { file: 's18-f02-0', title: { en: 'Home', ar: 'الرئيسية' }, note: { en: 'Discovery with one direct search and a verified property.', ar: 'اكتشاف ببحث مباشر واحد وعقار موثّق.' }, ratio: 2004 / 864 },
  { file: 's18-f03-1', title: { en: 'Discover', ar: 'اكتشف' }, note: { en: 'Location, transaction and property type stay visible together.', ar: 'الموقع ونوع المعاملة والعقار تبقى ظاهرة معاً.' }, ratio: 2004 / 864 },
  { file: 's18-f04-0', title: { en: 'Property detail', ar: 'تفاصيل العقار' }, note: { en: 'An editorial record with one clear action.', ar: 'سجل تحريري بإجراء واحد واضح.' }, ratio: 2004 / 864 },
  { file: 's18-f05-0', title: { en: 'Professional profile', ar: 'ملف المهني' }, note: { en: 'Expertise, with clear trust signals.', ar: 'خبرة بإشارات ثقة واضحة.' }, ratio: 2004 / 864 },
  { file: 's18-f06-0', title: { en: 'Verification', ar: 'التوثيق' }, note: { en: 'Distinct review outcomes in plain language.', ar: 'نتائج مراجعة متمايزة بلغة بسيطة.' }, ratio: 2004 / 864 },
  { file: 's18-f08-0', title: { en: 'Navigation', ar: 'التنقل' }, note: { en: 'A persistent destination bar with an explicit active state.', ar: 'شريط وجهات ثابت بحالة نشطة واضحة.' }, ratio: 2004 / 864 },
];

export const DARK_SCREENS: Screen[] = [
  { file: 's19-f02-0', title: { en: 'Home', ar: 'الرئيسية' }, note: { en: 'Deep warm neutral. Mocha stays a fill, not body text.', ar: 'حيادي دافئ داكن. الموكا يبقى لوناً للتعبئة لا للنص.' }, ratio: 2290 / 964 },
  { file: 's19-f03-0', title: { en: 'Discover', ar: 'اكتشف' }, note: { en: 'The same hierarchy, re-tuned rather than inverted.', ar: 'التسلسل نفسه مع ضبط جديد لا قلب للألوان.' }, ratio: 2310 / 964 },
  { file: 's19-f04-0', title: { en: 'Property detail', ar: 'تفاصيل العقار' }, note: { en: 'Semantic colours shift to readable tints.', ar: 'الألوان الدلالية تتحول إلى درجات مقروءة.' }, ratio: 2112 / 964 },
];

export const SPLASH = [
  { file: 's21-light-0', label: { en: 'Light', ar: 'فاتح' }, note: { en: 'Warm ivory. Original mocha contours. Nothing competes with the identity.', ar: 'عاجي دافئ. خطوط الموكا الأصلية. لا شيء ينافس الهوية.' }, ratio: 2358 / 1032 },
  { file: 's21-dark-0', label: { en: 'Dark', ar: 'داكن' }, note: { en: 'White source contours on the deep warm neutral.', ar: 'خطوط الشعار البيضاء على الحيادي الدافئ الداكن.' }, ratio: 2414 / 1032 },
  { file: 's21-symbol-1', label: { en: 'Symbol first', ar: 'الرمز أولاً' }, note: { en: 'Option A, the primary candidate, geometrically centred.', ar: 'الخيار أ، المرشح الأساسي، متمركز هندسياً.' }, ratio: 2032 / 892 },
];

/* ---------------- usage (Figma step 22) ---------------- */

export const USAGE_TOPICS: { id: string; label: L; count: number; slices?: number[] }[] = [
  { id: 'logo', label: { en: 'Logo', ar: 'الشعار' }, count: 12 },
  { id: 'colour', label: { en: 'Colour', ar: 'اللون' }, count: 4 },
  { id: 'typography', label: { en: 'Typography', ar: 'الخطوط' }, count: 3 },
  { id: 'photography', label: { en: 'Photography', ar: 'التصوير' }, count: 8 },
  { id: 'spacing', label: { en: 'Spacing', ar: 'المسافات' }, count: 4 },
  { id: 'illustration', label: { en: 'Illustration', ar: 'الرسوم' }, count: 3 },
  { id: 'ui', label: { en: 'Product UI', ar: 'واجهة المنتج' }, count: 4 },
  { id: 'dark', label: { en: 'Dark mode', ar: 'الوضع الداكن' }, count: 4 },
];

/* ---------------- motion (Figma step 17) ---------------- */

export const MOTION_TOKENS = [
  { id: 'fast', ms: 120, curve: 'cubic-bezier(0.2, 0, 0, 1)', use: { en: 'Immediate touch response', ar: 'استجابة فورية للمس' } },
  { id: 'standard', ms: 220, curve: 'cubic-bezier(0.2, 0, 0, 1)', use: { en: 'Arrivals and general changes', ar: 'الظهور والتغييرات العامة' } },
  { id: 'emphasis', ms: 360, curve: 'cubic-bezier(0.2, 0, 0, 1)', use: { en: 'Important confirmations', ar: 'التأكيدات المهمة' } },
] as const;

export const EASINGS = [
  { id: 'standard', curve: 'cubic-bezier(0.2, 0, 0, 1)', use: { en: 'General changes', ar: 'التغييرات العامة' } },
  { id: 'enter', curve: 'cubic-bezier(0, 0, 0.58, 1)', use: { en: 'Arrivals', ar: 'الظهور' } },
  { id: 'exit', curve: 'cubic-bezier(0.42, 0, 1, 1)', use: { en: 'Departures', ar: 'الإخفاء' } },
  { id: 'emphasis', curve: 'cubic-bezier(0.42, 0, 0.58, 1)', use: { en: 'Important transitions', ar: 'الانتقالات المهمة' } },
] as const;

/* ---------------- spacing / radius / elevation (steps 14, 15, 16) ---------------- */

export const SPACING_TOKENS = [
  { n: 1, px: 4, use: { en: 'Micro separation', ar: 'فصل دقيق' } },
  { n: 2, px: 8, use: { en: 'Icon + label', ar: 'أيقونة + عنوان' } },
  { n: 3, px: 12, use: { en: 'Label + field', ar: 'عنوان + حقل' } },
  { n: 4, px: 16, use: { en: 'Control inset', ar: 'حشوة العنصر' } },
  { n: 5, px: 20, use: { en: 'Metadata + actions', ar: 'بيانات + إجراءات' } },
  { n: 6, px: 24, use: { en: 'Card inset', ar: 'حشوة البطاقة' } },
  { n: 7, px: 32, use: { en: 'Form / group break', ar: 'فاصل المجموعات' } },
  { n: 8, px: 40, use: { en: 'Section decision', ar: 'قرار القسم' } },
  { n: 9, px: 48, use: { en: 'Hierarchy break', ar: 'فاصل التسلسل' } },
  { n: 10, px: 64, use: { en: 'Hero separation', ar: 'فصل الواجهة' } },
  { n: 11, px: 80, use: { en: 'Major separation', ar: 'فصل رئيسي' } },
];

export const RADIUS_TOKENS = [
  { id: 'none', px: 0, use: { en: 'Architecture, images', ar: 'العمارة والصور' } },
  { id: 'sm', px: 4, use: { en: 'Fine details', ar: 'تفاصيل دقيقة' } },
  { id: 'md', px: 8, use: { en: 'Inputs, chips', ar: 'الحقول والشرائح' } },
  { id: 'lg', px: 12, use: { en: 'Buttons', ar: 'الأزرار' } },
  { id: 'xl', px: 16, use: { en: 'Cards', ar: 'البطاقات' } },
  { id: 'xxl', px: 20, use: { en: 'Containers', ar: 'الحاويات' } },
  { id: 'hero', px: 24, use: { en: 'Sheets, hero surfaces', ar: 'الأوراق والأسطح الكبرى' } },
];

export const ELEVATION_TOKENS = [
  { id: 'none', y: 0, blur: 0, opacity: 0, use: { en: 'Flat page content, borders and tonal separation', ar: 'محتوى مسطح، حدود وتباين لوني' } },
  { id: '1', y: 2, blur: 8, opacity: 6, use: { en: 'Standard elevated property surface', ar: 'سطح عقار مرتفع قياسي' } },
  { id: '2', y: 6, blur: 20, opacity: 9, use: { en: 'Floating search and contextual controls', ar: 'بحث وعناصر تحكم عائمة' } },
  { id: '3', y: 12, blur: 32, opacity: 12, use: { en: 'Temporary modal and bottom sheet', ar: 'نافذة مؤقتة وورقة سفلية' } },
];

/* ---------------- verification states (FigJam 03 IA) ---------------- */

export const VERIFICATION_STATES = [
  { id: 'draft', tone: 'disabled', label: { en: 'Draft', ar: 'مسودة' }, note: { en: 'Not yet submitted.', ar: 'لم يتم الإرسال بعد.' } },
  { id: 'pending', tone: 'warning', label: { en: 'Pending verification', ar: 'قيد التوثيق' }, note: { en: 'Submitted, awaiting review.', ar: 'تم الإرسال وبانتظار المراجعة.' } },
  { id: 'approved', tone: 'success', label: { en: 'Approved', ar: 'معتمد' }, note: { en: 'Active role access granted.', ar: 'تم منح صلاحية الدور.' } },
  { id: 'resubmission', tone: 'warning', label: { en: 'Resubmission required', ar: 'مطلوب إعادة الإرسال' }, note: { en: 'Evidence needs correction.', ar: 'الإثباتات تحتاج إلى تصحيح.' } },
  { id: 'rejected', tone: 'error', label: { en: 'Rejected', ar: 'مرفوض' }, note: { en: 'Reapply after 30 days.', ar: 'يمكن إعادة التقديم بعد 30 يوماً.' } },
  { id: 'suspended', tone: 'error', label: { en: 'Suspended', ar: 'موقوف' }, note: { en: 'Access restricted, support path available.', ar: 'الوصول مقيّد ومسار الدعم متاح.' } },
] as const;

/* ---------------- journeys (FigJam 04) ---------------- */

export const JOURNEY: L[] = [
  { en: 'Discover', ar: 'اكتشف' },
  { en: 'Evaluate', ar: 'قيّم' },
  { en: 'Trust', ar: 'ثق' },
  { en: 'Engage', ar: 'تواصل' },
  { en: 'Act', ar: 'تصرّف' },
  { en: 'Return', ar: 'عُد' },
];

export const VIEWING_FLOW: L[] = [
  { en: 'Property', ar: 'العقار' },
  { en: 'Availability', ar: 'التوفر' },
  { en: 'Slot', ar: 'الموعد' },
  { en: 'Request', ar: 'الطلب' },
  { en: 'Confirmation', ar: 'التأكيد' },
  { en: 'Completion', ar: 'الإتمام' },
];

export const MAINTENANCE_FLOW: L[] = [
  { en: 'Category', ar: 'الفئة' },
  { en: 'Provider', ar: 'المزوّد' },
  { en: 'Booking', ar: 'الحجز' },
  { en: 'Confirmation', ar: 'التأكيد' },
  { en: 'Completion', ar: 'الإتمام' },
  { en: 'Review', ar: 'التقييم' },
];
