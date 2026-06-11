export interface CartItem {
  id: string;
  type: 'fabric' | 'tailoring';
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
  details?: string;
}

export const cartItems: CartItem[] = [
  {
    id: 'cart-1',
    type: 'fabric',
    name: 'جورجيت فاخر',
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20georgette%20fabric%20in%20nude%20beige%20color%20displayed%20on%20wooden%20surface%20with%20soft%20lighting%20and%20elegant%20draping%20elegant%20tailoring%20shop%20setting%20high%20quality%20product%20photography&width=600&height=800&seq=1&orientation=portrait',
    price: 45,
    quantity: 3.5,
    unit: 'متر',
    details: 'بيج · 3.5 متر',
  },
  {
    id: 'cart-2',
    type: 'tailoring',
    name: 'تفصيل ثوب سعودي',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Saudi%20thobe%20garment%20flat%20lay%20on%20elegant%20beige%20background%20with%20subtle%20embroidery%20details%20tailoring%20design%20reference%20image%20clean%20minimal%20high%20quality&width=500&height=600&seq=11&orientation=portrait',
    price: 120,
    quantity: 1,
    unit: 'ثوب',
    details: 'ياقة مستديرة · جيب جانبي · كمسادة',
  },
  {
    id: 'cart-3',
    type: 'fabric',
    name: 'قطن مصري عالي الجودة',
    image: 'https://readdy.ai/api/search-image?query=Premium%20Egyptian%20cotton%20fabric%20in%20pure%20white%20color%20rolled%20on%20table%20in%20tailoring%20shop%20with%20warm%20natural%20lighting%20soft%20texture%20close%20up%20high%20quality%20product%20photography&width=600&height=800&seq=2&orientation=portrait',
    price: 28,
    quantity: 7,
    unit: 'متر',
    details: 'أبيض · 7 أمتار (2 ثوب)',
  },
];

export const shippingCost = 25;