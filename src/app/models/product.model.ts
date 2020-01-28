export interface IProduct {
  _id: string;
  mainInfo: IProductMainInfo;
  ingredientInfo: IProductIngredientInfo;

  isReviewed: boolean;
  reviews: IProductReview[];
  last3comments: IProductComment[];
  commentCount: number;
  createdBy: string;
}

export interface IFavProduct {
  _id: string;
  mainInfo: IProductMainInfo;
  ingredientInfo: IProductIngredientInfo;
}

interface IProductMainInfo {
  barcode: string;
  name?: string;
  imagePath: string;
  createdAt: Date;
  createdTimeStamp: number;
  updatedAt: Date;
}

export interface IProductIngredientInfo {
  ingredientsImagePath: string;
  isAlcoholFree: boolean | null;
  isVegan: boolean | null;
  isVegetarian: boolean | null;
  isHaveFlavor: boolean | null;
}

export interface IProductReview {
  owner: string;
  content: string;
  createdAt: Date;
}

export interface IProductComment {
  owner: string;
  content: string;
  createdAt: Date;
}
