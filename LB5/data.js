"use strict";

const events = [
    { keyword: "k1_classic", name: "K-1 классика", price: 1500, category: "kayak", kind: "classic", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=721faa57ea7a30a2054d9515aaf38153808f6eec-5147050-images-thumbs&n=13" },
    { keyword: "k1_marathon", name: "K-1 марафон", price: 2000, category: "kayak", kind: "marathon", count: "3000 м", image: "https://yastatic.net/naydex/yandex-search/js8Rht903/52fd94F4j/B-g9-wkCd-Z_3cW4M7qGnRn6n9kWtErFe_Wj5ExTd6TBf4z8T46spoH9HC0urXy_2kwbd93_PvGg0_aZ50lvBwrgKOo4D3OPFpjpzQaKmrkJh7OsNrVWtDPZ_4kROlLBuBuQ4fo-IWNMVOWgyiiJY7sZZ26Jk0qx7XcE" },
    { keyword: "k1_sprint", name: "K-1 спринт", price: 1200, category: "kayak", kind: "sprint", count: "200 м", image: "https://avatars.mds.yandex.net/i?id=a6ed1d75d0d5fe7f8e2a3f742888b383d0b21507-4767164-images-thumbs&n=13" },
    { keyword: "k1_500_sprint", name: "K-1 спринт 500 м", price: 1400, category: "kayak", kind: "sprint", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=ab83ca32ea88c914ae4716fe7b612fef02c7097e-5530612-images-thumbs&n=13" },
    { keyword: "k1_1000_classic", name: "K-1 классика 1000 м", price: 1700, category: "kayak", kind: "classic", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=37997894109db2b2b39a0eb0b22f9a692a9db7d8-6951086-images-thumbs&n=13" },
    { keyword: "k1_long_marathon", name: "K-1 большой марафон", price: 2300, category: "kayak", kind: "marathon", count: "5000 м", image: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/xgnwdznffwmbkgncxxmf" },

    { keyword: "c1_classic", name: "C-1 классика", price: 1500, category: "canoe", kind: "classic", count: "500 м", image: "https://im2.kommersant.ru/Issues.photo/NEWS/2024/08/08/KMO_200417_00008_1_t222_154305.jpg" },
    { keyword: "c1_marathon", name: "C-1 марафон", price: 2000, category: "canoe", kind: "marathon", count: "250 м", image: "https://avatars.mds.yandex.net/i?id=1c476e2766420d76966226e1120acc8e0a62ca55-5386020-images-thumbs&n=13" },
    { keyword: "c1_sprint", name: "C-1 спринт", price: 1200, category: "canoe", kind: "sprint", count: "200 м", image: "https://avatars.mds.yandex.net/i?id=279bf907a9b34ba84816a9245306a519580d6a7e-6295814-images-thumbs&n=13" },
    { keyword: "c1_500_sprint", name: "C-1 спринт 500 м", price: 1400, category: "canoe", kind: "sprint", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=9f12b733ba84e95f4f6f0649a417a0dad720ebca-5171136-images-thumbs&n=13" },
    { keyword: "c1_1000_classic", name: "C-1 классика 1000 м", price: 1700, category: "canoe", kind: "classic", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=1c319bbca9242c6d9c9f5e7639e53ea8b8b05069-5177977-images-thumbs&n=13" },
    { keyword: "c1_long_marathon", name: "C-1 большой марафон", price: 2300, category: "canoe", kind: "marathon", count: "5000 м", image: "https://avatars.mds.yandex.net/i?id=b04ae0435da45884536b724797f26ff2bbf0cc1a-4841251-images-thumbs&n=13" },

    { keyword: "family_start", name: "Семейный старт", price: 1050, category: "team", kind: "family", count: "2000 м", image: "https://avatars.mds.yandex.net/i?id=ba23ccc5530d7cb10a580fa3424729024fea20c2-8906573-images-thumbs&n=13" },
    { keyword: "k2_team", name: "K-2 командная гонка", price: 1100, category: "team", kind: "pair", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=3b24d32e06f949bd6f997c68fd8c34963cd074cf8beac913-12829626-images-thumbs&n=13" },
    { keyword: "k4_relay", name: "K-4 эстафета", price: 1200, category: "team", kind: "crew", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=3ef963a27eb636e7f5693666d93bc88b9ffda6fe-5578456-images-thumbs&n=13" },
    { keyword: "k2_sprint", name: "K-2 парный спринт", price: 1300, category: "team", kind: "pair", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=1385791fefaf8021d31d8740304ae48b84483bec-16281477-images-thumbs&n=13" },
    { keyword: "k4_team", name: "K-4 командный старт", price: 1600, category: "team", kind: "crew", count: "2000 м", image: "https://avatars.mds.yandex.net/i?id=6794bc7362441d211eb8ae9c92516afc2a35ddfd-4598969-images-thumbs&n=13" },
    { keyword: "family_relay", name: "Семейная эстафета", price: 1250, category: "team", kind: "family", count: "1500 м", image: "https://avatars.mds.yandex.net/i?id=226eda12d0d5a63b56dc770bbd1480b981f334ab-13087719-images-thumbs&n=13" },

    { keyword: "relay_short_kayak", name: "Эстафета на байдарках — короткая", price: 1000, category: "relay", kind: "short", count: "4 × 200 м", image: "https://avatars.mds.yandex.net/i?id=cb5fcae5a177666ab19dedbc204536e6fa89496b-8555038-images-thumbs&n=13" },
    { keyword: "relay_short_canoe", name: "Эстафета на каноэ — короткая", price: 1000, category: "relay", kind: "short", count: "4 × 200 м", image: "https://avatars.mds.yandex.net/i?id=1fceb8a8844ace3ccc71b1a6ba958d793bd2dd9d-8219873-images-thumbs&n=13" },
    { keyword: "relay_middle_kayak", name: "Эстафета на байдарках — средняя", price: 1400, category: "relay", kind: "middle", count: "4 × 500 м", image: "https://avatars.mds.yandex.net/i?id=ea1ed65e8a41eee4e2008b913022f753d9287ef1-8185766-images-thumbs&n=13" },
    { keyword: "relay_middle_canoe", name: "Эстафета на каноэ — средняя", price: 1400, category: "relay", kind: "middle", count: "4 × 500 м", image: "https://avatars.mds.yandex.net/i?id=69f06c68778d0c11c999c5c62d8b312a007dab43-5333794-images-thumbs&n=13" },
    { keyword: "relay_long_kayak", name: "Эстафета на байдарках — длинная", price: 1800, category: "relay", kind: "long", count: "4 × 1000 м", image: "https://avatars.mds.yandex.net/i?id=254daefe7c1a0e31ebf88c24ec49b05c6dcac71d-9853136-images-thumbs&n=13" },
    { keyword: "relay_long_canoe", name: "Эстафета на каноэ — длинная", price: 1800, category: "relay", kind: "long", count: "4 × 1000 м", image: "https://avatars.mds.yandex.net/i?id=3294c743f3ba946dd624a051efecbae7f048e840-4472412-images-thumbs&n=13" },

    { keyword: "extra_beginner_200", name: "Старт для новичков 200 м", price: 700, category: "extra", kind: "beginner", count: "200 м", image: "https://avatars.mds.yandex.net/i?id=0061fcfaf8ab44d44fe7ada122c2518067fff9cc-7066046-images-thumbs&n=13" },
    { keyword: "extra_beginner_500", name: "Старт для новичков 500 м", price: 800, category: "extra", kind: "beginner", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=42c3c4e16c814402b5b73677f29711246793f7c6-4454238-images-thumbs&n=13" },
    { keyword: "extra_amateur_500", name: "Любительский старт 500 м", price: 900, category: "extra", kind: "amateur", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=4c32b84465ad19125a13ba0412a543fd82fff257-5528343-images-thumbs&n=13" },
    { keyword: "extra_amateur_1000", name: "Любительский старт 1000 м", price: 1100, category: "extra", kind: "amateur", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=ab83ca32ea88c914ae4716fe7b612fef02c7097e-5530612-images-thumbs&n=13" },
    { keyword: "extra_pro_500", name: "Профессиональный старт 500 м", price: 1500, category: "extra", kind: "pro", count: "500 м", image: "https://avatars.mds.yandex.net/i?id=bc4fb5a2160281c00db9bdf2d0fe0bfee44e44b3-5242719-images-thumbs&n=13" },
    { keyword: "extra_pro_1000", name: "Профессиональный старт 1000 м", price: 1900, category: "extra", kind: "pro", count: "1000 м", image: "https://avatars.mds.yandex.net/i?id=567ec737b5ed53fee84c492f1056f3eebf693cd0-8325116-images-thumbs&n=13" }
];

const categories = ["kayak", "canoe", "team", "relay", "extra"];
const picked = { kayak: null, canoe: null, team: null, relay: null, extra: null };
const activeFilters = { kayak: "all", canoe: "all", team: "all", relay: "all", extra: "all" };