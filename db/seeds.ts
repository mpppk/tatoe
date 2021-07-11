import db from "./index"
import { reRankItems } from "../app/ranking-items/validations"
import { CreateRankingFormModel } from "../app/rankings/validations"
import { User } from "../types"

const user: User = { id: "id1", name: "test-user1", pictureUrl: null }

const rankings: CreateRankingFormModel[] = [
  {
    title: "2020セリーグ安打数",
    description: "参考: https://npb.jp/bis/2020/stats/lb_h_c.html",
    items: [
      { title: "大島 洋平", subtitle: "146本" },
      { title: "梶谷 隆幸", subtitle: "140本" },
      { title: "近本 光司", subtitle: "139本" },
      { title: "佐野 恵太", subtitle: "132本" },
      { title: "村上 宗隆", subtitle: "130本" },
      { title: "宮﨑 敏郎", subtitle: "129本" },
      { title: "鈴木 誠也", subtitle: "129本" },
      { title: "大山 悠輔", subtitle: "122本" },
      { title: "岡本 和真", subtitle: "121本" },
      { title: "高橋 周平", subtitle: "120本" },
      { title: "丸 佳浩", subtitle: "120本" },
    ],
    ownerId: user.id,
  },
  {
    title: "ガンダム人気キャラクター",
    description: "参考: https://www.nhk.or.jp/anime/gundam/ranking/",
    items: [
      {
        title: "シャア・アズナブル（クワトロ・バジーナ／キャスバル・レム・ダイクン）",
        subtitle:
          "機動戦士ガンダム／機動戦士Zガンダム／機動戦士ガンダム逆襲のシャア／機動戦士ガンダム THE ORIGIN／機動戦士ガンダムUC",
      },
      {
        title: "アムロ・レイ",
        subtitle:
          "機動戦士ガンダム逆襲のシャア／機動戦士ガンダム／機動戦士Zガンダム／機動戦士ガンダム THE ORIGIN／機動戦士ガンダムUC",
      },
      { title: "オルガ・イツカ", subtitle: "機動戦士ガンダム 鉄血のオルフェンズ" },
      { title: "キラ・ヤマト", subtitle: "機動戦士ガンダムSEED／機動戦士ガンダムSEED DESTINY" },
      {
        title: "グラハム・エーカー（ミスター・ブシドー）",
        subtitle: "機動戦士ガンダム00／機動戦士ガンダム00 -A wakening of the Trailblazer-",
      },
      {
        title: "刹那・F・セイエイ",
        subtitle: "機動戦士ガンダム00／機動戦士ガンダム00 -A wakening of the Trailblazer-",
      },
      { title: "カミーユ・ビダン", subtitle: "機動戦士Zガンダム／機動戦士ガンダムZZ" },
      {
        title: "アナベル・ガトー",
        subtitle: "機動戦士ガンダム0083 STARDUST MEMORY／機動戦士ガンダム0083 -ジオンの残光-",
      },
      {
        title: "ハマーン・カーン",
        subtitle:
          "機動戦士Zガンダム／機動戦士ガンダムZZ／機動戦士ガンダム0083 STARDUST MEMORY／機動戦士ガンダム0083 -ジオンの残光-",
      },
      { title: "アスラン・ザラ", subtitle: "機動戦士ガンダムSEED／機動戦士ガンダムSEED DESTINY" },
      { title: "ランバ・ラル", subtitle: "機動戦士ガンダム／機動戦士ガンダム THE ORIGIN" },
    ],
    ownerId: user.id,
  },
  {
    title: "声優知名度",
    description:
      "参考: https://jp.xn--eqro0w6nu.net/directory/%E6%97%A5%E6%9C%AC%E3%81%AE%E5%A3%B0%E5%84%AA%20(%E7%B7%8F%E5%90%88)",
    items: [
      { title: "山寺宏一", subtitle: "43.4%" },
      { title: "櫻井孝宏", subtitle: "35.35%" },
      { title: "福山潤", subtitle: "32.91%" },
      { title: "水樹奈々", subtitle: "29.7%" },
      { title: "鈴村健一", subtitle: "29.68%" },
      { title: "若本規夫", subtitle: "29.36%" },
      { title: "神谷浩史", subtitle: "27.23%" },
      { title: "子安武人", subtitle: "26.76%" },
      { title: "花澤香菜", subtitle: "25.34%" },
    ],
    ownerId: user.id,
  },
  {
    title: "2016 声優知名度",
    description:
      "参考: https://jp.xn--eqro0w6nu.net/directory/%E6%97%A5%E6%9C%AC%E3%81%AE%E5%A3%B0%E5%84%AA%20(%E7%B7%8F%E5%90%88)",
    items: [
      { title: "山寺宏一", subtitle: "43.4%" },
      { title: "櫻井孝宏", subtitle: "35.35%" },
      { title: "福山潤", subtitle: "32.91%" },
      { title: "水樹奈々", subtitle: "29.7%" },
      { title: "鈴村健一", subtitle: "29.68%" },
      { title: "若本規夫", subtitle: "29.36%" },
      { title: "神谷浩史", subtitle: "27.23%" },
      { title: "子安武人", subtitle: "26.76%" },
      { title: "花澤香菜", subtitle: "25.34%" },
    ],
    ownerId: user.id,
  },
  {
    title: "2020 Spotify国内バイラルチャート",
    description:
      "参考: https://open.spotify.com/playlist/37i9dQZF1DX63PbGTNfT1W?si=Jdy--JyBROyo4tLBH_z4Hw&nd=1",
    items: [
      { title: "夜に駆ける", subtitle: "YOASOBI" },
      { title: "紅蓮華", subtitle: "LiSA" },
      { title: "猫", subtitle: "DISH//" },
      { title: "かくれんぼ", subtitle: "優里" },
      { title: "猫~~THE FIRST TAKE ver.~", subtitle: "DISH//" },
      { title: "香水", subtitle: "瑛人" },
      { title: "キンモクセイ", subtitle: "オレンジスパイニクラブ" },
      { title: "snow jam", subtitle: "Rin音, RhymeTube" },
      { title: "夜永唄", subtitle: "神はサイコロを振らない" },
      { title: "裸の心", subtitle: "あいみょん" },
      { title: "Chernobyl 2017", subtitle: "Meland x Hauken, Benjamin Beats" },
      { title: "春を告げる", subtitle: "yama" },
    ],
    ownerId: user.id,
  },
]

const seed = async () => {
  // Insert User
  await db.user.create({ data: user })

  for (let i = 0; i < rankings.length; i++) {
    const ranking = rankings[i]
    await db.ranking.create({
      data: {
        ...ranking,
        items: {
          create: reRankItems(ranking.items),
        },
      },
    })
  }
}

export default seed
