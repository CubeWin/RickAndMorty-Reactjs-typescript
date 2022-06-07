type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// eslint-disable-next-line no-shadow
export enum TypesExp {
  Create = 'CREATE_PRODUCT',
  Delete = 'DELETE_PRODUCT',
  Add = 'ADD_PRODUCT',
}

// Product

type ProductType = {
  id: number;
  name: string;
  price: number;
};

type ProductPayload = {
  [TypesExp.Create]: {
    id: number;
    name: string;
    price: number;
  };
  [TypesExp.Delete]: {
    id: number;
  };
};

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: ProductActions | ShoppingCartActions
) => {
  switch (action.type) {
    case TypesExp.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ];
    case TypesExp.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)];
    default:
      return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [TypesExp.Add]: undefined;
};

export type ShoppingCartActions =
  ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: ProductActions | ShoppingCartActions
) => {
  switch (action.type) {
    case TypesExp.Add:
      return state + 1;
    default:
      return state;
  }
};
