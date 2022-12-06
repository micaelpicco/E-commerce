import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_SIZES,
  ORDER_PRODUCTS_BY_NAME,
  FILTER_PRODUCTS,
  CREATE_USER,
  GET_PRODUCTS_CART,
  CREATE_PUBLICATION,
  EMPTY_DETAIL,
  GET_FAVORITES,
  ADD_TO_FAVORITES,
  DELETE_FAVORITE,
  LOGIN_USER,
  ADD_TO_CART,
  CLEAR_CART,
  GET_REVIEWS_PRODUCT_DETAIL,
  FLUSH_ERROR,
  GET_SELLS_HISTORY,
  GET_SELL_DETAIL,
  CREATE_REVIEW_PRODUCT,
  BUY_PRODUCT,
  CLEAR_FAVORITES,
  HISTORIAL_PRODUCT,
  CLEAR_LINK,
  GET_DEMOGRAPHICS,
  DEL_PRODUCT_CART,
  CLEAR_ACTIONS,
  GET_SELLS_HISTORY_STADISTICS,
  USER_REVIEWS,
} from "../action-types";

const initialState = {
  products: [],
  demographic: [],
  productDetail: [],
  productReviews: [],
  userReviews: [],
  sizes: [],
  productsStatus: "Cargando productos...",
  Status: "Cargando...",
  favorites: [],
  loginError: null,
  cart: [],
  sellsHistory: [],
  sellsStadistics: [],
  sellDetail: {},
  linkCompra: "",
  historial: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_DEMOGRAPHICS: {
      return {
        ...state,
        demographic: action.payload,
      };
    }
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_REVIEWS_PRODUCT_DETAIL:
      return {
        ...state,
        productReviews: action.payload,
      };
    case EMPTY_DETAIL:
      return {
        ...state,
        productDetail: [],
      };
    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload,
      };
    case ORDER_PRODUCTS_BY_NAME:
      return {
        ...state,
        products: state.products.sort((a, b) => {
          if (action.payload === "A-Z") {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
            return 0;
          } else {
            if (b.name < a.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          }
        }),
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        productsStatus: !action.payload.length
          ? "No se encontraron productos"
          : "Cargando productos...",
        products: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
      };
    case CREATE_PUBLICATION:
      return {
        ...state,
      };
    case ADD_TO_FAVORITES:
      let newFavorite = state.products.find((p) => p.id === action.payload);
      let productInFav = state.favorites.find((f) => f.id === newFavorite.id);
      return !productInFav
        ? {
            ...state,
            favorites: [...state.favorites, newFavorite],
          }
        : state;
    case DELETE_FAVORITE:
      let delFav = state.favorites.filter((f) => f.id !== action.payload);
      return {
        ...state,
        favorites: delFav,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginError: action.payload,
      };
    case GET_PRODUCTS_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }

    case DEL_PRODUCT_CART:
      let deletedProduct = state.cart.filter(
        (c) => c.variantID !== action.payload
      );
      return {
        ...state,
        cart: deletedProduct,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };
    case FLUSH_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    case GET_SELLS_HISTORY:
      return {
        ...state,
        sellsHistory: action.payload,
      };
    case GET_SELLS_HISTORY_STADISTICS:
      return {
        ...state,
        sellsStadistics: action.payload,
      };
    case GET_SELL_DETAIL:
      return {
        ...state,
        sellDetail: action.payload,
      };
    case CREATE_REVIEW_PRODUCT:
      return {
        ...state,
      };
    case BUY_PRODUCT:
      return {
        ...state,
        linkCompra: action.payload,
      };
    case HISTORIAL_PRODUCT:
      return {
        ...state,
        historial: action.payload,
      };
    case CLEAR_LINK:
      return {
        ...state,
        linkCompra: "",
      };
    case CLEAR_ACTIONS:
      return {
        ...state,
        productReviews: [],
      };
    case USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
