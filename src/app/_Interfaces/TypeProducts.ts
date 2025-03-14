export default interface TypeProducts {
  title?: string;
  images?: string[] | undefined;
  price?: number;
  description?: string;
  category?: { id?: number; name?: string; image?: string };
}
