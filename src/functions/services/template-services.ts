import { Product } from "../../components/entities/Product";
import { APIGetClient, APIPostClient } from "./api-client";

export interface TemplateProduct {
  productId: Product;
  stock: number;
  selectedUnit: number;
}

interface PostTemplateProduct {
  productId: string;
  stock: number;
  selectedUnit: number;
}

export interface PostTemplate {
  _id?: string;
  products: PostTemplateProduct[];
  templateName: string;
}

export interface Template {
  _id?: string;
  product: TemplateProduct[];
  templateName: string;
}

const getAllTemplates = new APIGetClient<Template>("/billing/importTemplate");
const postTemplate = new APIPostClient<PostTemplate>("/billing/createTemplate");

export { getAllTemplates, postTemplate };
