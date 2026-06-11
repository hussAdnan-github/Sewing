export interface SavedMeasurements {
  totalLength: number;
  shoulderWidth: number;
  sleeveLength: number;
  wristWidth: number;
  neckCircumference: number;
  chestWidth: number;
  bottomOpening: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  city: string;
  savedMeasurements: SavedMeasurements;
  joinedAt: string;
}

export const userProfile: UserProfile = {
  id: 'user-001',
  name: 'أحمد محمد العتيبي',
  phone: '0501234567',
  email: 'ahmed.otaibi@email.com',
  avatar: 'https://readdy.ai/api/search-image?query=Middle%20eastern%20man%20in%20traditional%20white%20thobe%20portrait%20headshot%20neutral%20background%20warm%20natural%20lighting%20professional%20photography&width=400&height=400&seq=100&orientation=squarish',
  city: 'الرياض',
  savedMeasurements: {
    totalLength: 145,
    shoulderWidth: 48,
    sleeveLength: 60,
    wristWidth: 18,
    neckCircumference: 42,
    chestWidth: 56,
    bottomOpening: 70,
  },
  joinedAt: '2025-09-01',
};