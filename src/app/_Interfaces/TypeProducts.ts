export default interface TypeProducts {
  id?: number;
  title?: string;
  images?: string[];
  price?: number;
  description?: string;
  category?: { id?: number; name?: string; image?: string };
}
