import { fabrics } from './fabrics';
import { orders } from './orders';
import { styles } from './styles';

export const adminStats = {
  todayNewOrders: 4,
  currentInProgress: 12,
  readyForDelivery: 3,
  dailyRevenue: 2840,
  weeklyRevenue: 18560,
  monthlyRevenue: 72340,
};

export const dailyOrders = [
  { date: '01 مايو', orders: 3, revenue: 2100 },
  { date: '02 مايو', orders: 5, revenue: 3450 },
  { date: '03 مايو', orders: 2, revenue: 1800 },
  { date: '04 مايو', orders: 4, revenue: 2750 },
  { date: '05 مايو', orders: 6, revenue: 4200 },
  { date: '06 مايو', orders: 4, revenue: 3100 },
  { date: '07 مايو', orders: 5, revenue: 3600 },
  { date: '08 مايو', orders: 3, revenue: 2300 },
  { date: '09 مايو', orders: 7, revenue: 5100 },
  { date: '10 مايو', orders: 4, revenue: 2840 },
];

export const orderStyleDistribution = [
  { style: 'سعودي', count: 35, percentage: 35 },
  { style: 'قطري', count: 22, percentage: 22 },
  { style: 'إماراتي', count: 18, percentage: 18 },
  { style: 'عماني', count: 14, percentage: 14 },
  { style: 'كويتي', count: 8, percentage: 8 },
  { style: 'يمني', count: 3, percentage: 3 },
];

export const topFabrics = [
  { id: 'f2', name: 'قطن مصري عالي الجودة', orders: 42, revenue: 1176 },
  { id: 'f3', name: 'كريب ملكي', orders: 28, revenue: 1540 },
  { id: 'f6', name: 'صوف إيطالي', orders: 19, revenue: 1368 },
  { id: 'f1', name: 'جورجيت فاخر', orders: 16, revenue: 720 },
  { id: 'f5', name: 'كتان بلجيكي', orders: 14, revenue: 532 },
];

export const tailors = [
  {
    id: 't1',
    name: 'أحمد العتيبي',
    specialty: 'سعودي',
    workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    dailyCapacity: 3,
    currentLoad: 2,
    experience: 8,
    phone: '0501112233',
  },
  {
    id: 't2',
    name: 'محمد الفهد',
    specialty: 'قطري',
    workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    dailyCapacity: 2,
    currentLoad: 1,
    experience: 5,
    phone: '0504445566',
  },
  {
    id: 't3',
    name: 'خالد الراشد',
    specialty: 'عماني',
    workDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    dailyCapacity: 2,
    currentLoad: 2,
    experience: 12,
    phone: '0507778899',
  },
  {
    id: 't4',
    name: 'ناصر المري',
    specialty: 'إماراتي',
    workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    dailyCapacity: 4,
    currentLoad: 3,
    experience: 6,
    phone: '0500001122',
  },
  {
    id: 't5',
    name: 'سعد الحربي',
    specialty: 'كويتي',
    workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    dailyCapacity: 3,
    currentLoad: 1,
    experience: 4,
    phone: '0503334455',
  },
];

export const recentOrders = orders.map(o => ({
  ...o,
  customerName: ['فهد السالم', 'ناصر العمري', 'سلطان المطيري', 'عبدالله الدوسري', 'بدر الشمري'][orders.indexOf(o) % 5],
  customerPhone: ['0501234567', '0507654321', '0501122334', '0509988776', '0505566778'][orders.indexOf(o) % 5],
}));

export const adminSettings = {
  currency: 'SAR',
  currencySymbol: 'ر.س',
  currencyLabel: 'ريال سعودي',
  availableCurrencies: [
    { code: 'SAR', symbol: 'ر.س', label: 'ريال سعودي' },
    { code: 'AED', symbol: 'د.إ', label: 'درهم إماراتي' },
    { code: 'KWD', symbol: 'د.ك', label: 'دينار كويتي' },
    { code: 'QAR', symbol: 'ر.ق', label: 'ريال قطري' },
    { code: 'OMR', symbol: 'ر.ع', label: 'ريال عماني' },
    { code: 'BHD', symbol: 'د.ب', label: 'دينار بحريني' },
  ],
  workHours: {
    start: '09:00',
    end: '21:00',
    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  },
  deliveryFee: {
    sameCity: 25,
    nearbyCities: 45,
    remote: 60,
  },
  minOrder: 150,
  storeName: 'محل الخياطة الذكي',
  storePhone: '+966 50 123 4567',
  storeAddress: 'الرياض، حي النسيم، شارع التحلية',
  lowStockThreshold: 30,
  notifications: {
    newOrder: 'تم استلام طلبك الجديد، رقم الطلب {orderId}، سنتواصل معك قريباً لتحديد المقاسات.',
    assignedToTailor: 'ثوبك الآن تحت يد خياطنا الماهر، نتوقع إنجازه خلال {days} أيام.',
    readyForPickup: 'ثوبك جاهز للاستلام! زورنا في المحل أو اطلب التوصيل.',
    outForDelivery: 'ثوبك في طريقه إليك الآن، متابعة التوصيل: {trackingLink}',
    delivered: 'تم تسليم طلبك بنجاح! نتمنى أن ينال إعجابك، شاركنا رأيك.',
  },
};