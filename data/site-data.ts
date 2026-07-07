export type Lang = "jp" | "en";

export type LocalizedText = {
  jp: string;
  en: string;
};

export type CompanySlug = "cosmo" | "create" | "holistic-cures";

export type Company = {
  slug: CompanySlug;
  name: string;
  label: LocalizedText;
  englishTag: string;
  accent: string;
  softAccent: string;
  tagline: LocalizedText;
  summary: LocalizedText;
  fit: LocalizedText;
  missionTitle: LocalizedText;
  missionBody: LocalizedText;
  workStyle: LocalizedText[];
  culture: LocalizedText[];
  image: string;
  portrait: string;
};

export type Job = {
  id: string;
  title: LocalizedText;
  company: CompanySlug;
  location: LocalizedText;
  type: LocalizedText;
  mission: LocalizedText;
  tasks: LocalizedText[];
  fit: LocalizedText;
};

export type Interview = {
  name: string;
  role: LocalizedText;
  year: LocalizedText;
  company: CompanySlug;
  quote: LocalizedText;
  image: string;
};

export const navItems = [
  { label: { jp: "会社を知る", en: "ABOUT" }, href: "#about" },
  { label: { jp: "コスモグループについて", en: "COSMO GROUP" }, href: "#company" },
  // { label: { jp: "仕事を知る", en: "WORK" }, href: "#work" },
  { label: { jp: "人を知る", en: "PEOPLE" }, href: "#people" },
  { label: { jp: "環境を知る", en: "CULTURE" }, href: "#culture" },
  { label: { jp: "数字で見る", en: "DATA" }, href: "#data" },
  { label: { jp: "採用情報", en: "RECRUIT" }, href: "#recruit" },
  { label: { jp: "FAQ", en: "FAQ" }, href: "#faq" }
];

export const uiText = {
  common: {
    entry: { jp: "エントリー", en: "Entry" },
    jobs: { jp: "募集職種を見る", en: "View Jobs" },
    faq: { jp: "FAQを見る", en: "View FAQ" },
    backToTop: { jp: "TOPへ戻る", en: "Back to Top" },
    detail: { jp: "詳しく見る", en: "Learn More" },
    viewCompanyPage: { jp: "会社ページを見る", en: "View Company Page" },
    all: { jp: "すべて", en: "All" },
    listPage: { jp: "一覧ページへ", en: "Go to Full List" },
    jobsList: { jp: "募集職種一覧", en: "Open Positions" },
    language: { jp: "言語", en: "Language" }
  },
  footer: {
    companies: { jp: "会社一覧", en: "Companies" },
    recruit: { jp: "採用情報", en: "Recruit" }
  },
  fit: {
    aria: { jp: "会社との相性", en: "Company fit" },
    bestFit: { jp: "BEST FIT", en: "BEST FIT" }
  },
  companyPage: {
    workStyle: { jp: "働き方", en: "Work Style" },
    culture: { jp: "カルチャー", en: "Culture" },
    peopleTitle: { jp: "その会社で働く人を知る", en: "Meet the People Behind the Work" },
    peopleBody: {
      jp: "現場の温度や判断基準が見えるように、仕事の手触りが伝わる言葉を集めました。",
      en: "We collected real voices so candidates can sense each team's pace, standards, and day-to-day work."
    },
    positionsTitle: { jp: "募集中のポジション", en: "Open Positions" },
    positionsBody: {
      jp: "仕事内容だけでなく、どんな価値観や志向性が活きるかまで見える一覧です。",
      en: "This list shows not only the work itself, but also the values and mindset that fit each role."
    }
  },
  jobsPage: {
    heroTitle: { jp: "募集職種一覧", en: "Open Positions" },
    heroBody: {
      jp: "会社ごとの違いが見える設計を保ちながら、応募導線につながる一覧ページとして整理しています。",
      en: "This page keeps company differences visible while working as a clear conversion path toward application."
    },
    introTitle: { jp: "会社と職種を横断して比較する", en: "Compare Roles Across the Group" },
    introBody: {
      jp: "将来的にCMSへ移行しやすいように、会社・役割・条件をデータ構造として分けた実装にしています。",
      en: "The content is structured by company, role, and condition so it can later connect cleanly to a CMS."
    }
  },
  notFound: {
    title: { jp: "ページが見つかりません", en: "Page not found" },
    body: { jp: "指定されたページは見つかりませんでした。", en: "The page you requested could not be found." }
  }
} as const;

export const homeText = {
  heroEyebrow: { jp: "COSMO GROUP RECRUITING SITE", en: "COSMO GROUP RECRUITING SITE" },
  heroTitle: { jp: "胸に秘めた美への好奇心", en: "The Curiosity for Beauty Hidden in Your Heart" },
  heroLead: {
    jp: "今こそ思い切って「仕事」にしませんか。\nコスモグループと共に、美容業界に革命を。",
    en: "Now is the time to boldly make it your work.\nTogether with Cosmo Group, bring a revolution to the beauty industry."
  },
  heroSecondary: { jp: "自分に合う会社を知る", en: "Find the Right Company for You" },
  heroCard: {
    jp: "3つの会社、3つの視点から美容文化を支える場所。",
    en: "Three companies, three distinct ways to support beauty culture."
  },
  aboutTitle: {
    jp: "美と健康の未来を創造する",
    en: "Create The Future of Beauty and Health"
  },
  aboutBody: {
    jp: "私共、コスモグループは、人類の永遠のテーマである美と健康、\nそして心の豊かさを追求するという企業理念のもと、\n創業以来およそ50年にわたって、理美容業界の活性化に努めてまいりました。\n\n世界のあらゆる情報をタイムリーに集約できるグループネットワークの強みを生かし、\n時代の一歩先を見つめる独自の視点、歩を緩めない技術開発など、\n持てる力のすべてをもってお客様のニーズにお応えすることが、私共の使命であります。",
    en: "We, Cosmo Group, have worked for approximately 50 years since our founding to invigorate the hair and beauty industry, guided by our corporate philosophy of pursuing beauty and health, timeless themes of humanity, as well as richness of the heart.\n\nBy leveraging the strength of our group network, which enables us to gather information from around the world in a timely way, and through our unique perspective that looks one step ahead of the times and our continuous technology development, our mission is to respond to customer needs with everything we have."
  },
  pillars: [
    {
      title: "Salon Support",
      body: {
        jp: "商品提案・経営支援・教育支援でサロン成長に伴走する。",
        en: "Support salon growth through product proposals, business support, and education."
      }
    },
    {
      title: "Product Development",
      body: {
        jp: "機能・品質・意匠を磨き、美容体験を支える。",
        en: "Refine function, quality, and design to elevate beauty experiences."
      }
    },
    {
      title: "People & Community",
      body: {
        jp: "人の成長と地域・業界とのつながりを大切にする。",
        en: "Value human growth and strong ties with the local and industry community."
      }
    }
  ],
  companyTitle: {
    jp: "コスモグループについて",
    en: "About Cosmo Group"
  },
  companyLead: {
    jp: "コスモグループは、美容と健康の未来を見据え、複数の専門領域が連携することで価値を生み出す企業グループです。",
    en: "Cosmo Group creates value through a coordinated network of specialized businesses, each looking toward the future of beauty and health."
  },
  companyBody: {
    jp: "美容・健康領域を支えるグループネットワーク",
    en: "A group network supporting the beauty and health fields."
  },
  fitTitle: {
    jp: "自分に合う会社を、感覚ではなく言葉で選ぶ。",
    en: "Choose your fit through clarity, not guesswork."
  },
  fitBody: {
    jp: "仕事内容、向いている人物像、働き方の違いを比較しながら、自分に近いフィールドを見つけられる導線にしました。",
    en: "Compare the nature of the work, ideal candidate profile, and working style to find the field closest to you."
  },
  workTitle: { jp: "役割から仕事を知る", en: "Understand the Work Through Roles" },
  workBody: {
    jp: "営業、開発、品質、コーポレート。それぞれの役割がどう美容業界の価値につながるかを、職種単位で伝えます。",
    en: "Sales, development, quality, and corporate roles each support the beauty industry in different ways. Here, that value becomes easier to understand."
  },
  peopleTitle: { jp: "人の言葉から、仕事の温度を知る。", en: "Hear the Temperature of the Work Through People’s Words." },
  peopleBody: {
    jp: "誌面のような見せ方で、会社ごとの判断軸や仕事の喜びが伝わるインタビューを配置しています。",
    en: "Editorial-style interviews reveal the criteria, pride, and everyday joy behind each company’s work."
  },
  cultureTitle: {
    jp: "働く環境の魅力を、抽象語で終わらせない。",
    en: "Make the culture feel concrete, not abstract."
  },
  cultureBody: {
    jp: "育成、連携、品質観、顧客視点。日々の行動にどう表れるかが想像できる文化設計です。",
    en: "Growth, collaboration, quality standards, and customer focus are presented in ways candidates can imagine in daily work."
  },
  cultureImage: {
    jp: "部署をまたいだ対話が生まれる、明るく落ち着いたワークプレイス。",
    en: "A bright, calm workplace designed to encourage dialogue across teams."
  },
  dataTitle: { jp: "数字で見る、組織の輪郭。", en: "Understand the Shape of the Organization Through Data." },
  dataBody: {
    jp: "信頼感を損なわない静かな演出で、候補者が判断しやすい基本情報を見せます。",
    en: "Key facts are presented with quiet confidence so candidates can judge the organization with ease."
  },
  storyTitle: {
    jp: "美容のプロフェッショナルをどう支えているか。",
    en: "How We Support Beauty Professionals."
  },
  storyBody: {
    jp: "事業理解を深めるために、価値提供の流れをひとつのストーリーとして整理しました。",
    en: "To make the business model easier to grasp, we organized the value chain into one clear story."
  },
  messageTitle: {
    jp: "違いがあるからこそ、活躍の仕方も広い。",
    en: "Because the roles differ, the ways to thrive are broad."
  },
  messageBody: {
    jp: "コスモグループでは、サロンに寄り添う人、製品を磨く人、品質を守る人が、それぞれの立場から美容の未来を支えています。どの会社でも大切にしているのは、目の前の相手に価値を返す誠実さです。",
    en: "Across Cosmo Group, some people stay close to salons, some sharpen products, and some protect quality. What unites them is the sincerity to return real value to the person in front of them."
  },
  recruitTitle: {
    jp: "次の挑戦先を、ここで見つける。",
    en: "Find your next challenge here."
  },
  recruitBody: {
    jp: "会社ごとの違いが分かったら、次は職種を見比べるステップへ。中途採用を中心に、ポジションを整理して掲載しています。",
    en: "Once the differences between companies are clear, the next step is comparing roles. Positions are organized around a primarily mid-career hiring model."
  },
  faqTitle: { jp: "応募前によくある質問", en: "Questions Candidates Often Ask" },
  faqBody: {
    jp: "会社の違い、必要経験、選考の流れなど、候補者が迷いやすいポイントを整理しています。",
    en: "We organize the questions candidates most often hesitate over, from company differences to experience requirements and selection flow."
  }
} as const;

export const groupNetwork = {
  center: {
    icon: "/assets/network-icon-holding.png",
    // icon: "/assets/cosmo-logo.png",
    name: { jp: "コスモホールディングス", en: "Cosmo Holdings" },
    body: { jp: "グループ統括", en: "Parent company / holding company" }
  },
  nodes: [
    {
      id: "cosmo",
      position: "top-left",
      icon: "/assets/network-icon-box.png",
      name: { jp: "株式会社コスモ", en: "Cosmo Co., Ltd." },
      body: { jp: "美容ディーラー事業", en: "Beauty product distribution business" }
    },
    {
      id: "holistic-cubes",
      position: "bottom-left",
      icon: "/assets/network-icon-device.png",
      name: { jp: "ポリスティックキューブス", en: "Polistic Cubes" },
      body: { jp: "美容機器ブランド事業", en: "Beauty device brand business" }
    },
    {
      id: "reiso",
      position: "top-right",
      icon: "/assets/network-icon-lab.png",
      name: { jp: "株式会社レイソ", en: "Reiso Co., Ltd." },
      body: { jp: "美容機器メーカー事業", en: "Beauty device manufacturing business" }
    },
    {
      id: "group-related",
      position: "middle-right",
      icon: "/assets/network-icon-people.png",
      name: { jp: "グループ会社", en: "Group Company" },
      body: { jp: "関連事業", en: "Related business" }
    },
    {
      id: "group-other",
      position: "bottom-center",
      icon: "/assets/network-icon-care.png",
      name: { jp: "グループ会社", en: "Group Company" },
      body: { jp: "関連事業", en: "Related business" }
    }
  ]
} as const;

export const companies: Company[] = [
  {
    slug: "cosmo",
    name: "COSMO",
    label: { jp: "株式会社コスモ", en: "Cosmo Co., Ltd." },
    englishTag: "Salon Partner",
    accent: "#d88870",
    softAccent: "rgba(216, 136, 112, 0.14)",
    tagline: {
      jp: "美容室のいちばん近くで、成長を支える。",
      en: "Stay closest to salons and support their growth."
    },
    summary: {
      jp: "美容室に最も近いパートナーとして、商品提案、経営支援、情報提供を通じてサロンの成長を支えます。",
      en: "As the partner closest to salons, Cosmo supports growth through product proposals, business support, and practical information."
    },
    fit: {
      jp: "人と話すことが好きで、現場の変化に触れながら信頼関係を築いていきたい人へ。",
      en: "For people who enjoy communication and want to build trust while staying close to the field."
    },
    missionTitle: {
      jp: "サロンの未来に、伴走する。",
      en: "Move alongside the future of salons."
    },
    missionBody: {
      jp: "営業や提案は単なる販売ではなく、サロン経営の課題に寄り添い、成長の道筋を一緒につくる仕事です。",
      en: "Sales and proposals here are not just about selling. They mean understanding salon challenges and helping shape a path to growth."
    },
    workStyle: [
      { jp: "美容室への訪問提案と継続フォロー", en: "Visit salons, propose solutions, and provide continuous follow-up." },
      { jp: "商品・販促・教育を組み合わせた支援設計", en: "Design support by combining products, promotion, and education." },
      { jp: "イベントや新商材ローンチの現場運営", en: "Run events and launches for new products in the field." }
    ],
    culture: [
      { jp: "スピード感", en: "Speed" },
      { jp: "顧客理解", en: "Customer understanding" },
      { jp: "チーム提案", en: "Team-based proposals" },
      { jp: "挑戦歓迎", en: "Challenge-friendly" }
    ],
    image: "/assets/cosmo-sales-hero.png",
    portrait: "/assets/cosmo-portrait.png"
  },
  {
    slug: "create",
    name: "CREATE",
    label: { jp: "株式会社CREATE", en: "CREATE Co., Ltd." },
    englishTag: "Product Engineering",
    accent: "#4f6788",
    softAccent: "rgba(79, 103, 136, 0.14)",
    tagline: {
      jp: "美しさを、技術でかたちにする。",
      en: "Give beauty form through technology."
    },
    summary: {
      jp: "美容の現場で求められる機能と品質を、設計・開発の力でかたちにし、使いやすさと安全性を磨きます。",
      en: "CREATE shapes the function and quality demanded by beauty professionals through design and development, refining usability and safety."
    },
    fit: {
      jp: "機械設計や品質視点を活かし、身近な美容プロダクトに技術の価値を込めたい人へ。",
      en: "For people who want to apply engineering and quality thinking to beauty products used every day."
    },
    missionTitle: {
      jp: "設計の精度が、体験の質になる。",
      en: "Design precision becomes experience quality."
    },
    missionBody: {
      jp: "開発・評価・量産を横断しながら、機能美と再現性の高いものづくりを追求します。",
      en: "Across development, evaluation, and mass production, CREATE pursues functional beauty and highly reproducible craftsmanship."
    },
    workStyle: [
      { jp: "機構設計・試作・評価の反復", en: "Repeat cycles of mechanical design, prototyping, and evaluation." },
      { jp: "品質と使い心地を両立する検証プロセス", en: "Build verification processes that balance quality and comfort." },
      { jp: "製造や企画と連携した仕様づくり", en: "Develop specifications in collaboration with manufacturing and planning." }
    ],
    culture: [
      { jp: "技術対話", en: "Technical dialogue" },
      { jp: "再現性", en: "Reproducibility" },
      { jp: "設計品質", en: "Design quality" },
      { jp: "改善志向", en: "Improvement mindset" }
    ],
    image: "/assets/create-engineer.png",
    portrait: "/assets/create-portrait.png"
  },
  {
    slug: "holistic-cures",
    name: "HOLISTIC CURES",
    label: { jp: "ホリスティックキュアーズ", en: "Holistic Cures" },
    englishTag: "Premium Devices",
    accent: "#b28e6d",
    softAccent: "rgba(178, 142, 109, 0.16)",
    tagline: {
      jp: "品質と感性で、毎日の美しさを磨く。",
      en: "Refine everyday beauty through quality and sensibility."
    },
    summary: {
      jp: "毎日の美しさを支えるビューティーデバイスに、品質と感性を込め、長く信頼されるプロダクトを育てます。",
      en: "Holistic Cures builds beauty devices that carry both quality and sensibility, earning trust over time."
    },
    fit: {
      jp: "ブランド価値のある製品を丁寧に磨き、細部まで美しさと品質に向き合いたい人へ。",
      en: "For people who want to elevate branded products with care and focus on beauty and quality in every detail."
    },
    missionTitle: {
      jp: "感性まで届く、品質をつくる。",
      en: "Create quality that reaches even the senses."
    },
    missionBody: {
      jp: "製品の細部、素材感、体験品質までを一つの価値として捉え、妥協なく仕上げるものづくりです。",
      en: "The work treats details, material feel, and experience quality as one integrated value and refines them without compromise."
    },
    workStyle: [
      { jp: "美容デバイスの商品企画・改良", en: "Plan and improve beauty device products." },
      { jp: "品質保証とテスト観点の高度化", en: "Advance quality assurance and testing standards." },
      { jp: "ブランド体験を支える表現設計", en: "Shape expressions that support the brand experience." }
    ],
    culture: [
      { jp: "審美眼", en: "Aesthetic judgment" },
      { jp: "品質主義", en: "Quality-first" },
      { jp: "細部志向", en: "Detail orientation" },
      { jp: "長期価値", en: "Long-term value" }
    ],
    image: "/assets/holistic-lab.png",
    portrait: "/assets/holistic-lab.png"
  }
];

export const jobs: Job[] = [
  {
    id: "cosmo-sales",
    title: { jp: "営業 / サロンコンサルティング", en: "Sales / Salon Consulting" },
    company: "cosmo",
    location: { jp: "福岡", en: "Fukuoka" },
    type: { jp: "中途・正社員", en: "Mid-career / Full-time" },
    mission: {
      jp: "美容室の経営課題に向き合い、継続的な成長支援を行う。",
      en: "Face salon business challenges directly and provide ongoing growth support."
    },
    tasks: [
      { jp: "既存顧客への提案営業", en: "Proposal-based sales to existing clients" },
      { jp: "新商品導入支援", en: "Support for new product introduction" },
      { jp: "販促・教育施策の企画", en: "Planning promotion and education initiatives" }
    ],
    fit: {
      jp: "関係構築力があり、現場で学びながら成果をつくりたい方",
      en: "For people who build trust well and want to learn in the field while creating results."
    }
  },
  {
    id: "create-mechanical",
    title: { jp: "機構設計 / プロダクト開発", en: "Mechanical Design / Product Development" },
    company: "create",
    location: { jp: "福岡", en: "Fukuoka" },
    type: { jp: "中途・正社員", en: "Mid-career / Full-time" },
    mission: {
      jp: "美容デバイスの設計品質と使い心地を高める。",
      en: "Raise the design quality and usability of beauty devices."
    },
    tasks: [
      { jp: "機構設計", en: "Mechanical design" },
      { jp: "試作評価", en: "Prototype evaluation" },
      { jp: "量産立ち上げ支援", en: "Support for production launch" }
    ],
    fit: {
      jp: "設計と品質の両立にこだわり、改善を重ねられる方",
      en: "For people who care deeply about balancing design and quality through iteration."
    }
  },
  {
    id: "holistic-qa",
    title: { jp: "品質管理 / 品質保証", en: "Quality Control / Quality Assurance" },
    company: "holistic-cures",
    location: { jp: "福岡", en: "Fukuoka" },
    type: { jp: "中途・正社員", en: "Mid-career / Full-time" },
    mission: {
      jp: "ブランド品質を守り、長く愛される製品体験を支える。",
      en: "Protect brand quality and support product experiences that stay loved over time."
    },
    tasks: [
      { jp: "評価基準整備", en: "Build evaluation standards" },
      { jp: "不具合分析", en: "Analyze defects and issues" },
      { jp: "製造連携と改善推進", en: "Coordinate with manufacturing and drive improvements" }
    ],
    fit: {
      jp: "数値と感性の両面から品質を捉えられる方",
      en: "For people who can understand quality through both data and sensibility."
    }
  },
  {
    id: "group-corporate",
    title: { jp: "コーポレート / 経営管理", en: "Corporate / Business Management" },
    company: "cosmo",
    location: { jp: "福岡", en: "Fukuoka" },
    type: { jp: "中途・正社員", en: "Mid-career / Full-time" },
    mission: {
      jp: "グループ全体の挑戦を支える仕組みを整える。",
      en: "Build the systems that support the group’s next stage of challenge."
    },
    tasks: [
      { jp: "人事・採用運営", en: "HR and recruiting operations" },
      { jp: "組織開発", en: "Organization development" },
      { jp: "業務基盤改善", en: "Operational foundation improvement" }
    ],
    fit: {
      jp: "人と組織の成長を仕組みで支えたい方",
      en: "For people who want to support growth in people and organizations through systems."
    }
  }
];

export const interviews: Interview[] = [
  {
    name: "A. Tanaka",
    role: { jp: "営業 / Cosmo", en: "Sales / Cosmo" },
    year: { jp: "2021年入社", en: "Joined in 2021" },
    company: "cosmo",
    quote: {
      jp: "提案した商品だけでなく、サロンの未来まで一緒に考えられることがこの仕事の魅力です。",
      en: "What makes this work meaningful is that we do not just propose products. We think together about a salon’s future."
    },
    image: "/assets/cosmo-portrait.png"
  },
  {
    name: "K. Sato",
    role: { jp: "機構設計 / Create", en: "Mechanical Design / Create" },
    year: { jp: "2019年入社", en: "Joined in 2019" },
    company: "create",
    quote: {
      jp: "小さな使用感の差が、製品全体の信頼を大きく変える。そこに設計の面白さがあります。",
      en: "A small difference in user feel can reshape trust in the whole product. That is what makes design work fascinating."
    },
    image: "/assets/create-portrait.png"
  },
  {
    name: "M. Inoue",
    role: { jp: "採用・人事 / Group", en: "Recruiting & HR / Group" },
    year: { jp: "2020年入社", en: "Joined in 2020" },
    company: "cosmo",
    quote: {
      jp: "会社の違いを正直に伝えることで、入社後の納得感と活躍が変わると感じています。",
      en: "When we explain the differences between companies honestly, candidates join with more conviction and perform better after joining."
    },
    image: "/assets/brand-showroom.png"
  }
];

export const dataMetrics = {
  growth: {
    label: { jp: "社員増加率", en: "Employee Growth" },
    value: 1.7,
    suffix: "x",
    note: { jp: "2015年〜2020年", en: "2015-2020" }
  },
  gender: {
    label: { jp: "男女比率", en: "Gender Ratio" },
    items: [
      { label: { jp: "女性", en: "Women" }, value: 28.4, tone: "warm" },
      { label: { jp: "男性", en: "Men" }, value: 71.6, tone: "cool" }
    ]
  },
  roles: {
    label: { jp: "コスモの職種別割合", en: "Cosmo Role Breakdown" },
    items: [
      { label: { jp: "営業", en: "Sales" }, value: 63, icon: "runner" },
      { label: { jp: "企画", en: "Planning" }, value: 7.4, icon: "presentation" },
      { label: { jp: "インストラクター", en: "Instructor" }, value: 2.4, icon: "instructor" },
      { label: { jp: "流通", en: "Distribution" }, value: 6.2, icon: "pin" },
      { label: { jp: "業務", en: "Operations" }, value: 13.6, icon: "desk" },
      { label: { jp: "マーケ", en: "Marketing" }, value: 3.7, icon: "idea" },
      { label: { jp: "経理", en: "Accounting" }, value: 3.7, icon: "accounting" }
    ]
  },
  marriage: {
    label: { jp: "既婚者率", en: "Married Employees" },
    value: 60.6,
    suffix: "%"
  },
  parentalLeave: {
    label: { jp: "育休から復帰率", en: "Return From Parental Leave" },
    value: 100,
    suffix: "%"
  },
  benefits: {
    label: { jp: "福利厚生各種", en: "Benefits" },
    items: [
      { label: { jp: "業務手当", en: "Work Allowance" }, icon: "briefcase" },
      { label: { jp: "地域手当", en: "Area Allowance" }, icon: "location" },
      { label: { jp: "住宅手当", en: "Housing Allowance" }, icon: "home" }
    ]
  },
  awards: {
    label: { jp: "年間表彰コンテスト", en: "Annual Awards Contest" },
    body: {
      jp: "成果を讃え、挑戦を称える文化。年に一度、輝く仲間を表彰します。",
      en: "A culture that celebrates results and honors challenges. Once a year, we recognize teammates who shine."
    },
    items: [
      { label: { jp: "No.1", en: "No.1" }, body: { jp: "私がNo.1だっ!", en: "I am No.1!" }, icon: "crown" },
      { label: { jp: "いいえ、私よっ!", en: "No, it is me!" }, body: { jp: "いいえ、私よっ!", en: "No, it is me!" }, icon: "heart" },
      { label: { jp: "いや、俺だっ!", en: "No, it is me!" }, body: { jp: "いや、俺だっ!", en: "No, it is me!" }, icon: "star" },
      { label: { jp: "結局、誰よ…", en: "So, who is it?" }, body: { jp: "結局、誰よ…", en: "So, who is it?" }, icon: "medal" }
    ]
  }
} as const;

export const faqs = [
  {
    question: {
      jp: "中途採用が中心ですか？",
      en: "Is hiring mainly focused on mid-career candidates?"
    },
    answer: {
      jp: "現在は中途採用を中心にしながら、新卒採用も段階的に強化しています。職種ごとに募集状況が異なります。",
      en: "At present, hiring is centered on mid-career talent while new graduate hiring is being strengthened step by step. Openings vary by role."
    }
  },
  {
    question: {
      jp: "応募時に業界経験は必要ですか？",
      en: "Is beauty industry experience required to apply?"
    },
    answer: {
      jp: "職種によって歓迎する経験は異なりますが、業界未経験でも顧客理解や技術基盤を活かせるポジションがあります。",
      en: "The experience we value differs by role, but there are positions where candidates can apply customer understanding or technical foundations even without industry experience."
    }
  },
  {
    question: {
      jp: "会社ごとの違いはどう見極めれば良いですか？",
      en: "How should I understand the differences between the companies?"
    },
    answer: {
      jp: "このサイトでは会社ごとの仕事内容、向いている人物像、社員インタビューを並べて比較できるようにしています。",
      en: "This site is designed so you can compare each company side by side through work content, ideal candidate profiles, and employee interviews."
    }
  },
  {
    question: {
      jp: "選考フローを教えてください。",
      en: "What does the selection process look like?"
    },
    answer: {
      jp: "書類選考、面接、必要に応じた適性確認を経て内定となります。職種によって追加面談や課題が入る場合があります。",
      en: "The process usually includes document screening, interviews, and when needed, additional suitability checks. Some roles may include extra interviews or assignments."
    }
  }
];

export const culturePillars = [
  {
    title: "Growth",
    body: {
      jp: "現場で学びながら、役割の幅を広げていく成長支援。",
      en: "Growth support that expands your role while learning in the field."
    }
  },
  {
    title: "Teamwork",
    body: {
      jp: "営業、企画、開発、品質がつながり、価値を一緒につくる。",
      en: "Sales, planning, development, and quality work together to create value."
    }
  },
  {
    title: "Craftsmanship",
    body: {
      jp: "細部まで丁寧に仕上げる、美容業界ならではの品質観。",
      en: "A quality mindset rooted in the beauty industry’s attention to every detail."
    }
  },
  {
    title: "Customer Focus",
    body: {
      jp: "美容室やユーザーの声を起点に、提案も製品も磨いていく。",
      en: "Refine both proposals and products by starting from the voices of salons and users."
    }
  }
];

export const storySteps = [
  {
    jp: "サロンや市場の課題を理解する",
    en: "Understand salon and market challenges"
  },
  {
    jp: "商品・デバイス・提案を設計する",
    en: "Design products, devices, and proposals"
  },
  {
    jp: "現場に届け、改善を重ねる",
    en: "Deliver to the field and keep improving"
  },
  {
    jp: "美容の仕事と体験価値を支える",
    en: "Support beauty work and experience value"
  }
];

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}

export function pickText(text: LocalizedText, lang: Lang) {
  return text[lang];
}
