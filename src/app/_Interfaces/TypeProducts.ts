export default interface TypeProducts {
  _id?: number;
  id?: number;
  title?: string;
  images?: string[];
  price?: number;
  description?: string;
  category?: { id?: number; name?: string; image?: string };
  count?: number;
  stock?: number;
  DisPercentage?: number;
  PriceAfterDis?: number;
}
