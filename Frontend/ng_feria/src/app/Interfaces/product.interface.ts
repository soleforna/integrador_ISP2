export interface Review {
  client_avatar: string;
  client_name: string;
  description: number;
  classification: number;
  created_at:string
}

export interface Product {
    category: number;
    created_at: string;
    description: string;
    id: number;
    image: string;
    name: string;
    price: string;
    stock:number;
    reviews: Review[]; // Utiliza el tipo Review[]
}
