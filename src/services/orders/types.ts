export interface ProductItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  products: ProductItem[];
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  recipient: string;
}
