export interface Category {
  _id?: string;
  pid?: string;
  name: string;
  children?: Category[];
}
