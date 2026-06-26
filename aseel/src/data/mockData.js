// Mock data for development / demo

export const mockUser = {
  id: 'u1',
  name: 'Mohammed Al Mansoori',
  nameAr: 'محمد المنصوري',
  email: 'mohammed@farm.ae',
  phone: '+971501234567',
  role: 'farmer',
  avatar: null,
  farms: ['f1'],
  language: 'en',
  contributionScore: 248,
  badgeCount: 5,
  createdAt: '2024-01-15T08:00:00Z',
  isVerified: true,
};

export const mockFarm = {
  id: 'f1',
  name: 'Al Mansoori Camel Farm',
  ownerId: 'u1',
  location: { latitude: 23.5, longitude: 55.8 },
  address: "Al Qua'a, Abu Dhabi, UAE",
  camelIds: ['c1', 'c2', 'c3', 'c4', 'c5'],
  area: 4.2,
  photo: null,
};

export const mockCamels = [
  { id: 'c1', name: 'Zain',     nameAr: 'زين',    uniqueId: 'AE-001', farmId: 'f1', ownerId: 'u1', breed: 'dromedary', gender: 'male',   age: 5,  weight: 520, photo: null, healthStatus: 'healthy',    healthScore: 92, riskScore: 8,  collarId: 'col-01', isPregnant: false, lastSeen: new Date().toISOString(), birthDate: '2019-03-10', createdAt: '2024-01-15T08:00:00Z', tags: ['racing'] },
  { id: 'c2', name: 'Layla',    nameAr: 'ليلى',  uniqueId: 'AE-002', farmId: 'f1', ownerId: 'u1', breed: 'dromedary', gender: 'female', age: 7,  weight: 460, photo: null, healthStatus: 'pregnant',   healthScore: 78, riskScore: 22, collarId: 'col-02', isPregnant: true,  pregnancyWeek: 9, lastSeen: new Date().toISOString(), birthDate: '2017-06-22', createdAt: '2024-01-15T08:00:00Z', tags: ['breeding'] },
  { id: 'c3', name: 'Noor',     nameAr: 'نور',   uniqueId: 'AE-003', farmId: 'f1', ownerId: 'u1', breed: 'dromedary', gender: 'female', age: 3,  weight: 380, photo: null, healthStatus: 'heat_stress', healthScore: 55, riskScore: 65, collarId: 'col-03', isPregnant: false, lastSeen: new Date().toISOString(), birthDate: '2021-01-05', createdAt: '2024-01-15T08:00:00Z', tags: [] },
  { id: 'c4', name: 'Majid',    nameAr: 'ماجد',  uniqueId: 'AE-004', farmId: 'f1', ownerId: 'u1', breed: 'dromedary', gender: 'male',   age: 9,  weight: 610, photo: null, healthStatus: 'healthy',    healthScore: 88, riskScore: 12, collarId: null,      isPregnant: false, lastSeen: new Date().toISOString(), birthDate: '2015-11-18', createdAt: '2024-01-15T08:00:00Z', tags: ['show'] },
  { id: 'c5', name: 'Safa',     nameAr: 'صفاء',  uniqueId: 'AE-005', farmId: 'f1', ownerId: 'u1', breed: 'dromedary', gender: 'female', age: 4,  weight: 410, photo: null, healthStatus: 'sick',       healthScore: 41, riskScore: 80, collarId: 'col-05', isPregnant: false, lastSeen: new Date().toISOString(), birthDate: '2020-07-14', createdAt: '2024-01-15T08:00:00Z', tags: [] },
];

export const mockCollarReading = {
  collarId: 'col-01',
  camelId: 'c1',
  timestamp: new Date().toISOString(),
  gps: { latitude: 23.502, longitude: 55.803 },
  bodyTemp: 38.7,
  ambientTemp: 42.1,
  activityLevel: 74,
  batteryLevel: 83,
  signalStrength: -62,
  isMoving: true,
  speed: 3.2,
};

export const mockAlerts = [
  { id: 'a1', camelId: 'c5', camelName: 'Safa',  farmId: 'f1', type: 'illness',     severity: 'high',     confidence: 0.89, message: 'Safa shows signs of respiratory illness. Temperature elevated at 40.2°C.',   recommendation: 'Contact veterinarian immediately.', createdAt: new Date(Date.now() - 3600000).toISOString(),  isRead: false },
  { id: 'a2', camelId: 'c3', camelName: 'Noor',  farmId: 'f1', type: 'heat_stress', severity: 'medium',   confidence: 0.76, message: 'Noor exhibiting reduced activity in peak heat hours. Heat stress detected.', recommendation: 'Move to shaded area and increase water access.', createdAt: new Date(Date.now() - 7200000).toISOString(),  isRead: false },
  { id: 'a3', camelId: 'c2', camelName: 'Layla', farmId: 'f1', type: 'pregnancy_risk', severity: 'low',   confidence: 0.62, message: 'Layla is in week 9 of pregnancy. Movement patterns slightly irregular.',     recommendation: 'Increase monitoring frequency.', createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: true  },
];

export const mockPins = [
  { id: 'p1', authorId: 'u2', authorName: 'Ahmed Al Rashidi', category: 'water_source',   title: 'Fresh water well — Wadi Al Ain',       description: 'Clean water source, suitable for up to 50 camels. Depth 12m, pump operational.', location: { latitude: 23.515, longitude: 55.812 }, images: [], isVerified: true,  likes: 24, likedBy: [], comments: [{ id: 'cm1', authorId: 'u3', authorName: 'Khalid', text: 'Used it yesterday, excellent!', createdAt: new Date(Date.now() - 3600000).toISOString() }], createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'p2', authorId: 'u3', authorName: 'Khalid Al Zaabi',  category: 'disease_report', title: 'Camel pox outbreak — northern pasture', description: 'Two camels on my farm showing camel pox symptoms. Isolated them. Alerting neighbors.', location: { latitude: 23.488, longitude: 55.795 }, images: [], isVerified: false, likes: 8,  likedBy: [], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(),  updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'p3', authorId: 'u4', authorName: 'Saeed Al Dhaheri', category: 'good_grazing',   title: 'Excellent grazing after rain',          description: 'The area near Jebel Hafit foothills has good green patches after last week\'s rain.', location: { latitude: 23.521, longitude: 55.828 }, images: [], isVerified: true,  likes: 31, likedBy: [], comments: [{ id: 'cm2', authorId: 'u1', authorName: 'Mohammed', text: 'Bringing my herd tomorrow!', createdAt: new Date(Date.now() - 7200000).toISOString() }], createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'p4', authorId: 'u2', authorName: 'Ahmed Al Rashidi', category: 'danger_zone',    title: 'Loose wire fencing — east road',        description: 'Broken barbed wire fencing on the eastern road near km 34. Camels could injure themselves.', location: { latitude: 23.497, longitude: 55.818 }, images: [], isVerified: false, likes: 5, likedBy: [], comments: [], createdAt: new Date(Date.now() - 43200000).toISOString(), updatedAt: new Date(Date.now() - 43200000).toISOString() },
];

export const mockWeather = {
  temperature: 43,
  feelsLike: 48,
  humidity: 28,
  condition: 'Sunny',
  heatIndex: 52,
  uvIndex: 11,
  windSpeed: 14,
};

export const mockNotifications = [
  { id: 'n1', type: 'heat_stress',  title: 'Heat Stress Alert',     body: 'Noor is showing signs of heat stress. Immediate attention required.', isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString(),  camelId: 'c3' },
  { id: 'n2', type: 'illness',      title: 'Health Alert — Safa',   body: 'AI detected potential illness in Safa. Confidence: 89%.', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString(),  camelId: 'c5' },
  { id: 'n3', type: 'nearby_disease', title: 'Nearby Disease Report', body: 'Camel pox reported 3.2km from your farm by Khalid Al Zaabi.', isRead: false, createdAt: new Date(Date.now() - 86400000).toISOString(), pinId: 'p2' },
  { id: 'n4', type: 'pregnancy',    title: 'Pregnancy Update',      body: 'Layla is now in week 9 of pregnancy. Schedule vet checkup.', isRead: true,  createdAt: new Date(Date.now() - 172800000).toISOString(), camelId: 'c2' },
  { id: 'n5', type: 'badge_earned', title: 'Badge Earned!',         body: 'You earned the "Community Guardian" badge for 10 verified pins.', isRead: true,  createdAt: new Date(Date.now() - 432000000).toISOString() },
];

export const mockChatHistory = [
  { id: 'm1', role: 'assistant', content: 'Marhaba! I am ASEEL, your AI camel farming assistant. How can I help you today?', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: 'm2', role: 'user',      content: 'Where is the nearest water source?', timestamp: new Date(Date.now() - 500000).toISOString() },
  { id: 'm3', role: 'assistant', content: 'Based on community reports in your area, the closest verified water source is the **Fresh water well at Wadi Al Ain**, approximately 2.1km northeast of your farm. It was verified by Ahmed Al Rashidi 2 days ago and can accommodate up to 50 camels. Shall I show it on the map?', timestamp: new Date(Date.now() - 480000).toISOString() },
];

export const mockAnalytics = {
  totalCamels:    5,
  healthyCount:   2,
  sickCount:      1,
  pregnantCount:  1,
  lostCount:      0,
  heatStressCount:1,
  diseaseRate:    0.08,
  avgHealthScore: 70.8,
  alertCount:     3,
  communityPins:  4,
};
