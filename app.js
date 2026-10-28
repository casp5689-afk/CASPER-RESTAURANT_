/**
 * مطعم كاسبر للماكولات السورية - Casper Syrian Restaurant
 * Full Application Logic: Menu Data, Cart Management, Order Flow & WhatsApp Integration
 */

// -------------------------------------------------------------
// 1. Menu Categories & Items Database
// -------------------------------------------------------------
const CATEGORIES = [
    { id: 'all', name: 'الكل', icon: 'fa-utensils' },
    { id: 'shawarma', name: 'شاورما سوري', icon: 'fa-fire-burner' },
    { id: 'arabic-meals', name: 'وجبات العربي', icon: 'fa-bowl-food' },
    { id: 'crepes-chicken', name: 'كريبات الفراخ', icon: 'fa-drumstick-bite' },
    { id: 'crepes-meat', name: 'كريبات اللحوم', icon: 'fa-bacon' },
    { id: 'crepes-potatoes', name: 'كريبات البطاطس', icon: 'fa-layer-group' },
    { id: 'sandwiches', name: 'ساندوتشات الغربي', icon: 'fa-burger' },
    { id: 'combo-meals', name: 'وجبات الكومبو', icon: 'fa-wine-bottle' },
    { id: 'western-meals', name: 'وجبات الغربي', icon: 'fa-plate-wheat' },
    { id: 'budget-meals', name: 'وجبات اقتصادية', icon: 'fa-wallet' },
    { id: 'hawawshi', name: 'ركن الحواوشي', icon: 'fa-bread-slice' },
    { id: 'fino-kaiser', name: 'الفينو والكيزر', icon: 'fa-hotdog' },
    { id: 'syrian-potatoes', name: 'البطاطس السوري', icon: 'fa-cubes-stacked' },
    { id: 'sauces-sides', name: 'إضافات وصوصات', icon: 'fa-mortar-pestle' }
];

const MENU_ITEMS = [
    // --- 11: شاورما سوري ---
    {
        id: 'sh-small',
        name: 'شاورما فراخ صغير',
        category: 'shawarma',
        categoryName: 'شاورما سوري',
        price: 40,
        desc: 'شاورما فراخ سوري متبلة بالخلطة الشامية الأصلية مع تومية ومخلل بخبز الصاج السوري.',
        popular: false
    },
    {
        id: 'sh-med',
        name: 'شاورما فراخ وسط',
        category: 'shawarma',
        categoryName: 'شاورما سوري',
        price: 50,
        desc: 'حجم وسط مشبع بقطع الدجاج المتبلة الرائعة، مع صوص التومية الغني والخيار المخلل.',
        popular: true
    },
    {
        id: 'sh-large',
        name: 'شاورما فراخ كبير',
        category: 'shawarma',
        categoryName: 'شاورما سوري',
        price: 60,
        desc: 'ساندوتش كبير مليان دجاج شاورما شامي مقرمش على الجريل مع تومية ومخلل وصاج سخن.',
        popular: true
    },
    {
        id: 'sh-extra',
        name: 'شاورما فراخ إكسترا',
        category: 'shawarma',
        categoryName: 'شاورما سوري',
        price: 70,
        desc: 'شاورما دجاج مميزة مع إضافات فاخرة: مشروم فريش + جبنة سايحة + موتزاريلا غنية.',
        popular: true
    },

    // --- 14: وجبات العربي ---
    {
        id: 'ar-normal',
        name: 'وجبة شاورما عربي عادي',
        category: 'arabic-meals',
        categoryName: 'وجبات العربي',
        price: 80,
        desc: '1 ساندوتش شاورما كبير مقطع عربي + طبق مخلل سوري + تومية كاسبر المميزة + بطاطس مقلية مقرمشة.',
        popular: true
    },
    {
        id: 'ar-double',
        name: 'وجبة شاورما فراخ دبل',
        category: 'arabic-meals',
        categoryName: 'وجبات العربي',
        price: 110,
        desc: '2 ساندوتش شاورما فراخ مقطع عربي + باكت بطاطس فارم فريتس + تومية كاسبر + مخلل سوري شهي.',
        popular: true
    },

    // --- 02: كريبات الفراخ ---
    {
        id: 'cr-ch-sh',
        name: 'كريب شاورما فراخ',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 60,
        desc: 'كريب مقرمش محشو شاورما دجاج شامي وموتزاريلا وخضار وصوصات كاسبر السرية.',
        popular: false
    },
    {
        id: 'cr-ch-str',
        name: 'كريب استربس',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 60,
        desc: 'أصابع دجاج استربس ذهبية كريسبي مع جبنة موتزاريلا ذائبة وخضروات طازجة.',
        popular: true
    },
    {
        id: 'cr-ch-zng',
        name: 'كريب زنجر حار',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 60,
        desc: 'لعشاق السبايسي! قطع زنجر دجاج حار ومقرمش مع جبنة موتزاريلا وصوص الشطة اللذيذ.',
        popular: true
    },
    {
        id: 'cr-ch-shish',
        name: 'كريب شيش طاووق',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 65,
        desc: 'قطع شيش طاووق مشوية على الفحم ومتبلة، مع موتزاريلا وفلفل وزيتون وصوصات خاصة.',
        popular: false
    },
    {
        id: 'cr-ch-pane',
        name: 'كريب بانية مقرمش',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 70,
        desc: 'صدور دجاج بانيه متبلة ومقلية كريسبي مع كمية سخية من الموتزاريلا والخضار.',
        popular: false
    },
    {
        id: 'cr-ch-crn',
        name: 'كريب فراخ كرانشي',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 75,
        desc: 'دجاج مقرمش الترا كرانشي فريش مع صوصات خاصة وجبنة سايحة داخل عجينة كريب طازجة.',
        popular: true
    },
    {
        id: 'cr-ch-mix',
        name: 'كريب مكس فراخ سوبر',
        category: 'crepes-chicken',
        categoryName: 'كريبات الفراخ',
        price: 90,
        desc: 'الوحش الكاسر! مزيج جبار من (شاورما فراخ + استربس كريسبي + فراخ كرانشي) وموتزاريلا مضاعفة.',
        popular: true
    },

    // --- 06: كريبات اللحوم ---
    {
        id: 'cr-mt-sg',
        name: 'كريب سجق بلدي',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 55,
        desc: 'سجق إسكندراني مبهر بالخلطة المصرية السورية مع جبنة موتزاريلا وفلفل وطماطم.',
        popular: false
    },
    {
        id: 'cr-mt-sous',
        name: 'كريب سوسيس',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 55,
        desc: 'قطع هوت دوج سوسيس مشوية مع موتزاريلا وصوصات كاسبر المتنوعة.',
        popular: false
    },
    {
        id: 'cr-mt-brg',
        name: 'كريب برجر لحمه',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 55,
        desc: 'شرائح برجر لحم متبلة على الجريل مع صوص البرجر الخاص والموتزاريلا.',
        popular: false
    },
    {
        id: 'cr-mt-mince',
        name: 'كريب لحمة مفروم',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 70,
        desc: 'لحم مفروم معصج بالبهارات الخاصة والموتزاريلا وصوص الطماطم والزيتون.',
        popular: false
    },
    {
        id: 'cr-mt-mix',
        name: 'كريب ميكس لحوم',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 90,
        desc: 'تشكيلة لحوم فاخرة (لحمة مفرومة + سجق مبهر + سوسيس) مع جبنة موتزاريلا وفيرة.',
        popular: true
    },
    {
        id: 'cr-mt-smoked',
        name: 'كريب ميكس مدخن',
        category: 'crepes-meat',
        categoryName: 'كريبات اللحوم',
        price: 100,
        desc: 'مزيج فاخر من اللحوم المدخنة والمشوية الفاخرة مع صوص الباربكيو وموتزاريلا غنية.',
        popular: true
    },

    // --- 08: كريبات البطاطس ---
    {
        id: 'cr-pt-moz',
        name: 'كريب بطاطس مودزريلا',
        category: 'crepes-potatoes',
        categoryName: 'كريبات البطاطس',
        price: 45,
        desc: 'بطاطس مقلية ذهبية مع جبنة موتزاريلا سايحة ومتبلة ببهارات كاسبر الخاصة.',
        popular: false
    },
    {
        id: 'cr-pt-ranch',
        name: 'كريب بطاطس رانش',
        category: 'crepes-potatoes',
        categoryName: 'كريبات البطاطس',
        price: 50,
        desc: 'بطاطس مقرمشة مع صوص الرانش الغني الكريمي وموتزاريلا وخضار.',
        popular: true
    },
    {
        id: 'cr-pt-bbq',
        name: 'كريب بطاطس باربكيو',
        category: 'crepes-potatoes',
        categoryName: 'كريبات البطاطس',
        price: 50,
        desc: 'بطاطس مقلية مع صوص الباربكيو المدخن اللذيذ وجبنة موتزاريلا.',
        popular: false
    },
    {
        id: 'cr-pt-bigt',
        name: 'كريب بطاطس بيج تساي',
        category: 'crepes-potatoes',
        categoryName: 'كريبات البطاطس',
        price: 50,
        desc: 'خلطة بيج تساي الشهيرة مع البطاطس المقلية والجبنة الذائبة.',
        popular: false
    },

    // --- 01: ساندوتشات الغربي ---
    {
        id: 'sd-zng',
        name: 'ساندوتش زنجر كريسبي',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 60,
        desc: 'صدر دجاج مقرمش سبايسي مع خس ومايونيز وصوص حار وجبن شيدر في عيش طازج.',
        popular: true
    },
    {
        id: 'sd-str',
        name: 'ساندوتش استربس',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 60,
        desc: 'قطع استربس دجاج ذهبية مقرمشة مع صوص المايونيز والخس الطازج.',
        popular: true
    },
    {
        id: 'sd-pan',
        name: 'ساندوتش بانيه',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 60,
        desc: 'دجاج بانيه متبل محمر ومقرمش مع خضار وصوصات كاسبر.',
        popular: false
    },
    {
        id: 'sd-shish',
        name: 'ساندوتش شيش طاووق',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 65,
        desc: 'شيش طاووق دجاج مشوي بتتبيلة الزبادي والليمون مع تومية وخيار مخلل.',
        popular: false
    },
    {
        id: 'sd-brg-ch',
        name: 'ساندوتش برجر فراخ',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 45,
        desc: 'قطعة برجر دجاج مقلية أو مشوية مع صوص البرجر وخس وطماطم.',
        popular: false
    },
    {
        id: 'sd-brg-mt',
        name: 'ساندوتش برجر لحمه',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 35,
        desc: 'برجر لحم بلدي مشوي مع شرائح خيار مخلل وصوص كاسبر الخاص.',
        popular: false
    },
    {
        id: 'sd-kb-isk',
        name: 'ساندوتش كبدة إسكندراني',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 35,
        desc: 'كبدة إسكندراني مفلفلة بالتوم والكمون والفلفل الحار والليمون.',
        popular: true
    },
    {
        id: 'sd-sg-isk',
        name: 'ساندوتش سجق إسكندراني',
        category: 'sandwiches',
        categoryName: 'ساندوتشات الغربي',
        price: 35,
        desc: 'سجق إسكندراني بلدي بالصلصة والفلفل الأخضر والبهارات الشهية.',
        popular: false
    },

    // --- 13: وجبات الكومبو (مع كانز كولا) ---
    {
        id: 'cb-hadi',
        name: 'وجبة الهادي (كومبو)',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 65,
        desc: '1 برجر سنجل + 1 باكيت بطاطس + 1 مخلل سوري + 1 كانز كولا ساقع.',
        popular: true
    },
    {
        id: 'cb-joker',
        name: 'وجبة الجوكر (كومبو)',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 65,
        desc: '1 ساندوتش بطاطس موتزريلا + 1 سوسيس + 1 علبة تومية + 1 بطاطس + 1 كانز كولا.',
        popular: true
    },
    {
        id: 'cb-harefa',
        name: 'وجبة الحريفة (كومبو)',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 65,
        desc: '1 رغيف حواوشي + 1 كفتة + 1 سجق + 1 بطاطس + 1 كانز كولا.',
        popular: true
    },
    {
        id: 'cb-akeela',
        name: 'وجبة الأكيلة (كومبو)',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 85,
        desc: '1 كريب بطاطس مشبع + 1 ساندوتش سجق + 1 بطاطس + 1 كانز كولا.',
        popular: false
    },
    {
        id: 'cb-rayeq',
        name: 'وجبة الرايق (كومبو)',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 110,
        desc: '1 ساندوتش شاورما فراخ + 1 برجر لحمة + 1 بطاطس + 1 كانز كولا.',
        popular: true
    },
    {
        id: 'cb-casper',
        name: 'وجبة كاسبر الملوكية',
        category: 'combo-meals',
        categoryName: 'وجبات الكومبو',
        price: 120,
        desc: '1 شاورما + كبدة + بطاطس موتزريلا صغير + بطاطس + كانز كولا (عيش سوري + مخلل + تومية).',
        popular: true
    },

    // --- 03: وجبات الغربي ---
    {
        id: 'ws-crispy',
        name: 'وجبة كريسبي غربي',
        category: 'western-meals',
        categoryName: 'وجبات الغربي',
        price: 85,
        desc: 'قطع دجاج كريسبي مقرمشة متبلة + مخلل سوري + تومية كاسبر + بطاطس فريش + عيش طازج.',
        popular: true
    },
    {
        id: 'ws-znger',
        name: 'وجبة زنجر حار',
        category: 'western-meals',
        categoryName: 'وجبات الغربي',
        price: 85,
        desc: 'قطع زنجر حارة كرانشي + تومية سبايسي + مخلل + باكت بطاطس + عيش طازج.',
        popular: false
    },
    {
        id: 'ws-shish',
        name: 'وجبة شيش طاووق',
        category: 'western-meals',
        categoryName: 'وجبات الغربي',
        price: 90,
        desc: 'أسياخ شيش طاووق مشوي على الجريل + تومية شامي + مخلل سوري + بطاطس + عيش.',
        popular: false
    },

    // --- 09: وجبات اقتصادية ---
    {
        id: 'bg-pane2',
        name: 'وجبة 2 قطعة بانية',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 65,
        desc: '2 قطعة بانيه كريسبي + بطاطس + تومية وعيش ومخلل.',
        popular: false
    },
    {
        id: 'bg-strip2',
        name: 'وجبة 2 قطعة استربس',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 65,
        desc: '2 قطعة استربس فراخ كبيرة مقرمشة + بطاطس وتومية وعيش.',
        popular: false
    },
    {
        id: 'bg-brg2',
        name: 'وجبة 2 قطعة برجر',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 55,
        desc: '2 قطعة برجر مع صوصات خاصة وبطاطس.',
        popular: false
    },
    {
        id: 'bg-crispy4',
        name: 'وجبة كريسبي 4 قطع',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 120,
        desc: '4 قطع دجاج كريسبي عملاقة + بطاطس فارم فريتس + تومية + مخلل + عيش.',
        popular: true
    },
    {
        id: 'bg-kbeda',
        name: 'وجبة كبده إسكندراني',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 80,
        desc: 'طبق كبدة إسكندراني كبير بالبهارات والفلفل + بطاطس + مخلل + عيش طازج.',
        popular: false
    },
    {
        id: 'bg-sogoq',
        name: 'وجبة سجق إسكندراني',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 80,
        desc: 'طبق سجق إسكندراني مبهر بالصلصة + بطاطس + مخلل + عيش.',
        popular: false
    },
    {
        id: 'bg-shish-meal',
        name: 'وجبة شيش طاووق اقتصادية',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 90,
        desc: 'قطع شيش طاووق مشوي متبل على الطريقة السورية + أرز أو عيش وبطاطس.',
        popular: false
    },
    {
        id: 'bg-strip7',
        name: 'وجبة استربس 7 قطع',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 180,
        desc: '7 قطع استربس كريسبي عائلية + علب تومية + باكت بطاطس كبير + مخلل + عيش.',
        popular: true
    },
    {
        id: 'bg-znger10',
        name: 'وجبة زنجر عائلي 10 قطع',
        category: 'budget-meals',
        categoryName: 'وجبات اقتصادية',
        price: 250,
        desc: 'وجبة لمتنا العائلية! 10 قطع زنجر حار وكريسبي + بطاطس عائلي + 3 تومية + مخلل + لتر كولا.',
        popular: true
    },

    // --- 10: ركن الحواوشي ---
    {
        id: 'hw-plain',
        name: 'حواوشي سادة بلدي',
        category: 'hawawshi',
        categoryName: 'ركن الحواوشي',
        price: 20,
        desc: 'رغيف حواوشي لحم بلدي متبل بالبصل والفلفل ومحمص مقرمش على الجريل.',
        popular: false
    },
    {
        id: 'hw-moz',
        name: 'حواوشي مودزاريلا',
        category: 'hawawshi',
        categoryName: 'ركن الحواوشي',
        price: 30,
        desc: 'حواوشي لحمة بلدي غني بطبقة جبنة موتزاريلا سايحة ومطاطية.',
        popular: true
    },
    {
        id: 'hw-roumi',
        name: 'حواوشي جبنة رومي',
        category: 'hawawshi',
        categoryName: 'ركن الحواوشي',
        price: 30,
        desc: 'حواوشي لحم بلدي مع جبنة رومي قديمة تمنحه طعماً مالحاً ومميزاً.',
        popular: false
    },
    {
        id: 'hw-basterma',
        name: 'حواوشي بسطرمة',
        category: 'hawawshi',
        categoryName: 'ركن الحواوشي',
        price: 40,
        desc: 'مزيج فاخر من البسطرمة مع اللحم المتبل والجبنة الموتزاريلا.',
        popular: true
    },
    {
        id: 'hw-casper',
        name: 'حواوشي كاسبر الخاص',
        category: 'hawawshi',
        categoryName: 'ركن الحواوشي',
        price: 50,
        desc: 'اختراع كاسبر! حواوشي لحم + بسطرمة + مكس أجبان موتزاريلا ورومي وزيتون.',
        popular: true
    },

    // --- 05: الفينو والكيزر ---
    {
        id: 'fk-sg',
        name: 'سجق إسكندراني (فينو)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 15,
        desc: 'ساندوتش فينو محشو سجق إسكندراني متبل بالصوص والفلفل.',
        popular: false
    },
    {
        id: 'fk-kb',
        name: 'كبدة إسكندراني (فينو)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 15,
        desc: 'ساندوتش فينو محشو كبدة إسكندراني مشوحة بالتوم والفلفل الأخضر.',
        popular: false
    },
    {
        id: 'fk-brg-ch',
        name: 'برجر فراخ (كيزر)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 30,
        desc: 'برجر دجاج في خبز كيزر طازج مع مايونيز وخس.',
        popular: false
    },
    {
        id: 'fk-brg-mt',
        name: 'برجر لحمة (كيزر)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 25,
        desc: 'برجر لحم في خبز كيزر مع صوص الكاتشب والمايونيز.',
        popular: false
    },
    {
        id: 'fk-brg-chz',
        name: 'برجر جبنة (كيزر)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 30,
        desc: 'برجر لحم مع شريحة جبنة شيدر سايحة في خبز كيزر.',
        popular: false
    },
    {
        id: 'fk-brg-egg',
        name: 'برجر بيض (كيزر)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 30,
        desc: 'برجر لحم مضاف إليه قرص بيض مقلي في خبز كيزر.',
        popular: false
    },
    {
        id: 'fk-brg-eg-chz',
        name: 'برجر بيض وجبنة (كيزر)',
        category: 'fino-kaiser',
        categoryName: 'الفينو والكيزر',
        price: 35,
        desc: 'برجر لحم مع بيض مقلي وشريحة جبنة في خبز كيزر شهي.',
        popular: false
    },

    // --- 12: البطاطس السوري ---
    {
        id: 'pt-small',
        name: 'بطاطس سوري صغير',
        category: 'syrian-potatoes',
        categoryName: 'البطاطس السوري',
        price: 15,
        desc: 'ساندوتش بطاطس سوري بالثومية والمخلل في خبز الصاج.',
        popular: false
    },
    {
        id: 'pt-moz-med',
        name: 'بطاطس مودزريلا وسط',
        category: 'syrian-potatoes',
        categoryName: 'البطاطس السوري',
        price: 20,
        desc: 'ساندوتش بطاطس سوري وسط مع جبنة موتزاريلا وتومية.',
        popular: false
    },
    {
        id: 'pt-moz-lg',
        name: 'بطاطس مودزريلا كبير',
        category: 'syrian-potatoes',
        categoryName: 'البطاطس السوري',
        price: 25,
        desc: 'ساندوتش صاج كبير مليان بطاطس مقلية وموتزاريلا سايحة ومخلل.',
        popular: true
    },
    {
        id: 'pt-cheddar',
        name: 'بطاطس صوص شيدر',
        category: 'syrian-potatoes',
        categoryName: 'البطاطس السوري',
        price: 25,
        desc: 'بطاطس مقلية مغطاة بصوص جبنة الشيدر الذهبي اللذيذ.',
        popular: false
    },

    // --- 07: إضافات وصوصات ---
    {
        id: 'sc-toum',
        name: 'تومية سوري أصلية',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 15,
        desc: 'علبة تومية شامية بيضاء ناعمة وكريمية خالية من البيض.',
        popular: true
    },
    {
        id: 'sc-fries',
        name: 'باكت بطاطس فارم فريتس',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 20,
        desc: 'باكت أصابع بطاطس مقرمشة ومتبلة ببهارات كاسبر الخاصة.',
        popular: true
    },
    {
        id: 'sc-pickles',
        name: 'مخلل سوري مشكل',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 25,
        desc: 'علبة مخلل خيار ولفت وجزر على الطريقة السورية المقرمشة.',
        popular: false
    },
    {
        id: 'sc-coleslaw',
        name: 'سلطة كلوسلو',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 25,
        desc: 'سلطة كرنب وجزر طازج بصوص المايونيز والعسل اللذيذ.',
        popular: false
    },
    {
        id: 'sc-ranch',
        name: 'صوص رانش إضافي',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 15,
        desc: 'كوب صوص رانش بالأعشاب الطبيعية.',
        popular: false
    },
    {
        id: 'sc-bbq',
        name: 'صوص باربكيو مدخن',
        category: 'sauces-sides',
        categoryName: 'إضافات وصوصات',
        price: 15,
        desc: 'كوب صوص باربكيو مدخن فاخر.',
        popular: false
    }
];

// Restaurant Contact Information
const RESTAURANT_INFO = {
    name: 'مطعم كاسبر للماكولات السورية',
    whatsappNumber: '201001254381', // Clean international format for WhatsApp
    displayPhone: '01001254381',
    secondaryPhone: '01003340451',
    address: 'مصنع سيد - شارع السبيل (بجوار سوبر ماركت القدس)'
};

// -------------------------------------------------------------
// 2. Application State & Storage
// -------------------------------------------------------------
const state = {
    activeCategory: 'all',
    searchQuery: '',
    cart: []
};

// LocalStorage Cart Key
const CART_STORAGE_KEY = 'casper_restaurant_cart_v1';

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
            state.cart = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading cart:', e);
        state.cart = [];
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

// -------------------------------------------------------------
// 3. DOM Elements
// -------------------------------------------------------------
const elements = {
    categoriesNav: document.getElementById('categoriesNav'),
    menuGrid: document.getElementById('menuGrid'),
    activeCategoryName: document.getElementById('activeCategoryName'),
    itemsCountText: document.getElementById('itemsCountText'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    emptyState: document.getElementById('emptyState'),
    resetSearchBtn: document.getElementById('resetSearchBtn'),

    // Cart Drawer
    cartOverlay: document.getElementById('cartOverlay'),
    cartDrawer: document.getElementById('cartDrawer'),
    openCartBtn: document.getElementById('openCartBtn'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartBody: document.getElementById('cartBody'),
    drawerItemCount: document.getElementById('drawerItemCount'),
    summarySubtotal: document.getElementById('summarySubtotal'),
    summaryTotal: document.getElementById('summaryTotal'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    proceedToCheckoutBtn: document.getElementById('proceedToCheckoutBtn'),

    // Header & Mobile Badges
    cartCount: document.getElementById('cartCount'),
    cartTotalPreview: document.getElementById('cartTotalPreview'),
    mobileStickyBar: document.getElementById('mobileStickyBar'),
    mobileCartBtn: document.getElementById('mobileCartBtn'),
    mobileBadge: document.getElementById('mobileBadge'),
    mobileTotal: document.getElementById('mobileTotal'),
    footerOpenCart: document.getElementById('footerOpenCart'),

    // Checkout Modal
    checkoutModalOverlay: document.getElementById('checkoutModalOverlay'),
    closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
    checkoutForm: document.getElementById('checkoutForm'),
    customerName: document.getElementById('customerName'),
    customerPhone: document.getElementById('customerPhone'),
    customerAddress: document.getElementById('customerAddress'),
    customerNotes: document.getElementById('customerNotes'),
    modalItemsCount: document.getElementById('modalItemsCount'),
    modalItemsList: document.getElementById('modalItemsList'),
    modalTotalPrice: document.getElementById('modalTotalPrice'),
    sendWhatsAppOrderBtn: document.getElementById('sendWhatsAppOrderBtn'),

    // Menu Image Modal
    openMenuModalBtn: document.getElementById('openMenuModalBtn'),
    menuModalOverlay: document.getElementById('menuModalOverlay'),
    closeMenuModalBtn: document.getElementById('closeMenuModalBtn'),
    startOrderingFromModal: document.getElementById('startOrderingFromModal'),

    // Toasts
    toastContainer: document.getElementById('toastContainer'),
    currentYear: document.getElementById('currentYear')
};

// -------------------------------------------------------------
// 4. Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }

    loadCartFromStorage();
    renderCategories();
    renderMenuItems();
    updateCartUI();
    setupEventListeners();
});

// -------------------------------------------------------------
// 5. Render Functions
// -------------------------------------------------------------

/**
 * Render Category Navigation Pills
 */
function renderCategories() {
    elements.categoriesNav.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `category-tab-btn ${cat.id === state.activeCategory ? 'active' : ''}`;
        btn.dataset.category = cat.id;
        btn.innerHTML = `<i class="fa-solid ${cat.icon}"></i> <span>${cat.name}</span>`;

        btn.addEventListener('click', () => {
            selectCategory(cat.id);
        });

        elements.categoriesNav.appendChild(btn);
    });
}

function selectCategory(catId) {
    state.activeCategory = catId;
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === catId);
    });

    const activeCatObj = CATEGORIES.find(c => c.id === catId);
    elements.activeCategoryName.textContent = activeCatObj ? activeCatObj.name : 'جميع الأصناف';

    renderMenuItems();
}

/**
 * Filter and Render Menu Items
 */
function renderMenuItems() {
    const query = state.searchQuery.trim().toLowerCase();

    const filtered = MENU_ITEMS.filter(item => {
        const matchesCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
        const matchesSearch = !query || 
            item.name.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.categoryName.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    elements.itemsCountText.textContent = `${filtered.length} صنف متوفر`;

    if (filtered.length === 0) {
        elements.menuGrid.innerHTML = '';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    elements.menuGrid.innerHTML = filtered.map(item => {
        const inCart = state.cart.find(c => c.id === item.id);
        const qtyInCart = inCart ? inCart.quantity : 0;

        return `
            <div class="food-card" data-id="${item.id}">
                <div>
                    <div class="card-top">
                        <span class="category-tag">${item.categoryName}</span>
                        ${item.popular ? '<span class="popular-badge"><i class="fa-solid fa-star"></i> الأكثر طلباً</span>' : ''}
                    </div>
                    <h3 class="food-title">${item.name}</h3>
                    <p class="food-desc">${item.desc}</p>
                </div>

                <div class="card-bottom">
                    <div class="price-wrap">
                        <span class="price-label">السعر</span>
                        <div class="price-value">
                            ${item.price} <span class="currency">جنيه</span>
                        </div>
                    </div>
                    <button type="button" class="add-to-cart-btn ${qtyInCart > 0 ? 'added' : ''}" onclick="addToCart('${item.id}')">
                        <i class="fa-solid ${qtyInCart > 0 ? 'fa-check' : 'fa-plus'}"></i>
                        <span>${qtyInCart > 0 ? `في السلة (${qtyInCart})` : 'أضف للسلة'}</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// -------------------------------------------------------------
// 6. Cart Management Functions
// -------------------------------------------------------------

function addToCart(itemId) {
    const product = MENU_ITEMS.find(item => item.id === itemId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            categoryName: product.categoryName,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    renderMenuItems(); // Update button label
    showToast(`تمت إضافة "${product.name}" إلى السلة`, 'success');
}

function updateCartItemQuantity(itemId, delta) {
    const item = state.cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        state.cart = state.cart.filter(c => c.id !== itemId);
    }

    saveCartToStorage();
    updateCartUI();
    renderMenuItems();
}

function removeCartItem(itemId) {
    const item = state.cart.find(c => c.id === itemId);
    const itemName = item ? item.name : 'الصنف';

    state.cart = state.cart.filter(c => c.id !== itemId);
    saveCartToStorage();
    updateCartUI();
    renderMenuItems();
    showToast(`تم حذف "${itemName}" من السلة`, 'info');
}

function clearCart() {
    if (state.cart.length === 0) return;
    if (confirm('هل أنت متأكد من رغبتك في تفريغ سلة المشتريات بالكامل؟')) {
        state.cart = [];
        saveCartToStorage();
        updateCartUI();
        renderMenuItems();
        showToast('تم إفراغ سلة الطلبات', 'info');
    }
}

function calculateCartTotals() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
}

function updateCartUI() {
    const { totalItems, totalPrice } = calculateCartTotals();

    // Update Header Badges
    elements.cartCount.textContent = totalItems;
    elements.cartTotalPreview.textContent = `${totalPrice} ج`;

    // Update Mobile Sticky Bar
    elements.mobileBadge.textContent = totalItems;
    elements.mobileTotal.textContent = `${totalPrice} جنيه`;
    if (totalItems > 0) {
        elements.mobileStickyBar.style.display = 'block';
    } else {
        elements.mobileStickyBar.style.display = 'none';
    }

    // Update Drawer Elements
    elements.drawerItemCount.textContent = `${totalItems} صنف`;
    elements.summarySubtotal.textContent = `${totalPrice} جنيه`;
    elements.summaryTotal.textContent = `${totalPrice} جنيه`;

    // Render Drawer Items
    if (state.cart.length === 0) {
        elements.cartBody.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-arrow-down"></i>
                <h4>سلة الطلبات فارغة</h4>
                <p>تصفح قائمة الطعام اللذيذة وأضف وجباتك وشاورمتك المفضلة!</p>
                <button type="button" class="btn btn-primary" onclick="closeCartDrawer(); scrollToMenu();">
                    <i class="fa-solid fa-utensils"></i> تصفح القائمة الآن
                </button>
            </div>
        `;
        elements.proceedToCheckoutBtn.disabled = true;
        elements.proceedToCheckoutBtn.style.opacity = '0.5';
    } else {
        elements.proceedToCheckoutBtn.disabled = false;
        elements.proceedToCheckoutBtn.style.opacity = '1';

        elements.cartBody.innerHTML = state.cart.map(item => `
            <div class="cart-item-card">
                <div class="cart-item-row-top">
                    <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-unit-price">${item.price} ج للواحد</div>
                    </div>
                    <button type="button" class="remove-item-btn" title="حذف الصنف" onclick="removeCartItem('${item.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="cart-item-row-bottom">
                    <div class="qty-control">
                        <button type="button" class="qty-btn" onclick="updateCartItemQuantity('${item.id}', 1)" title="زيادة">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button type="button" class="qty-btn" onclick="updateCartItemQuantity('${item.id}', -1)" title="نقصان">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        ${item.price * item.quantity} جنيه
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// -------------------------------------------------------------
// 7. Drawer & Modal Handling
// -------------------------------------------------------------

function openCartDrawer() {
    elements.cartOverlay.classList.add('open');
    elements.cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    elements.cartOverlay.classList.remove('open');
    elements.cartDrawer.classList.remove('open');
    document.body.style.overflow = '';
}

function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast('يرجى إضافة أصناف إلى السلة أولاً!', 'info');
        return;
    }

    closeCartDrawer();

    const { totalItems, totalPrice } = calculateCartTotals();
    elements.modalItemsCount.textContent = totalItems;
    elements.modalTotalPrice.textContent = `${totalPrice} جنيه`;

    elements.modalItemsList.innerHTML = state.cart.map(item => `
        <div class="summary-item-line">
            <span>${item.quantity} × ${item.name}</span>
            <span><strong>${item.price * item.quantity} ج</strong></span>
        </div>
    `).join('');

    elements.checkoutModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Autofocus name
    setTimeout(() => {
        elements.customerName.focus();
    }, 200);
}

function closeCheckoutModal() {
    elements.checkoutModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function openMenuModal() {
    elements.menuModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenuModal() {
    elements.menuModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function scrollToMenu() {
    const el = document.getElementById('menu-section');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// -------------------------------------------------------------
// 8. WhatsApp Direct Order Submission
// -------------------------------------------------------------

function handleCheckoutSubmit(e) {
    if (e) e.preventDefault();

    const name = elements.customerName.value.trim();
    const phone = elements.customerPhone.value.trim();
    const address = elements.customerAddress.value.trim();
    const notes = elements.customerNotes.value.trim();

    // Validation
    if (!name) {
        alert('يرجى كتابة اسم العميل الكريم');
        elements.customerName.focus();
        return;
    }

    if (!phone) {
        alert('يرجى كتابة رقم الهاتف للتواصل معك');
        elements.customerPhone.focus();
        return;
    }

    // Phone validation for Egyptian numbers
    const cleanPhone = phone.replace(/\s+/g, '');
    if (cleanPhone.length < 10) {
        alert('يرجى إدخال رقم هاتف صحيح');
        elements.customerPhone.focus();
        return;
    }

    if (!address) {
        alert('يرجى كتابة العنوان بالتفصيل لتوصيل الطلب بدقة');
        elements.customerAddress.focus();
        return;
    }

    if (state.cart.length === 0) {
        alert('سلة الطلبات فارغة!');
        return;
    }

    // Selected order type
    const orderTypeRadio = document.querySelector('input[name="orderType"]:checked');
    const orderType = orderTypeRadio ? orderTypeRadio.value : 'دليفري (توصيل للمنزل)';

    const { totalItems, totalPrice } = calculateCartTotals();

    // Format current date & time (Cairo time)
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const timeFormatted = now.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Format item lines
    const itemsTextLines = state.cart.map((item, idx) => {
        return `▫️ *${item.quantity} × ${item.name}* = ${item.price * item.quantity} ج`;
    }).join('\n');

    // Build the WhatsApp message template
    let message = `*السلام عليكم ورحمة الله وبركاته* 🍔
*طلب جديد من موقع مطعم كاسبر أونلاين* ✨
━━━━━━━━━━━━━━━━━━━━
👤 *اسم العميل:* ${name}
📞 *رقم الهاتف:* ${cleanPhone}
📍 *العنوان بالتفصيل:* ${address}
🛵 *طريقة الاستلام:* ${orderType}
${notes ? `📝 *ملاحظات إضافية:* ${notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
🛒 *تفاصيل الأوردر (${totalItems} صنف):*
${itemsTextLines}
━━━━━━━━━━━━━━━━━━━━
💰 *إجمالي الحساب المطلوب:* *${totalPrice} جنيه مصري*
_(خدمة التوصيل تحدد حسب المنطقة)_
⏰ *التوقيت:* ${dateFormatted} - ${timeFormatted}
📍 *فرع المطعم:* ${RESTAURANT_INFO.address}
━━━━━━━━━━━━━━━━━━━━
يرجى تأكيد استلام الأوردر وتجهيزه في أسرع وقت 🛵💨`;

    // Encode URL for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    showToast('جاري فتح الواتساب لإرسال أوردرك...', 'success');
    closeCheckoutModal();

    // Optional: Ask to clear cart
    setTimeout(() => {
        if (confirm('تم إرسال الطلب إلى الواتساب بنجاح! هل تريد تفريغ سلة المشتريات الآن؟')) {
            state.cart = [];
            saveCartToStorage();
            updateCartUI();
            renderMenuItems();
        }
    }, 1500);
}

// -------------------------------------------------------------
// 9. Toast Notification System
// -------------------------------------------------------------
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.35s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 350);
    }, 2800);
}

// -------------------------------------------------------------
// 10. Event Listeners Setup
// -------------------------------------------------------------
function setupEventListeners() {
    // Search input
    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        elements.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        renderMenuItems();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.clearSearchBtn.style.display = 'none';
        renderMenuItems();
        elements.searchInput.focus();
    });

    elements.resetSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        state.activeCategory = 'all';
        elements.clearSearchBtn.style.display = 'none';
        selectCategory('all');
    });

    // Drawer Open / Close
    elements.openCartBtn.addEventListener('click', openCartDrawer);
    elements.mobileCartBtn.addEventListener('click', openCartDrawer);
    if (elements.footerOpenCart) {
        elements.footerOpenCart.addEventListener('click', openCartDrawer);
    }
    elements.closeCartBtn.addEventListener('click', closeCartDrawer);
    elements.cartOverlay.addEventListener('click', closeCartDrawer);

    // Cart Actions
    elements.clearCartBtn.addEventListener('click', clearCart);
    elements.proceedToCheckoutBtn.addEventListener('click', openCheckoutModal);

    // Checkout Modal
    elements.closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    elements.checkoutModalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.checkoutModalOverlay) closeCheckoutModal();
    });

    // Order Type Radio Selection Styling
    const radioDelivery = document.getElementById('labelDelivery');
    const radioTakeaway = document.getElementById('labelTakeaway');
    if (radioDelivery && radioTakeaway) {
        radioDelivery.addEventListener('click', () => {
            radioDelivery.classList.add('selected');
            radioTakeaway.classList.remove('selected');
        });
        radioTakeaway.addEventListener('click', () => {
            radioTakeaway.classList.add('selected');
            radioDelivery.classList.remove('selected');
        });
    }

    // Submit Checkout
    elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    elements.sendWhatsAppOrderBtn.addEventListener('click', handleCheckoutSubmit);

    // Menu Image Modal
    if (elements.openMenuModalBtn) {
        elements.openMenuModalBtn.addEventListener('click', openMenuModal);
    }
    if (elements.closeMenuModalBtn) {
        elements.closeMenuModalBtn.addEventListener('click', closeMenuModal);
    }
    if (elements.menuModalOverlay) {
        elements.menuModalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.menuModalOverlay) closeMenuModal();
        });
    }
    if (elements.startOrderingFromModal) {
        elements.startOrderingFromModal.addEventListener('click', () => {
            closeMenuModal();
            scrollToMenu();
        });
    }

    // ESC key close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartDrawer();
            closeCheckoutModal();
            closeMenuModal();
        }
    });
}
