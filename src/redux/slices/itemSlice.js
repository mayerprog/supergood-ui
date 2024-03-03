import { createSlice } from "@reduxjs/toolkit";
import set5 from "../../assets/images/sets/set5.jpg";
import set6 from "../../assets/images/sets/set6.jpg";
import cesar from "../../assets/images/pizza/cesar.jpg";
import chorizo from "../../assets/images/pizza/chorizo.jpg";
import fermer from "../../assets/images/pizza/fermer.jpg";
import pepperoni from "../../assets/images/pizza/pepperoni.jpg";
import bolognese from "../../assets/images/pasta/bolognese.jpg";
import carbonara from "../../assets/images/pasta/carbonara.jpg";
import parmesan from "../../assets/images/pasta/parmesan.jpg";
import penne from "../../assets/images/pasta/penne.jpg";
import udon from "../../assets/images/pasta/udon.jpg";
import cesarSauce from "../../assets/images/salads/cesar-sauce.jpg";
import cesarSalad from "../../assets/images/salads/cesar.jpg";
import mimosa from "../../assets/images/salads/mimosa.jpg";
import olivier from "../../assets/images/salads/olivier.jpg";
import vinegret from "../../assets/images/salads/vinegret.jpg";
import avo from "../../assets/images/sushi/avo.jpg";
import canadian from "../../assets/images/sushi/canadian.jpg";
import fila from "../../assets/images/sushi/fila.jpg";
import hitRoll from "../../assets/images/sushi/hit-roll.jpg";
import soySauce from "../../assets/images/sushi/soy-sauce.jpg";

const initialState = {
  items: [
    {
      id: 1,
      category: "Наборы",
      name: "Сет №5",
      imageUrl: set5,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 2,
      category: "Наборы",
      name: "Сет №6",
      imageUrl: set6,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 3,
      category: "Пицца",
      name: "Пицца Пепперони SG на пышном тесте",
      imageUrl: pepperoni,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 4,
      category: "Пицца",
      name: "Кальцоне с Чоризо, куриным филе и шампиньонами SG",
      imageUrl: chorizo,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 5,
      category: "Пицца",
      name: "Пицца Цезарь SG на пышном тесте",
      imageUrl: cesar,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 6,
      category: "Пицца",
      name: "Пицца Фермерская SG на пышном тесте",
      imageUrl: fermer,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 7,
      category: "Паста",
      name: "Спагетти Болоньезе",
      imageUrl: bolognese,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 8,
      category: "Паста",
      name: "Спагетти Карбонара",
      imageUrl: carbonara,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 9,
      category: "Паста",
      name: "Пармезан",
      imageUrl: parmesan,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 10,
      category: "Паста",
      name: "Паста пенне с лососем и сыром Дорблю",
      imageUrl: penne,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 11,
      category: "Паста",
      name: "Удон с курицей, овощами и устричным соусом",
      imageUrl: udon,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 12,
      category: "Салаты",
      name: "Соус Цезарь",
      imageUrl: cesarSauce,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 13,
      category: "Салаты",
      name: "Цезарь с курицей",
      imageUrl: cesarSalad,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 14,
      category: "Салаты",
      name: "Салат Мимоза",
      imageUrl: mimosa,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 15,
      category: "Салаты",
      name: "Салат Оливье с курицей",
      imageUrl: olivier,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 16,
      category: "Салаты",
      name: "Винегрет",
      imageUrl: vinegret,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 17,
      category: "Роллы",
      name: "Авокадо ролл",
      imageUrl: avo,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 18,
      category: "Роллы",
      name: "Канадиан",
      imageUrl: canadian,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 19,
      category: "Роллы",
      name: "Ролл Филадельфия",
      imageUrl: fila,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 20,
      category: "Роллы",
      name: "Креветка Хит ролл",
      imageUrl: hitRoll,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 21,
      category: "Роллы",
      name: "Соевый соус",
      imageUrl: soySauce,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 22,
      category: "Супы",
      name: "Борщ",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 23,
      category: "Домашняя еда",
      name: "Котлетки",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 24,
      category: "Фитнес меню",
      name: "ПП котлетки",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 25,
      category: "Сэндвичи",
      name: "Сэндвич с ветчиной",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 26,
      category: "Завтрак",
      name: "Шакшука",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 27,
      category: "Кулинария",
      name: "Плюшки",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 28,
      category: "Хлеб",
      name: "Бородинский хлеб",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 29,
      category: "Сладкое",
      name: "Пирожное",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 30,
      category: "Напитки",
      name: "Кола",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 31,
      category: "Кофе и чай",
      name: "Капучино",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
    {
      id: 32,
      category: "Корпоративное меню",
      name: "Котлетки",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
    },
  ],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items.map((item, index) => {
        item.amount = 0;
      });
      console.log("items", state.items);
    },
  },
});

export const { setItems } = itemSlice.actions;

export default itemSlice.reducer;
