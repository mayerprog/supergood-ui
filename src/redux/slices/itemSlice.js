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
      description:
        "Кальцоне с Чоризо, куриным филе и шампиньонами SG; Калифорния лайт.",
      imageUrl: set5,
      price: 710,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "6.7",
        unit: null,
      },
      fat: {
        value: "6",
        unit: null,
      },
      carbo: {
        value: "23",
        unit: null,
      },
      kcal: {
        value: "173",
        unit: null,
      },
      weightout: {
        value: "623",
        unit: "г",
      },
    },
    {
      id: 2,
      category: "Наборы",
      name: "Сет №6",
      description:
        "Пицца Пепперони SG на пышном тесте; Филадельфия с креветкой.",
      imageUrl: set6,
      price: 810,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "8",
        unit: null,
      },
      fat: {
        value: "7.2",
        unit: null,
      },
      carbo: {
        value: "22.7",
        unit: null,
      },
      kcal: {
        value: "187",
        unit: null,
      },
      weightout: {
        value: "615",
        unit: "г",
      },
    },
    {
      id: 3,
      category: "Пицца",
      name: "Пицца Пепперони SG на пышном тесте",
      description:
        "Состав:мука пшеничная хлебопекарская в/с, дрожжи хлебопекарские сухие, масло растительное рафинированное,сахар-песок, соль поваренная пищевая, вода питьевая, пицца-соус, Моцарелла для пиццы, колбаса Пепперони.  ",
      imageUrl: pepperoni,
      price: 490,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "9.8",
        unit: null,
      },
      fat: {
        value: "11.2",
        unit: null,
      },
      carbo: {
        value: "26.6",
        unit: null,
      },
      kcal: {
        value: "246",
        unit: null,
      },
      weightout: {
        value: "340",
        unit: "г",
      },
    },
    {
      id: 4,
      category: "Пицца",
      name: "Кальцоне с Чоризо, куриным филе и шампиньонами SG",
      description:
        "колбаса Чоризо, куриное филе, шампиньоны свежие, сыр Моцарелла, огурцы маринованные, лук красный, чеснок, соус чили сладкий, томатная паста, мука, дрожжи, сахарный песок, соль, масло подсолнечное, орегано, базилик.  ",

      imageUrl: chorizo,
      price: 710,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "7.6",
        unit: null,
      },
      fat: {
        value: "6.8",
        unit: null,
      },
      carbo: {
        value: "29.1",
        unit: null,
      },
      kcal: {
        value: "206",
        unit: null,
      },
      weightout: {
        value: "455",
        unit: "г",
      },
    },
    {
      id: 5,
      category: "Пицца",
      name: "Пицца Цезарь SG на пышном тесте",
      description:
        "куриное филе, сыр моцарелла, сыр пармезан, яйцо, анчоусы, каперсы, лук репчатый, чеснок, лимоны, салат романо, помидоры, мука, крупа манная, дрожжи, сахарный песок, масло подсолнечное, соус тобаско, соус ворчестер, горчица дижонская, майонез, перец черный молотый, соль, сметана, кнорр грибной. ",

      imageUrl: cesar,
      price: 1370,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "7.6",
        unit: null,
      },
      fat: {
        value: "8.5",
        unit: null,
      },
      carbo: {
        value: "20.7",
        unit: null,
      },
      kcal: {
        value: "192",
        unit: null,
      },
      weightout: {
        value: "1138",
        unit: "г",
      },
    },
    {
      id: 6,
      category: "Пицца",
      name: "Пицца Фермерская SG на пышном тесте",
      description:
        "Состав:мука пшеничная хлебопекарская в/с, дрожжи хлебопекарские сухие, масло растительное рафинированное, сахар-песок,соль поваренная пищевая, вода питьевая, соус Техасский барбекю, Моцарелла для пиццы, лук красный св, колбаса Салями, ветчина, огурцы маринованные. Не содержит ГМО. ",

      imageUrl: fermer,
      price: 1050,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "5.9",
        unit: null,
      },
      fat: {
        value: "6.8",
        unit: null,
      },
      carbo: {
        value: "20.9",
        unit: null,
      },
      kcal: {
        value: "169",
        unit: null,
      },
      weightout: {
        value: "982",
        unit: "г",
      },
    },
    {
      id: 7,
      category: "Паста",
      name: "Спагетти Болоньезе",
      description:
        "Говядина, спагетти, сыр пармезан, помидоры черри, лук репчатый, чеснок, морковь, томаты в собственном соку, томатная паста, масло подсолнечное, сахарный песок, соль, перец черный молотый, петрушка, укроп, базилик, орегано, сельдеоей, соус Шрирача",

      imageUrl: bolognese,
      price: 370,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "6.9",
        unit: null,
      },
      fat: {
        value: "6.7",
        unit: null,
      },
      carbo: {
        value: "13.9",
        unit: null,
      },
      kcal: {
        value: "147",
        unit: null,
      },
      weightout: {
        value: "215",
        unit: "г",
      },
    },
    {
      id: 8,
      category: "Паста",
      name: "Спагетти Карбонара",
      description:
        "Говядина, спагетти, сыр пармезан, помидоры черри, лук репчатый, чеснок, морковь, томаты в собственном соку, томатная паста, масло подсолнечное, сахарный песок, соль, перец черный молотый, петрушка, укроп, базилик, орегано, сельдеоей, соус Шрирача",

      imageUrl: carbonara,
      price: 400,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "6.9",
        unit: null,
      },
      fat: {
        value: "6.7",
        unit: null,
      },
      carbo: {
        value: "13.9",
        unit: null,
      },
      kcal: {
        value: "147",
        unit: null,
      },
      weightout: {
        value: "215",
        unit: "г",
      },
    },
    {
      id: 9,
      category: "Паста",
      name: "Пармезан",
      description: null,
      imageUrl: parmesan,
      price: 370,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "0",
        unit: null,
      },
      fat: {
        value: "0",
        unit: null,
      },
      carbo: {
        value: "0",
        unit: null,
      },
      kcal: {
        value: "0",
        unit: null,
      },
      weightout: {
        value: "15",
        unit: "г",
      },
    },
    {
      id: 10,
      category: "Паста",
      name: "Паста пенне с лососем и сыром Дорблю",
      description: " ",
      imageUrl: penne,
      price: 330,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "0",
        unit: null,
      },
      fat: {
        value: "0",
        unit: null,
      },
      carbo: {
        value: "0",
        unit: null,
      },
      kcal: {
        value: "0",
        unit: null,
      },
      weightout: {
        value: "15",
        unit: "г",
      },
    },
    {
      id: 11,
      category: "Паста",
      name: "Удон с курицей, овощами и устричным соусом",
      description:
        "Куриная грудка, лапша пшеничная Удон, лук репчатый, лимон, перец болгарский, морковь, цуккини, баклажаны, чеснок, лук зеленый, салат айсберг, кунжут, масло кунжутное, масло подсолнечное, соус устричный, соус соевый, соль, перец черный молотый",
      imageUrl: udon,
      price: 470,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "10.1",
        unit: null,
      },
      fat: {
        value: "9.4",
        unit: null,
      },
      carbo: {
        value: "18",
        unit: null,
      },
      weightout: {
        value: "240",
        unit: "г",
      },
      kcal: {
        value: "197",
        unit: null,
      },
    },
    {
      id: 12,
      category: "Салаты",
      name: "Соус Цезарь",
      description: null,
      imageUrl: cesarSauce,
      price: 70,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "10.1",
        unit: null,
      },
      fat: {
        value: "9.4",
        unit: null,
      },
      carbo: {
        value: "18",
        unit: null,
      },
      weightout: {
        value: "240",
        unit: "г",
      },
      kcal: {
        value: "166",
        unit: null,
      },
    },
    {
      id: 13,
      category: "Салаты",
      name: "Цезарь с курицей",
      description:
        "Грудка куриная, яйцо, лук репчатый, помидоры черри, чеснок, сыр пармезан, хлеб тостовый, каперсы, анчоусы, лимоны, салат романо, соус ворчестер, соус тобаско, горчица дижонская, масло подсолнечное, паприка молотая, перец черный молотый, соль",
      imageUrl: cesarSalad,
      price: 570,

      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "10.7",
        unit: null,
      },
      fat: {
        value: "8.9",
        unit: null,
      },
      carbo: {
        value: "11.4",
        unit: null,
      },
      kcal: {
        value: "166",
        unit: null,
      },
      weightout: {
        value: "215",
        unit: "г",
      },
    },
    {
      id: 14,
      category: "Салаты",
      name: "Салат Мимоза",
      description:
        "Грудка куриная, яйцо, лук репчатый, помидоры черри, чеснок, сыр пармезан, хлеб тостовый, каперсы, анчоусы, лимоны, салат романо, соус ворчестер, соус тобаско, горчица дижонская, масло подсолнечное, паприка молотая, перец черный молотый, соль",

      imageUrl: mimosa,
      price: 370,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "10.7",
        unit: null,
      },
      fat: {
        value: "8.9",
        unit: null,
      },
      carbo: {
        value: "11.4",
        unit: null,
      },
      kcal: {
        value: "166",
        unit: null,
      },
      weightout: {
        value: "215",
        unit: "г",
      },
    },
    {
      id: 15,
      category: "Салаты",
      name: "Салат Оливье с курицей",
      description:
        "Курицв, картофель, морковь, лук репчатый, горошек зеленый, огурцы соленые, яйцо, петрушка, укроп, салат Айсберг, майонез, соль\r\n",

      imageUrl: olivier,
      price: 200,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "5.4",
        unit: null,
      },
      fat: {
        value: "16.7",
        unit: null,
      },
      kcal: {
        value: "198",
        unit: null,
      },
      weightout: {
        value: "300",
        unit: "г",
      },
      carbo: {
        value: "7.1",
        unit: null,
      },
    },
    {
      id: 16,
      category: "Салаты",
      name: "Винегрет",
      description:
        "Курицв, картофель, морковь, лук репчатый, горошек зеленый, огурцы соленые, яйцо, петрушка, укроп, салат Айсберг, майонез, соль\r\n",
      imageUrl: vinegret,
      price: 170,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "5.4",
        unit: null,
      },
      fat: {
        value: "16.7",
        unit: null,
      },
      kcal: {
        value: "198",
        unit: null,
      },
      weightout: {
        value: "200",
        unit: "г",
      },
      carbo: {
        value: "20.1",
        unit: null,
      },
    },
    {
      id: 17,
      category: "Роллы",
      name: "Авокадо ролл",
      description: " рис гарнирный, авокадо св, водоросли нори.",
      imageUrl: avo,
      price: 380,
      amount: {
        value: "1",
        unit: null,
      },
      weightout: {
        value: "100",
        unit: "г",
      },

      fat: {
        value: "5.3",
        unit: null,
      },
      protein: {
        value: "2.1",
        unit: null,
      },
      carbo: {
        value: "20.1",
        unit: null,
      },
      kcal: {
        value: "140",
        unit: null,
      },
    },
    {
      id: 18,
      category: "Роллы",
      name: "Канадиан",
      description: " рис гарнирный, авокадо св, водоросли нори.",
      imageUrl: canadian,
      price: 390,
      amount: {
        value: "1",
        unit: null,
      },
      weightout: {
        value: "100",
        unit: "г",
      },

      fat: {
        value: "5.3",
        unit: null,
      },
      protein: {
        value: "2.1",
        unit: null,
      },
      carbo: {
        value: "20.1",
        unit: null,
      },
      kcal: {
        value: "140",
        unit: null,
      },
    },
    {
      id: 19,
      category: "Роллы",
      name: "Ролл Филадельфия",
      description:
        "Рис, семга, авокадо, огурцы свежие, сыр сливочный, сахарный песок, соль, уксус рисовый, водоросли Нори, васаби, имбирь маринованный",
      imageUrl: fila,
      price: 460,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "6.9",
        unit: null,
      },
      fat: {
        value: "9.9",
        unit: null,
      },
      carbo: {
        value: "16.1",
        unit: null,
      },
      kcal: {
        value: "182",
        unit: null,
      },
      weightout: {
        value: "220",
        unit: "г",
      },
    },
    {
      id: 20,
      category: "Роллы",
      name: "Креветка Хит ролл",
      description:
        "рис гарнирный, майонез, огурцы св, икра масаго, креветки тигровые, водоросли нори, масло растительное рафинированное, кляр, сухари панировочные.",

      imageUrl: hitRoll,
      price: 560,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "6",
        unit: null,
      },
      fat: {
        value: "12.4",
        unit: null,
      },
      carbo: {
        value: "21",
        unit: null,
      },
      kcal: {
        value: "224",
        unit: null,
      },
      weightout: {
        value: "173",
        unit: "г",
      },
    },
    {
      id: 21,
      category: "Роллы",
      name: "Соевый соус",
      description: " ",
      imageUrl: soySauce,
      price: 500,
      protein: {
        value: "0",
        unit: null,
      },
      fat: {
        value: "0",
        unit: null,
      },
      carbo: {
        value: "0",
        unit: null,
      },
      kcal: {
        value: "0",
        unit: null,
      },
      weightout: {
        value: "40",
        unit: "г",
      },
    },
    {
      id: 22,
      category: "Супы",
      name: "Борщ",
      description:
        "Говядина, морковь, лук репчатый, свекла, картофель, капуста, томатная паста, чеснок, петрушка, укроп, уксус столовый, масло подсолнечное, сметана, лавровый лист, перец черный, сахарный песок, соль",

      imageUrl: null,
      price: 400,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 23,
      category: "Домашняя еда",
      name: "Котлетки",
      price: 100,
      description:
        "Говядина, морковь, лук репчатый, свекла, картофель, капуста, томатная паста, чеснок, петрушка, укроп, уксус столовый, масло подсолнечное, сметана, лавровый лист, перец черный, сахарный песок, соль",
      imageUrl: null,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 24,
      category: "Фитнес меню",
      name: "ПП котлетки",
      description:
        "Говядина, морковь, лук репчатый, свекла, картофель, капуста, томатная паста, чеснок, петрушка, укроп, уксус столовый, масло подсолнечное, сметана, лавровый лист, перец черный, сахарный песок, соль",
      imageUrl: null,
      price: 490,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 25,
      category: "Сэндвичи",
      name: "Сэндвич с бужениной, томатами, солеными огурчиками и медово-горчичным соусом",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 480,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "7.1",
        unit: null,
      },
      fat: {
        value: "8.9",
        unit: null,
      },
      carbo: {
        value: "24.1",
        unit: null,
      },
      kcal: {
        value: "208",
        unit: null,
      },
      weightout: {
        value: "215",
        unit: "г",
      },
    },
    {
      id: 26,
      category: "Завтрак",
      name: "Шакшука",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 410,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 27,
      category: "Кулинария",
      name: "Плюшки",
      description: null,
      imageUrl: null,
      price: 120,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "0",
        unit: null,
      },
      fat: {
        value: "0",
        unit: null,
      },
      carbo: {
        value: "0",
        unit: null,
      },
      kcal: {
        value: "0",
        unit: null,
      },
      weightout: {
        value: "40",
        unit: "г",
      },
    },
    {
      id: 28,
      category: "Хлеб",
      name: "Бородинский хлеб",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 60,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 29,
      category: "Сладкое",
      name: "Пирожное",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 250,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 30,
      category: "Напитки",
      name: "Кола",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 150,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 31,
      category: "Кофе и чай",
      name: "Капучино",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 80,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
    {
      id: 32,
      category: "Корпоративное меню",
      name: "Котлетки",
      description:
        "Хлеб тостовый, свинина, помидоры, огурцы соленые, салат айсберг, лук зеленый, перец черный, паприка, чеснок, масло подсолнечное, соль, мед, майонез, горчица зернистая. Подается комнатной температуры",
      imageUrl: null,
      price: 250,
      amount: {
        value: "1",
        unit: null,
      },
      protein: {
        value: "2.6",
        unit: null,
      },
      fat: {
        value: "3.4",
        unit: null,
      },
      carbo: {
        value: "1.6",
        unit: null,
      },
      kcal: {
        value: "47",
        unit: null,
      },
      weightout: {
        value: "330",
        unit: "г",
      },
    },
  ],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {},
  },
});

export const { setItems } = itemSlice.actions;

export default itemSlice.reducer;
