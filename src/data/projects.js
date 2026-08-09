export const projectsData = [
  {
    id: 'climatelens',
    number: '01',
    title: 'ClimateLens',
    category: 'AI / WEB PLATFORM',
    description:
      'An AI-powered climate impact storytelling platform that transforms local environmental conditions and community experiences into accessible climate stories.',
    problem:
      'Climate data is often presented as abstract numbers and complex technical charts that fail to communicate the real-world human impact of environmental changes to local communities.',
    solution:
      'ClimateLens fuses real-time weather APIs, geocoded map data, and generative AI to craft localized, multilingual narratives that help people understand climate trends in their area.',
    features: [
      'Location-aware climate information',
      'Weather data integration',
      'AI-generated climate stories',
      'Multilingual storytelling',
      'Interactive map experience',
    ],
    technologies: ['HTML', 'JavaScript', 'Node.js', 'MongoDB', 'OpenAI API', 'Weather APIs', 'Mapbox'],
    github: 'https://github.com/Prashantkushwaha7',
    demo: '#',
    visualType: 'climateLens',
    layoutDir: 'left',
  },
  {
    id: 'nova-ai',
    number: '02',
    title: 'Nova AI Assistant',
    category: 'AI / VOICE ASSISTANT',
    description:
      'An intelligent voice-based desktop assistant designed to understand spoken commands, interact with applications, and provide AI-powered assistance.',
    problem:
      'Navigating desktop applications, managing system tasks, and seeking contextual information often requires repetitive manual keyboard and mouse interactions.',
    solution:
      'Nova AI combines offline speech-to-text engines (VOSK) with desktop automation scripts to execute voice commands, control applications, and answer queries seamlessly.',
    features: [
      'Voice interaction',
      'Speech recognition',
      'AI responses',
      'Desktop application integration',
      'Voice commands',
    ],
    technologies: ['Python', 'Node.js', 'Electron', 'VOSK', 'Speech Recognition', 'Text-to-Speech', 'AI'],
    github: 'https://github.com/Prashantkushwaha7',
    demo: '#',
    visualType: 'novaAi',
    layoutDir: 'right',
  },
  {
    id: 'esp32-csi',
    number: '03',
    title: 'ESP32 CSI Human Activity Recognition',
    category: 'AI / IOT / WIRELESS SENSING',
    description:
      'A Wi-Fi Channel State Information based system that uses ESP32 devices and signal variations to detect human activity without requiring a camera.',
    problem:
      'Traditional activity monitoring systems rely on optical cameras or wearable sensors, raising severe privacy concerns and requiring continuous device maintenance.',
    solution:
      'By analyzing sub-carrier amplitude and phase distortions in ambient Wi-Fi signals using ESP32 nodes, deep learning models classify human movement (standing, sitting, walking) without visual surveillance.',
    features: [
      'Wi-Fi CSI data collection',
      'Human presence detection',
      'Activity classification',
      'Standing / Sitting / Moving recognition',
      'Camera-free sensing',
    ],
    technologies: ['ESP32', 'Wi-Fi CSI', 'Python', 'AI / ML', 'Signal Processing', 'IoT'],
    github: 'https://github.com/Prashantkushwaha7',
    demo: '#',
    visualType: 'esp32Csi',
    layoutDir: 'full',
  },
];
