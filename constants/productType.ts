import Category from './categoryType';

export default interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  category: Category;
  sizes: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
