import { Product } from "@/generated/prisma"

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image:string;
  products?: Product[];
}


export interface Icategories {
  categorias: ICategory[];
}