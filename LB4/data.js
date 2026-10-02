"use strict";

const dishes = [
    {
        keyword: "k1_classic",
        name: "K-1 классика",
        price: 1500,
        category: "kayak",
        count: "500 м",
        image: "https://avatars.mds.yandex.net/i?id=721faa57ea7a30a2054d9515aaf38153808f6eec-5147050-images-thumbs&n=13"
    },
    {
        keyword: "k1_marathon",
        name: "K-1 марафон",
        price: 2000,
        category: "kayak",
        count: "3000 м",
        image: "https://yastatic.net/naydex/yandex-search/js8Rht903/52fd94F4j/B-g9-wkCd-Z_3cW4M7qGnRn6n9kWtErFe_Wj5ExTd6TBf4z8T46spoH9HC0urXy_2kwbd93_PvGg0_aZ50lvBwrgKOo4D3OPFpjpzQaKmrkJh7OsNrVWtDPZ_4kROlLBuBuQ4fo-IWNMVOWgyiiJY7sZZ26Jk0qx7XcE"
    },
    {
        keyword: "k1_sprint",
        name: "K-1 спринт",
        price: 1200,
        category: "kayak",
        count: "200 м",
        image: "https://avatars.mds.yandex.net/i?id=ab83ca32ea88c914ae4716fe7b612fef02c7097e-5530612-images-thumbs&n=13"
    },
    {
        keyword: "c1_classic",
        name: "C-1 классика",
        price: 1500,
        category: "canoe",
        count: "500 м",
        image: "https://im2.kommersant.ru/Issues.photo/NEWS/2024/08/08/KMO_200417_00008_1_t222_154305.jpg"
    },
    {
        keyword: "c1_marathon",
        name: "C-1 марафон",
        price: 2000,
        category: "canoe",
        count: "250 м",
        image: "https://avatars.mds.yandex.net/i?id=1c476e2766420d76966226e1120acc8e0a62ca55-5386020-images-thumbs&n=13"
    },
    {
        keyword: "c1_sprint",
        name: "C-1 спринт",
        price: 1200,
        category: "canoe",
        count: "200 м",
        image: "https://avatars.mds.yandex.net/i?id=279bf907a9b34ba84816a9245306a519580d6a7e-6295814-images-thumbs&n=13"
    },
    {
        keyword: "family_start",
        name: "Семейный старт",
        price: 1050,
        category: "team",
        count: "2000 м",
        image: "https://avatars.mds.yandex.net/i?id=ba23ccc5530d7cb10a580fa3424729024fea20c2-8906573-images-thumbs&n=13"
    },
    {
        keyword: "k2_team",
        name: "K-2 командная гонка",
        price: 1100,
        category: "team",
        count: "1000 м",
        image: "https://avatars.mds.yandex.net/i?id=1385791fefaf8021d31d8740304ae48b84483bec-16281477-images-thumbs&n=13"
    },
    {
        keyword: "k4_relay",
        name: "K-4 эстафета",
        price: 1200,
        category: "team",
        count: "1000 м",
        image: "https://avatars.mds.yandex.net/i?id=6794bc7362441d211eb8ae9c92516afc2a35ddfd-4598969-images-thumbs&n=13"
    }
];

const picked = {
    kayak: null,
    canoe: null,
    team: null
};
