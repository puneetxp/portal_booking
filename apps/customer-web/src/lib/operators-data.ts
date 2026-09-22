export interface OperatorRoute {
  fromEn: string;
  toEn: string;
  fromAr: string;
  toAr: string;
  duration: string;
  price: number;
  departuresPerDay: number;
}

export interface OperatorReview {
  author: string;
  rating: number;
  date: string;
  commentEn: string;
  commentAr: string;
  route: string;
}

export interface Operator {
  slug: string;
  nameEn: string;
  nameAr: string;
  badgeEn?: string;
  badgeAr?: string;
  taglineEn: string;
  taglineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  rating: number;
  reviewCount: number;
  fleetSize: number;
  founded: number;
  tgaLicense: string;
  headquartersEn: string;
  headquartersAr: string;
  phone: string;
  email: string;
  busClasses: string[];
  amenities: Array<{
    id: string;
    nameEn: string;
    nameAr: string;
  }>;
  topRoutes: OperatorRoute[];
  safetyFeaturesEn: string[];
  safetyFeaturesAr: string[];
  reviews: OperatorReview[];
}

export const OPERATORS: Operator[] = [
  {
    slug: 'saptco',
    nameEn: 'SAPTCO',
    nameAr: 'سابتكو (الشركة السعودية للنقل الجماعي)',
    badgeEn: 'National Carrier',
    badgeAr: 'الناقل الوطني الرسمي',
    taglineEn: 'The National Public Transport Company of Saudi Arabia',
    taglineAr: 'الشركة الوطنية الرائدة للنقل العام في المملكة',
    descriptionEn:
      'SAPTCO is the premier intercity transport provider in Saudi Arabia, boasting the Kingdom’s largest network of luxury VIP coaches, standard intercity lines, and airport express services operating across 30+ major cities.',
    descriptionAr:
      'تعتبر سابتكو المزود الأكبر والأعرق للنقل بين المدن في المملكة العربية السعودية، حيث تمتلك أسطولاً عملاقاً من حافلات VIP الفاخرة وخطوط الربط السريع بين كافة مناطق المملكة والمطارات الرئيسية.',
    rating: 4.9,
    reviewCount: 14250,
    fleetSize: 1200,
    founded: 1979,
    tgaLicense: 'TGA-01-0001',
    headquartersEn: 'Riyadh, Saudi Arabia',
    headquartersAr: 'الرياض، المملكة العربية السعودية',
    phone: '920000877',
    email: 'info@saptco.com.sa',
    busClasses: ['VIP Express Luxury', 'Standard Intercity', 'Executive Shuttle'],
    amenities: [
      { id: 'wifi', nameEn: 'Free High-Speed Wi-Fi', nameAr: 'إنترنت واي فاي فائق السرعة مجاناً' },
      { id: 'power', nameEn: 'USB & AC Power Outlets', nameAr: 'منافذ شحن USB ومقابس كهربائية' },
      { id: 'wc', nameEn: 'Clean Onboard Restroom', nameAr: 'دورة مياه نظيفة ومجهزة' },
      { id: 'drinks', nameEn: 'Complimentary Drinks & Snacks', nameAr: 'مشروبات وضيافة خفيفة مجانية' },
      { id: 'seats', nameEn: 'Wide Reclining Leather Seats', nameAr: 'مقاعد جلدية رحبة قابلة للإمالة' },
      { id: 'ac', nameEn: 'Climate-Controlled Air Conditioning', nameAr: 'تكييف هوائي ذكي ومريح' },
    ],
    topRoutes: [
      { fromEn: 'Riyadh', toEn: 'Jeddah', fromAr: 'الرياض', toAr: 'جدة', duration: '10h 30m', price: 145, departuresPerDay: 12 },
      { fromEn: 'Makkah', toEn: 'Madinah', fromAr: 'مكة المكرمة', toAr: 'المدينة المنورة', duration: '5h 15m', price: 75, departuresPerDay: 24 },
      { fromEn: 'Riyadh', toEn: 'Dammam', fromAr: 'الرياض', toAr: 'الدمام', duration: '4h 45m', price: 85, departuresPerDay: 16 },
      { fromEn: 'Jeddah', toEn: 'Madinah', fromAr: 'جدة', toAr: 'المدينة المنورة', duration: '5h 00m', price: 70, departuresPerDay: 18 },
    ],
    safetyFeaturesEn: [
      'Dual certified drivers on trips exceeding 6 hours',
      'Real-time GPS telematics and speed monitoring',
      'Daily pre-trip mechanical inspection & sanitization',
      'Comprehensive passenger transit insurance',
    ],
    safetyFeaturesAr: [
      'سائقان معتمدان للرحلات التي تتجاوز 6 ساعات',
      'تتبع حي بالأقمار الصناعية ومراقبة السرعة على مدار الساعة',
      'فحص ميكانيكي وتعقيم شامل قبل كل رحلة',
      'تأمين تكافلي شامل على كافة الركاب',
    ],
    reviews: [
      {
        author: 'Abdullah Al-Ghamdi',
        rating: 5,
        date: '2026-08-15',
        commentEn: 'Outstanding VIP trip from Riyadh to Jeddah. The legroom and complimentary coffee were fantastic.',
        commentAr: 'رحلة VIP ممتازة من الرياض إلى جدة. المقاعد مريحة جداً والقهوة والضيافة رائعة.',
        route: 'Riyadh → Jeddah (VIP)',
      },
      {
        author: 'Fahad Al-Harbi',
        rating: 5,
        date: '2026-08-02',
        commentEn: 'Punctual departure from Makkah to Madinah. Clean bus, working Wi-Fi throughout.',
        commentAr: 'انطلاق دقيق في الموعد من مكة إلى المدينة. حافلة نظيفة وإنترنت سريع طوال الرحلة.',
        route: 'Makkah → Madinah',
      },
    ],
  },
  {
    slug: 'al-qaid',
    nameEn: 'Al-Qaid Transport',
    nameAr: 'شركة القائد للنقل البري',
    badgeEn: 'VIP Specialist',
    badgeAr: 'رواد النقل الفاخر',
    taglineEn: 'Luxury Long-Haul Travel with 2+1 Seating',
    taglineAr: 'تجربة السفر الفاخر مع مقاعد 2+1 الرحبة',
    descriptionEn:
      'Al-Qaid Transport specializes in executive and VIP sleeper coaches connecting central Saudi Arabia with Western and Southern regions with ultra-comfortable reclining seats.',
    descriptionAr:
      'تختص شركة القائد للنقل في تقديم رحلات رجال الأعمال والحافلات الفاخرة بنظام توزيع المقاعد 2+1 التي تربط وسط المملكة بالمنطقة الغربية والجنوبية بأعلى درجات الراحة.',
    rating: 4.8,
    reviewCount: 6890,
    fleetSize: 180,
    founded: 1998,
    tgaLicense: 'TGA-01-0145',
    headquartersEn: 'Jeddah, Saudi Arabia',
    headquartersAr: 'جدة، المملكة العربية السعودية',
    phone: '920022314',
    email: 'support@alqaid.com.sa',
    busClasses: ['2+1 Business VIP', 'Super Executive', 'Family Comfort'],
    amenities: [
      { id: 'wifi', nameEn: 'High-Speed Wi-Fi', nameAr: 'إنترنت واي فاي سريع' },
      { id: 'power', nameEn: 'Personal Screen & Charging', nameAr: 'شاشات ترفيه ومنافذ شحن' },
      { id: 'wc', nameEn: 'Executive Restroom', nameAr: 'دورة مياه خاصة' },
      { id: 'drinks', nameEn: 'Premium Arabian Hospitality', nameAr: 'ضيافة سعودية فاخرة' },
      { id: 'seats', nameEn: '150° Reclining Leather Seats', nameAr: 'مقاعد تميل حتى 150 درجة' },
    ],
    topRoutes: [
      { fromEn: 'Jeddah', toEn: 'Abha', fromAr: 'جدة', toAr: 'أبها', duration: '9h 15m', price: 160, departuresPerDay: 6 },
      { fromEn: 'Riyadh', toEn: 'Taif', fromAr: 'الرياض', toAr: 'الطائف', duration: '8h 00m', price: 135, departuresPerDay: 8 },
      { fromEn: 'Makkah', toEn: 'Riyadh', fromAr: 'مكة المكرمة', toAr: 'الرياض', duration: '10h 00m', price: 150, departuresPerDay: 10 },
    ],
    safetyFeaturesEn: [
      'Lane departure and collision warning sensors',
      'Continuous cabin air filtration system (HEPA)',
      'Luggage tagging with real-time barcode tracking',
    ],
    safetyFeaturesAr: [
      'أنظمة تحذير متطورة لمغادرة المسار وتفادي الاصطدام',
      'فلاتر هواء HEPA متقدمة داخل المقصورة',
      'ترميز أمتعة الركاب إلكترونياً لضمان عدم ضياعها',
    ],
    reviews: [
      {
        author: 'Sultan Al-Otaibi',
        rating: 5,
        date: '2026-07-28',
        commentEn: 'Best choice for traveling from Jeddah to Abha. Slept peacefully the entire ride.',
        commentAr: 'الخيار الأفضل للسفر من جدة إلى أبها. المقاعد مريحة جداً للنوم.',
        route: 'Jeddah → Abha (Business VIP)',
      },
    ],
  },
  {
    slug: 'north-star',
    nameEn: 'North Star Express',
    nameAr: 'نجم الشمال السريع',
    badgeEn: 'Northern Hub',
    badgeAr: 'شريان الشمال',
    taglineEn: 'Connecting the Northern Provinces to the Capital',
    taglineAr: 'نربط المحافظات الشمالية بالعاصمة الرياض',
    descriptionEn:
      'North Star Express is the leading carrier for northern Saudi Arabia, operating modern routes connecting Riyadh, Qassim, Hail, Al-Jouf, Tabuk, and Arar.',
    descriptionAr:
      'تعتبر شركة نجم الشمال الناقل الرائد لمناطق شمال المملكة، وتوفر رحلات حديثة ومنتظمة بين الرياض، القصيم، حائل، الجوف، تبوك وعرعر.',
    rating: 4.7,
    reviewCount: 4210,
    fleetSize: 140,
    founded: 2005,
    tgaLicense: 'TGA-01-0288',
    headquartersEn: 'Hail, Saudi Arabia',
    headquartersAr: 'حائل، المملكة العربية السعودية',
    phone: '920033871',
    email: 'contact@northstarexpress.sa',
    busClasses: ['Northern Sleeper', 'Executive Standard'],
    amenities: [
      { id: 'wifi', nameEn: 'Free Wi-Fi', nameAr: 'إنترنت مجاني' },
      { id: 'power', nameEn: 'USB Ports', nameAr: 'منافذ USB' },
      { id: 'ac', nameEn: 'Dual-Zone Climate Control', nameAr: 'تكييف هوائي مزدوج' },
      { id: 'wc', nameEn: 'Onboard Restroom', nameAr: 'دورة مياه داخلية' },
    ],
    topRoutes: [
      { fromEn: 'Riyadh', toEn: 'Hail', fromAr: 'الرياض', toAr: 'حائل', duration: '6h 30m', price: 95, departuresPerDay: 8 },
      { fromEn: 'Hail', toEn: 'Tabuk', fromAr: 'حائل', toAr: 'تبوك', duration: '7h 00m', price: 110, departuresPerDay: 5 },
      { fromEn: 'Riyadh', toEn: 'Al-Jouf', fromAr: 'الرياض', toAr: 'الجوف', duration: '9h 30m', price: 130, departuresPerDay: 4 },
    ],
    safetyFeaturesEn: [
      'Specially equipped coaches for desert and winter highway conditions',
      'Electronic tire pressure and thermal monitoring',
    ],
    safetyFeaturesAr: [
      'حافلات مجهزة خصيصاً للظروف المناخية في الطرق السريعة الصحراوية',
      'مراقبة إلكترونية مستمرة لضغط وحرارة الإطارات',
    ],
    reviews: [
      {
        author: 'Mishal Al-Shammari',
        rating: 5,
        date: '2026-08-10',
        commentEn: 'Always on time for Riyadh to Hail. Friendly drivers and smooth ride.',
        commentAr: 'دائماً في الموعد بين الرياض وحائل. تعامل راقي وسياقة هادئة.',
        route: 'Riyadh → Hail',
      },
    ],
  },
  {
    slug: 'city-liner',
    nameEn: 'City Liner KSA',
    nameAr: 'سيتي لاينر السعودية',
    badgeEn: 'Express Shuttles',
    badgeAr: 'الرحلات المكوكية السريعة',
    taglineEn: 'High-Frequency Express Shuttles',
    taglineAr: 'رحلات سريعة ومتقاربة المواعيد',
    descriptionEn:
      'City Liner operates frequent hourly express shuttles between major commercial and pilgrim corridors, notably Jeddah Airport to Makkah and Madinah.',
    descriptionAr:
      'تتميز سيتي لاينر بتسيير رحلات مكوكية على مدار الساعة بين المطارات والمشاعر المقدسة، وخاصة من مطار الملك عبدالعزيز بجدة إلى مكة والمدينة.',
    rating: 4.8,
    reviewCount: 9120,
    fleetSize: 220,
    founded: 2012,
    tgaLicense: 'TGA-01-0419',
    headquartersEn: 'Jeddah, Saudi Arabia',
    headquartersAr: 'جدة، المملكة العربية السعودية',
    phone: '920044912',
    email: 'info@cityliner.sa',
    busClasses: ['Airport Express', 'City Shuttle', 'VIP Pilgrim'],
    amenities: [
      { id: 'wifi', nameEn: 'Free 5G Wi-Fi', nameAr: 'إنترنت 5G مجاني' },
      { id: 'luggage', nameEn: 'Extra Large Luggage Bays', nameAr: 'مساحات أمتعة واسعة جداً' },
      { id: 'ac', nameEn: 'Turbo AC', nameAr: 'تكييف تيربو قوي' },
      { id: 'charging', nameEn: 'Fast Charging Ports', nameAr: 'شواحن سريعة لكل مقعد' },
    ],
    topRoutes: [
      { fromEn: 'Jeddah Airport', toEn: 'Makkah', fromAr: 'مطار جدة', toAr: 'مكة المكرمة', duration: '1h 15m', price: 40, departuresPerDay: 30 },
      { fromEn: 'Jeddah', toEn: 'Taif', fromAr: 'جدة', toAr: 'الطائف', duration: '2h 30m', price: 55, departuresPerDay: 14 },
      { fromEn: 'Makkah', toEn: 'Jeddah', fromAr: 'مكة المكرمة', toAr: 'جدة', duration: '1h 15m', price: 40, departuresPerDay: 30 },
    ],
    safetyFeaturesEn: ['Dedicated non-stop highway routes', 'Automated ticket QR boarding scanners'],
    safetyFeaturesAr: ['مسارات سريعة ومباشرة بدون توقف', 'بوابات صعود إلكترونية عبر مسح الباركود'],
    reviews: [
      {
        author: 'Tariq Mansoor',
        rating: 5,
        date: '2026-08-20',
        commentEn: 'Super fast shuttle directly from Jeddah airport to Makkah hotel terminal. Highly recommend.',
        commentAr: 'أسرع وسيلة انتقال من مطار جدة إلى مكة المكرمة مباشرة. تجربة ممتازة.',
        route: 'Jeddah Airport → Makkah',
      },
    ],
  },
  {
    slug: 'al-ahlia',
    nameEn: 'Al-Ahlia Transport',
    nameAr: 'الأهلية للنقل',
    badgeEn: 'Eastern Coast',
    badgeAr: 'المنطقة الشرقية والخليج',
    taglineEn: 'Connecting Eastern Province & Cross-Gulf Corridors',
    taglineAr: 'ربط مدن الشرقية ودول الخليج العربي',
    descriptionEn:
      'Al-Ahlia Transport connects Dammam, Khobar, Jubail, and Al-Ahsa with central and western regions, as well as cross-border GCC trips to Bahrain and UAE.',
    descriptionAr:
      'توفر الأهلية للنقل شبكة ربط شاملة بين الدمام، الخبر، الجبيل، والأحساء باتجاه الرياض والمناطق الغربية، إضافة إلى الرحلات الدولية لدول الخليج.',
    rating: 4.6,
    reviewCount: 3840,
    fleetSize: 110,
    founded: 2008,
    tgaLicense: 'TGA-01-0322',
    headquartersEn: 'Dammam, Saudi Arabia',
    headquartersAr: 'الدمام، المملكة العربية السعودية',
    phone: '920055182',
    email: 'support@al-ahlia.com.sa',
    busClasses: ['Gulf Executive', 'Intercity Standard'],
    amenities: [
      { id: 'wifi', nameEn: 'Free Wi-Fi', nameAr: 'إنترنت مجاني' },
      { id: 'power', nameEn: 'USB Outlets', nameAr: 'مقابس USB' },
      { id: 'wc', nameEn: 'Clean Restroom', nameAr: 'دورة مياه' },
      { id: 'seats', nameEn: 'Reclining Seats', nameAr: 'مقاعد مريحة' },
    ],
    topRoutes: [
      { fromEn: 'Dammam', toEn: 'Riyadh', fromAr: 'الدمام', toAr: 'الرياض', duration: '4h 30m', price: 80, departuresPerDay: 14 },
      { fromEn: 'Al-Ahsa', toEn: 'Riyadh', fromAr: 'الأحساء', toAr: 'الرياض', duration: '3h 45m', price: 65, departuresPerDay: 10 },
      { fromEn: 'Dammam', toEn: 'Jubail', fromAr: 'الدمام', toAr: 'الجبيل', duration: '1h 15m', price: 30, departuresPerDay: 16 },
    ],
    safetyFeaturesEn: ['Experienced cross-country certified drivers', 'GPS tracking & fleet telemetry'],
    safetyFeaturesAr: ['سائقون ذوو خبرة طويلة في الرحلات الطويلة', 'أنظمة تتبع وتحكم بالأسطول'],
    reviews: [
      {
        author: 'Khaled Al-Dossary',
        rating: 5,
        date: '2026-07-15',
        commentEn: 'Regular traveler between Dammam and Riyadh. Smooth, clean, and comfortable.',
        commentAr: 'أسافر معهم أسبوعياً بين الدمام والرياض. رحلات منتظمة ومريحة.',
        route: 'Dammam → Riyadh',
      },
    ],
  },
  {
    slug: 'al-farooq',
    nameEn: 'Al-Farooq Travels',
    nameAr: 'الفاروق لخدمات نقل المعتمرين',
    badgeEn: 'Hajj & Umrah',
    badgeAr: 'خدمات الحج والعمرة',
    taglineEn: 'Dedicated Luxury Pilgrimage Transport',
    taglineAr: 'النقل المتخصص لضيوف الرحمن بين الحرمين',
    descriptionEn:
      'Al-Farooq Travels provides premium specialized coaches for Umrah and Ziyarah, serving pilgrims with terminal pickup and direct transit to hotels near the Holy Mosques.',
    descriptionAr:
      'شركة الفاروق متخصصة في توفير أحدث الحافلات المجهزة لضيوف الرحمن والمعتمرين وزوار المسجد النبوي الشريف، مع التوصيل المباشر للفنادق المركزية.',
    rating: 4.9,
    reviewCount: 8430,
    fleetSize: 160,
    founded: 2015,
    tgaLicense: 'TGA-01-0571',
    headquartersEn: 'Makkah, Saudi Arabia',
    headquartersAr: 'مكة المكرمة، المملكة العربية السعودية',
    phone: '920066299',
    email: 'care@alfarooq.sa',
    busClasses: ['Haramain VIP Express', 'Pilgrim Comfort'],
    amenities: [
      { id: 'wifi', nameEn: 'Free High-Speed Wi-Fi', nameAr: 'واي فاي مجاني عالي السرعة' },
      { id: 'zamzam', nameEn: 'Zamzam Water & Refreshments', nameAr: 'مياه زمزم وضيافة معتمرين' },
      { id: 'luggage', nameEn: 'Special Luggage Handling', nameAr: 'عناية خاصة بأمتعة المعتمرين' },
      { id: 'guide', nameEn: 'Multilingual Attendants', nameAr: 'مرشدون بعدة لغات' },
      { id: 'wc', nameEn: 'Onboard Restroom', nameAr: 'دورة مياه' },
    ],
    topRoutes: [
      { fromEn: 'Makkah', toEn: 'Madinah', fromAr: 'مكة المكرمة', toAr: 'المدينة المنورة', duration: '5h 00m', price: 80, departuresPerDay: 20 },
      { fromEn: 'Jeddah', toEn: 'Makkah', fromAr: 'جدة', toAr: 'مكة المكرمة', duration: '1h 15m', price: 45, departuresPerDay: 25 },
      { fromEn: 'Madinah', toEn: 'Jeddah', fromAr: 'المدينة المنورة', toAr: 'جدة', duration: '5h 00m', price: 80, departuresPerDay: 18 },
    ],
    safetyFeaturesEn: ['Direct terminal pickup with verified ground marshals', 'Fully sanitized cabins before every pilgrimage group'],
    safetyFeaturesAr: ['استقبال مباشر من محطات ومطارات القدوم مع مشرفين ميدانيين', 'تعقيم كامل ودقيق للمقصورة قبل صعود الأفواج'],
    reviews: [
      {
        author: 'Muhammad Rizwan',
        rating: 5,
        date: '2026-08-18',
        commentEn: 'Beautiful Umrah trip experience from Makkah to Madinah. Cold Zamzam and great AC.',
        commentAr: 'تجربة عمرة رائعة من مكة إلى المدينة. ماء زمزم بارد وتكييف ممتاز وسائق محترم.',
        route: 'Makkah → Madinah',
      },
    ],
  },
];
