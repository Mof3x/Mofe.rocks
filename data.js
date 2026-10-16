/* ==========================================================================
   EDIT YOUR CONTENT HERE
   --------------------------------------------------------------------------
   Almost every word on the site comes from this one file. Change the text
   between the quotes, save, and refresh the page.

   - Anything still written as "[PLACEHOLDER: ...]" shows on the site as a
     dashed yellow chip, so unfinished bits are easy to spot. Before you
     publish, search this file for  [PLACEHOLDER  and replace every one.
   - Links: use full web addresses (https://...). Leave a link as a
     placeholder and the site shows a "coming soon" chip instead of a
     broken link.
   - Images: put files in assets/img/ and write the path, e.g.
     "assets/img/website-home.png". Always write useful alt text that
     describes what the image shows.
   - Keep the commas and quotes exactly as they are. If the page goes blank,
     a missing comma or quote here is the usual cause.
   ========================================================================== */

window.SITE = {
  person: {
    name: "Shirli Irenimofe Williams",
    shortName: "Shirli",
    role: "Computer Science Graduate",
    focus: "Websites and applications",
    stack: "Python, JavaScript, TypeScript, SQL, HTML, CSS, React, Angular, Git, Unity",
    location: "London, United Kingdom",
    timezone: "GMT (UTC+0)",
    openTo: "Most technical, organisational or creative roles.",
    classOf: "2026",
    tagline: "I build interesting, meaningful and efficient projects and I care about accessibility, impact and quality of production.",
  },

  links: {
    email: "shxrliwilliams@gmail.com",
    github: "https://github.com/Mof3x",
    linkedin: "https://www.linkedin.com/in/mofe-williams/",
    // Replace this file with your real CV, keeping the same name (or update the path).
    cv: "assets/cv/Shirli_Williams_CV_Techpriv.pdf",
  },

  // Greeting under the home-page terminal, picked by the visitor's local time.
  greetings: {
    morning: "Good morning, and thanks for stopping by.",
    afternoon: "Good afternoon, and thanks for stopping by.",
    evening: "Good evening, and thanks for stopping by.",
  },

  about: {
    // Your photo or illustration, e.g. "assets/img/shirli.jpg" (portrait, roughly 4:5).
    photo: "assets/img/mofeprofessionalprofile.jpg",
    photoAlt: "Portrait of Shirli Irenimofe Williams",
    bio: [
      "I am a computer science graduate with a deep appreciation for logic, a passion for creativity and a skill for combining the two. I got into computer science specifically because of its wide array of applications and limitless potential for innovation.",
      "I enjoy problem solving and systems analysis, and I am constantly seeing new ways to improve and optimize systems and bolster their structure across a wide range of domains. I am a strong advocate for accessibility and inclusivity in technology, as well as the importance of secure, ethical and responsible design and development. I am always looking for new ways to learn, grow and improve my skills, and I am excited to see where my career in computer science will take me.",
    ],
    // Rows in the ID-card table. Add, remove or rename rows freely.
    facts: [
      ["Degree", "BSc Computer Science with Honours"],
      ["University", "Queen Mary University of London"],
      ["Graduated", "2026"],
      ["Based in", "London, United Kingdom"],
      ["Languages", "English and Yoruba (proficient, C2), Japanese (elementary, A2)"],
      ["Interests", "Oil painting, reading, digital art, gaming, weightlifting, writing"],
    ],
  },

  // Hexagon chart on the About page. Six areas, each scored 1-5 by YOU
  // (how much of your time/interest goes there). Leave value as null and the
  // chart shows a dashed placeholder outline.
  focusAreas: [
    { label: "professional research and practice", value: 4 },
    { label: "Security", value: 3 },
    { label: "Logic", value: 5 },
    { label: "Systems", value: 5 },
    { label: "Neural Networks", value: 4 },
    { label: "Internet protocols", value: 3 },
  ],

  // Skill groups: each is one line on the CV page. Groups marked about: false
  // are left out of the About page's Toolkit tags (to keep that panel short).
  skills: [
    { label: "Languages & frameworks", items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS", "SCSS", "React", "React Native", "Angular"] },
    { label: "APIs & data", items: ["RESTful APIs", "JSON", "Regex", "Data analysis"] },
    { label: "Tools", items: ["Git / GitHub", "Jira", "Figma", "Unity", "VS Code", "Microsoft Office"] },
    { label: "Practices", about: false, items: ["Agile ceremonies", "UI/UX design", "Design systems", "Requirements analysis", "Technical writing", "Accessibility", "Ethical design", "Systems analysis"] },
    { label: "Professional", about: false, items: ["Project management", "Stakeholder management", "Presentation skills", "Cross-functional collaboration", "Problem solving"] },
  ],

  // Summary at the top of the CV page (the home page uses person.tagline).
  cvSummary: "2026 Computer Science graduate (BSc Hons, 2:1, Queen Mary University of London) with software engineering and project management internships at BNY Mellon and Publicis Sapient, and early UX experience at PwC. I work in Python, JavaScript, TypeScript and SQL, with hands-on experience in Angular front-end development, RESTful APIs and JSON, Agile delivery with Jira, and user-centred design in Figma. I work well across technical and non-technical teams, with strong communication and a track record of leading people and projects. Seeking graduate software engineering, technology and product opportunities.",

  education: [
    {
      qualification: "BSc (Hons) Computer Science",
      institution: "Queen Mary University of London",
      dates: "2020 - 2026",
      details: [
        "Second Class Upper Division (2:1)",
        "Professional Research and practices - 89%",
         "Computer Systems and Networks - 78%", 
         "Security Engineering - 76%",
         "Internet Protocols and Applications - 71%",
         "Neural Networks and Deep Learning - 71%",
      ],
    },
    {
      qualification: "A-Levels: Mathematics (A), Physics (A), Fine Art (A)",
      institution: "Harris Academy Greenwich",
      dates: "2019",
      details: [],
    },
  ],

  // CV page sections. Each entry: { role, organisation, dates, details: [...] }.
  experience: [
    {
      role: "Software Engineering Intern",
      organisation: "BNY Mellon",
      dates: "Jun 2024 – Aug 2024",
      details: [
        "Migrated UI components to Angular, TypeScript and SCSS, learning Angular and TypeScript from scratch.",
        "Built a user information collection page using regex, coordinating tasks with the team through Jira.",
        "Contributed to Agile ceremonies that kept the team aligned and delivery efficient.",
      ],
    },
    {
      role: "Project Management Intern",
      organisation: "Publicis Sapient",
      dates: "Jun 2022 – Aug 2022",
      details: [
        "Built the front end of a self-building, AI-powered ERP dashboard integrating multiple company accounts to speed up transactions, focusing on JSON and RESTful APIs.",
        "Led a cross-functional team to deliver a working prototype, presented to company executives.",
        "Completed intensive training in Agile project management and digital business strategy.",
      ],
    },
    {
      role: "HR Assistant",
      organisation: "Antai Fintech Global",
      dates: "Sep 2021 – May 2022",
      details: [
        "Coordinated recruitment from interview scheduling through onboarding at a fintech firm.",
        "Maintained accurate HR records in line with internal policies and compliance requirements.",
      ],
    },
    {
      role: "UI/UX Work Experience (Sixth Form Programme)",
      organisation: "PwC",
      dates: "Jun 2017 – Sep 2017",
      details: [
        "Created interface mock-ups and wireframes in Figma.",
        "Used GitHub for version control and contributed to design system discussions.",
        "Took part in client-facing workshops and design thinking sessions to gather insights for user-centred design.",
      ],
    },
  ],

  leadership: [
    {
      role: "President",
      organisation: "Queen Mary African Caribbean Society",
      dates: "Sep 2021 – Aug 2022",
      details: [
        "Designed sponsorship packages of up to £20,000 and sold them to partners including UBS and Credit Suisse, raising over £80,000.",
        "Rebuilt the society after COVID-19, growing membership from fewer than 10 to over 350 students.",
      ],
    },
    {
      role: "BAME Student Representative",
      organisation: "Queen Mary University of London",
      dates: "Aug 2024 – Aug 2025",
      details: [
        "Collected and analysed student feedback to shape discussions and events.",
        "Represented BAME students to university staff and student bodies, collaborating on inclusion initiatives.",
      ],
    },
  ],

  additionalExperience: [
    {
      role: "Festival Bar Staff & Management",
      organisation: "Host Staffing Agency",
      dates: "Mar 2017 – Aug 2021",
      details: ["Managed stock and coordinated bar teams at large-scale festivals and events, maintaining high service standards under pressure across varied venues."],
    },
    {
      role: "Waitress & Barista",
      organisation: "Rude N Boomin",
      dates: "Jun 2019 – Aug 2021",
      details: ["Delivered fast, friendly service in a busy hospitality setting, handling customer enquiries and payments."],
    },
  ],

  spokenLanguages: ["English: proficient (C2)", "Yoruba: proficient (C2)", "Japanese: elementary (A2)"],
  interests: ["Oil painting (practising professional artist)", "Weightlifting", "Reading", "History", "Learning new languages"],

  contactNote: "graduate roles and collaborations",

  /* ------------------------------------------------------------------------
     PROJECTS
     The order here is the order on the site. Each project already has its own
     page (upset-live.html, project-game.html, project-application.html);
     the "id" must match the data-project value on that page.
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "website",
      number: "01",
      type: "Website",
      page: "upset-live.html",
      title: "UpsetXociety",
      summary: "A cultural platform and living archive for an independent art house, bringing together visual art, music, writing and collective memory. A custom React frontend connects artists, works and editorial content through a headless CMS.",
      thumbnail: "assets/img/upset-thumb.webp",
      thumbnailAlt: "The UpsetXociety homepage: a noisy black background, site navigation and the Patchwork Bustop banner",
      tech: ["React",
      "JavaScript",
      "CSS",
      "Vite",
      "React Router",
      "Directus",
      "Supabase / PostgreSQL",
      "GitHub Actions"],
      role: "Solo developer — frontend design and build, content modelling, CMS integration and deployment",
      timeline: "May 2026 – present",
      team: "Solo development for the UpsetXociety collective",
      links: {
         live: "https://upset.live",
         code: "https://github.com/Mof3x/Upset.Live",
      },
      overview: ["UpsetXociety is an independent art house and archive for visual art, music, writing and collective memory. I developed its website as a connected cultural platform for multiple users with different roles and permissions, where visitors can move between artists, their work, related texts and journal entries rather than encountering each piece in isolation.", "The site uses a React single-page application backed by Directus. Reusable page templates and components turn structured CMS records into public-facing pages, while keeping content editing separate from the frontend code."],
      goal: ["Create a distinctive online home for the collective that communicates its identity while making a growing body of multidisciplinary work easy to explore.", "Allow artists and editors to maintain content through a CMS, without requiring a developer to manually build or update every individual page."],
      built: [ "A routed React frontend covering the site's main sections, including Home, About, Artists, Works, Texts, Journal, Razz, Vault, Shop and Commissions.",

      "Reusable artist, work, text and journal cards, shared layouts, detail-page templates and related-content sections.",

      "A Directus data layer for reading published content and resolving relationships between artists, works and texts.",

      "Custom visual treatments using canvas-based noise, glow and dithering effects, alongside a CRT-style overlay.",

      "Responsive navigation, page-level loading and unavailable-content states, and defensive handling of missing CMS relationships.",

      "Enquiry and newsletter interfaces with validation and spam-trap fields, currently using pre-filled email rather than a server-side submission service.",

      "An automated GitHub Actions deployment to GitHub Pages, with a custom domain and a fallback for direct visits to application routes."],
      challenges: ["The site needed to retain a strong visual identity without making every page a separate implementation. I structured the frontend around shared layouts, reusable cards and content-driven page templates.",

      "Content relationships and permissions had to work together: publishing a work was not enough if its artist links or images were inaccessible. I separated record queries, relationship handling and public-read rules so the content pipeline could be checked systematically.",

      "Incomplete CMS data could break assumptions in the interface. I added fallbacks for missing artist relationships and clear states for sections whose public access was not yet available.",

      "Deploying a client-routed application to GitHub Pages required handling direct visits to nested URLs. I added a deep-link fallback alongside the automated build and deployment workflow."],
      learned: ["How to model a multidisciplinary cultural archive as related content rather than a collection of disconnected pages.",

      "How to connect a React frontend to a headless CMS while keeping data access, normalisation and presentation separate.",

      "Why CMS permissions, publication state and relationship visibility are part of the user experience, not just backend configuration.",

      "How to move a local prototype towards a maintainable deployed site through documentation, build checks and repeatable release steps."],
      // Each screenshot: { src: "assets/img/file.png", alt: "what it shows", caption: "optional" }
      screenshots: [],
      // Optional live preview of a site you own, shown above the screenshots.
      // Delete these lines to hide it.
      embed: {
        src: "https://upset.live",
        title: "Live preview of the UpsetXociety website",
        caption: "upset.live, embedded live. Scroll inside the frame to explore, or open it in a new tab.",
      },
    },
    {
      id: "game",
      number: "02",
      type: "Game",
      page: "project-game.html",
      title: "Komms – Restore the Signal",
      summary: "A first-person exploration game set around a community radio station in a Sahelian town. Find three replacement transmitter components, avoid a patrol scanner and restore the broadcast before the battery runs out.",
      thumbnail: "assets/img/komms-thumb.webp",
      thumbnailAlt: "Komms gameplay: the town outside the radio station, with the transmitter mast ahead and the parts and battery counters on screen",
      tech: ["Unity", "C#", "TextMesh Pro",],
      role: "Game development — gameplay systems, interaction, UI and environment assembly",
      timeline: "August 2026",
      team: "Solo development",
      links: {
        live: "play/Komms/",
        code:  "https://github.com/Mof3x/Komms",
      },
      // The playable Unity web build in play/Komms/. It only downloads when a
      // visitor presses Play. Folder names are case-sensitive on GitHub Pages.
      game: {
        src: "play/Komms/index.html",
        poster: "assets/img/komms-thumb.webp",
        download: "23 MB",
        controls: [
          ["WASD", "Move"],
          ["Mouse", "Look around"],
          ["Space", "Jump"],
          ["Shift", "Sprint"],
          ["E", "Interact"],
          ["Esc", "Pause and release the mouse"],
        ],
      },
          overview: [
      "KOMMS is a first-person game about restoring a damaged community radio transmitter. The player is part of a network of vigilante technicians operating from a station in a Sahelian town after a storm has interrupted the broadcast.",

      "Starting inside the station, the player explores the surrounding area, reads community notes and collects three replacement components. They must return to the transmitter and repair it before the battery runs out, while navigating a patrol-scanner hazard.",
    ],

    goal: [
      "Build a complete, compact gameplay loop with exploration, collection, time pressure and a clear final objective.",

      "Use the setting and environmental notes to give the player's task a narrative purpose: restoring a community's means of communication.",
    ],

    built: [
      "A first-person exploration environment with a radio-station interior and an exterior search area.",

      "An interaction system for collecting components, reading story fragments and repairing the transmitter.",

      "A three-component collection objective with a HUD progress counter.",

      "Battery and game-state systems supporting the time-limited repair objective.",

      "A patrol-scanner hazard that adds risk to exploration.",

      "A pause interface with a master-volume control.",

      "A 'Connection Restored' completion screen.",

      "Buildings, transmitter props and simple materials assembled in Unity, supported by credited external ground-texture and audio assets.",
    ],

    // Suggested reflection: confirm these describe your actual process.
    challenges: [
      "The collection objective needed to stay understandable while the player explored. Interaction prompts and a visible component counter connected individual pickups to the final repair task.",

      "Several systems had to support the same gameplay loop: battery depletion, component collection, hazards and transmitter repair. I organised these concerns into separate gameplay scripts rather than treating the entire game as one behaviour.",

      "The environment needed to communicate a setting within a compact coursework scope. I combined simple in-project geometry with environmental notes, ambience and a small number of credited external assets.",
    ],

    learned: [
      "How to structure a small Unity game around a complete objective loop rather than a set of disconnected mechanics.",

      "How C# gameplay scripts, interaction prompts and HUD feedback work together to communicate progress.",

      "How environmental storytelling can give an otherwise simple collection-and-repair task a stronger sense of purpose.",

      "How to document controls and credit third-party assets as part of presenting a playable project.",
    ],
      screenshots: [],
    },
    {
      id: "application",
      number: "03",
      type: "Application",
      page: "project-application.html",
      title: "Spikey Profile",
      summary: "A customisable mobile-app prototype for neurodivergent daily-life support. It brings together strengths-and-challenges profiling, wellbeing tracking, planning tools and configurable support modules.",
      thumbnail: "assets/img/spikey-thumb.webp",
      thumbnailAlt: "Three SpikeyProfile screens: a strengths onboarding step, the home quick-log dashboard and the profile radar chart",
      tech: [ "React Native",
      "TypeScript",
      "Expo",
      "React Navigation",
      "React Context",
      "AsyncStorage",],
      role: "Application development — mobile UI, onboarding, state management and local persistence",
      timeline: "October 2025 – May 2026",
      team: "solo development and project supervisor input",
      links: {
        live: "Coming Soon",
        code: "https://github.com/Mof3x/SpikeyProfile",
      },
      overview: [
      "SpikeyProfile is a modular mobile-app prototype that brings daily planning and personal support tools into one configurable interface. It includes tracking for mood, energy, brain fog, sensory overload and executive-function difficulties, alongside tasks, calendar events and timers.",

      "Its onboarding flow builds an editable eight-area strengths-and-challenges profile and recommends a starter bundle of modules. Users retain control over their final choices and can skip the setup or change their preferences later.",
    ],

    goal: [
      "Explore an alternative to a one-size-fits-all productivity app by letting users configure tools around their strengths, challenges and support needs.",

      "Bring planning, self-tracking and communication-support features together while keeping personalisation editable and optional.",
    ],

    built: [
      "A multi-screen React Native application with home, tracking, calendar, insights, profile and settings sections.",

      "A multi-step onboarding flow covering preferences, strengths, challenges, module selection and a final summary.",

      "An editable eight-area support profile with recommended starter module bundles and user-controlled selection.",

      "Shared application state for wellbeing entries, tasks, calendar events, custom trackers and quick-log actions.",

      "Local persistence using AsyncStorage, including a storage preference and controls for clearing saved device data.",

      "Configurable dashboard-widget ordering and support for countdown and count-up timers.",

      "Data models and settings for emergency contacts, medical information and editable communication-support scripts.",

      "Configurable low-sensory preferences, including options for reduced animation, quieter haptics and a simplified interface.",
    ],

    // Suggested reflection: confirm these describe your actual process.
    challenges: [
      "A broad set of support tools could easily become overwhelming. I organised the app around configurable modules and an onboarding flow that suggests a starting point without removing user choice.",

      "Different screens needed access to consistent user data and preferences. I used shared React Context providers and typed data models to connect the interface to common application state.",

      "Personal information needed clear storage controls. I added an on-device storage preference and a way to clear saved data rather than making persistence invisible to the user.",
    ],

    learned: [
      "How to build a multi-screen mobile application using React Native, Expo and TypeScript.",

      "How to represent varied application data with typed models and shared state.",

      "How to persist user data locally while exposing storage preferences in the interface.",

      "How optional onboarding and editable recommendations can support personalisation without forcing every user through the same setup.",
    ],
      // "phone" lays portrait screenshots out side by side, like phone screens.
      screenshotLayout: "phone",
      screenshots: [
        { src: "assets/img/spikey-onboarding.webp", alt: "Onboarding step 3 of 6: rating pattern recognition and systems thinking on a 1 to 5 slider", caption: "Onboarding: strengths profile" },
        { src: "assets/img/spikey-home.webp", alt: "Home screen with one-tap Quick Log buttons for meds, water, breaks and going outside, and a 'Logged: Went Outside' confirmation", caption: "Home: quick log" },
        { src: "assets/img/spikey-alarms.webp", alt: "New alarm schedule sheet: four alarms between a start and end time, with the calculated interval shown", caption: "Alarm schedules" },
        { src: "assets/img/spikey-profile.webp", alt: "Settings screen with profile avatar, level and the 8-area profile radar chart", caption: "Profile and 8-area snapshot" },
      ],
    },
  ],
};
