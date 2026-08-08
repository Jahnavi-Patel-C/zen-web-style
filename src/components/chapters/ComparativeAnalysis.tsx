import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { ChapterShell, ChapterRule, ChapterAnnotation } from "./ChapterShell";

const BORDER = "rgba(245,241,232,0.14)";
const LINE = "rgba(245,241,232,0.10)";
const ANNO = "rgba(245,241,232,0.12)";
const INK = "#F5F1E8";
const ACCENT = "#A98E7A";
const EASE = [0.22, 1, 0.36, 1] as const;
/* ~800ms, critically damped — no bounce */
const SPRING = { stiffness: 62, damping: 22, mass: 1 } as const;

type MV = MotionValue<number>;

/* ---------------- blueprint background ---------------- */

function BlueprintBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,232,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,241,232,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute inset-y-0 left-[7%] w-px opacity-[0.05] bg-[rgba(245,241,232,0.8)]" />
      <div className="absolute inset-y-0 right-[7%] w-px opacity-[0.05] bg-[rgba(245,241,232,0.8)]" />
      <div className="absolute inset-x-0 top-24 flex justify-between px-[7%] opacity-[0.05]">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-px bg-[rgba(245,241,232,0.9)]" style={{ height: i % 4 === 0 ? 14 : 7 }} />
        ))}
      </div>
      <div className="absolute right-[3%] top-[10%] text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.14)]">
        Sheet 04 / Comparison
      </div>
    </div>
  );
}

/* ---------------- morph text primitive ---------------- */

/** One text node whose size/weight morphs and whose label swaps between modes. */
function MorphText({
  t,
  a,
  b,
  size,
  weight = 400,
  tracking = [0, 0],
  color = "rgba(245,241,232,0.72)",
  className = "",
  serif,
}: {
  t: MV;
  a: string;
  b?: string;
  size: [number, number];
  weight?: number;
  tracking?: [number, number];
  color?: string;
  className?: string;
  serif?: boolean;
}) {
  const fs = useMotionTemplate`${useTransform(t, [0, 1], size)}px`;
  const ls = useMotionTemplate`${useTransform(t, [0, 1], tracking)}em`;
  const oA = useTransform(t, [0, 0.42, 0.58, 1], [1, 1, 0, 0]);
  const oB = useTransform(t, [0, 0.42, 0.58, 1], [0, 0, 1, 1]);
  return (
    <motion.span
      className={`relative inline-block whitespace-nowrap leading-[1.25] ${serif ? "font-boska" : "font-synonym"} ${className}`}
      style={{ fontSize: fs, letterSpacing: ls, fontWeight: weight, color }}
    >
      <motion.span style={{ opacity: b ? oA : 1 }}>{a}</motion.span>
      {b ? (
        <motion.span className="absolute inset-0" style={{ opacity: oB }}>
          {b}
        </motion.span>
      ) : null}
    </motion.span>
  );
}

/** Element that only exists in the dense (Japanese) state. */
function DenseOnly({
  t,
  children,
  className = "",
  from = 6,
}: {
  t: MV;
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const opacity = useTransform(t, [0, 0.45, 1], [0, 0, 1]);
  const x = useTransform(t, [0, 1], [from, 0]);
  const display = useTransform(t, (v) => (v < 0.02 ? "none" : "flex"));
  return (
    <motion.div className={className} style={{ opacity, x, display }}>
      {children}
    </motion.div>
  );
}

function Swatch({ h, r, label }: { h: MotionValue<number>; r: MotionValue<number>; label?: string }) {
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      style={{
        height: h,
        borderRadius: r,
        background:
          "repeating-linear-gradient(135deg, rgba(245,241,232,0.055) 0 6px, rgba(245,241,232,0.025) 6px 12px)",
        border: `1px solid ${LINE}`,
      }}
    >
      {label ? (
        <span className="absolute bottom-1 left-1.5 font-synonym text-[7px] tracking-[0.2em] uppercase text-[rgba(245,241,232,0.35)]">
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}

/* ---------------- content model ---------------- */

const NAV_A = ["Home", "Shop", "Offers", "Support"];
const NAV_B = ["ホーム", "商品一覧", "キャンペーン", "サポート"];
const NAV_EXTRA = ["会員登録", "お知らせ", "採用情報", "店舗検索", "よくある質問"];
const UTIL = ["個人のお客さま", "法人のお客さま", "IR情報", "English", "文字サイズ 小 中 大", "サイトマップ"];

const CARDS = [
  { a: "Everyday Essentials", b: "日用品・生活雑貨", price: "₹ 1,299", jp: "¥ 2,480", tag: "新着" },
  { a: "Home & Kitchen", b: "ホーム＆キッチン", price: "₹ 2,499", jp: "¥ 3,980", tag: "限定" },
  { a: "Personal Care", b: "パーソナルケア", price: "₹ 899", jp: "¥ 1,280", tag: "人気" },
  { a: "Electronics", b: "家電・AV機器", price: "₹ 8,999", jp: "¥ 12,800", tag: "予約" },
  { a: "Stationery", b: "文房具・事務用品", price: "₹ 349", jp: "¥ 680", tag: "在庫" },
  { a: "Travel", b: "旅行・チケット", price: "₹ 4,599", jp: "¥ 7,200", tag: "特集" },
  { a: "Grocery", b: "食品・飲料", price: "₹ 599", jp: "¥ 980", tag: "定期" },
  { a: "Services", b: "各種サービス", price: "₹ 199", jp: "¥ 420", tag: "受付" },
];

const NEWS = [
  ["2026.07.14", "サービス", "夏季メンテナンスのお知らせ", "詳細"],
  ["2026.07.09", "お知らせ", "配送スケジュール変更について", "詳細"],
  ["2026.06.28", "IR", "第一四半期 決算資料を公開", "PDF"],
  ["2026.06.11", "採用", "2027年度 新卒採用エントリー開始", "詳細"],
];

const RANK = ["ランキング", "特集記事", "会員特典", "店舗情報", "サポート窓口"];

/* ---------------- the morphing interface ---------------- */

function MorphInterface({ t }: { t: MV }) {
  const pad = useTransform(t, [0, 1], [30, 12]);
  const gap = useTransform(t, [0, 1], [24, 8]);
  const navGap = useTransform(t, [0, 1], [28, 12]);
  const heroPadY = useTransform(t, [0, 1], [40, 16]);
  const imgH = useTransform(t, [0, 1], [92, 52]);
  const btnH = useTransform(t, [0, 1], [34, 22]);
  const btnPx = useTransform(t, [0, 1], [22, 10]);
  const radius = useTransform(t, [0, 1], [10, 2]);
  const sidebarW = useTransform(t, [0, 1], ["0%", "24%"]);
  const sidebarOpacity = useTransform(t, [0, 0.4, 1], [0, 0, 1]);
  const airyOpacity = useTransform(t, [0, 0.5, 1], [1, 0, 0]);
  const cardGap = useTransform(t, [0, 1], [18, 6]);
  const rowGap = useTransform(t, [0, 1], [12, 4]);
  const bodyPad = useTransform(t, [0, 1], [28, 12]);

  const padPx = useMotionTemplate`${pad}px`;
  const bodyPadPx = useMotionTemplate`${bodyPad}px`;
  const gapPx = useMotionTemplate`${gap}px`;
  const rowGapPx = useMotionTemplate`${rowGap}px`;
  const cardGapPx = useMotionTemplate`${cardGap}px`;
  const navPadY = useMotionTemplate`${useTransform(t, [0, 1], [22, 9])}px`;
  const utilH = useTransform(t, [0, 1], [0, 24]);
  const heroH = useTransform(t, [0, 1], [230, 132]);
  const cols = useTransform(t, (v) => (v > 0.5 ? "repeat(4, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))"));
  const footCols = useTransform(t, (v) => (v > 0.5 ? "repeat(6, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))"));
  const cardPad = useMotionTemplate`${useTransform(t, [0, 1], [14, 7])}px`;
  const btnPxPad = useMotionTemplate`${btnPx}px`;
  const tableH = useTransform(t, [0, 1], [0, 104]);
  const heroBadgeOpacity = useTransform(t, [0, 0.45, 1], [0, 0, 1]);
  const gridLineOpacity = useTransform(t, [0, 1], [0, 1]);

  return (
    <div className="relative flex h-full flex-col">
      {/* alignment grid becomes visible in dense mode */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: gridLineOpacity,
          backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "12.5% 100%",
          mixBlendMode: "overlay",
        }}
      />

      {/* nav */}
      <motion.div
        className="flex items-center justify-between border-b"
        style={{ borderColor: BORDER, paddingLeft: padPx, paddingRight: padPx, paddingTop: navPadY, paddingBottom: navPadY }}
      >
        <MorphText t={t} a="MERIDIAN" b="株式会社メリディアン" size={[15, 11]} weight={500} tracking={[0.2, 0.08]} color="rgba(245,241,232,0.9)" serif />
        <motion.div className="flex items-center" style={{ gap: navGap }}>
          {NAV_A.map((label, i) => (
            <MorphText key={label} t={t} a={label} b={NAV_B[i]} size={[12, 9.5]} color="rgba(245,241,232,0.66)" />
          ))}
          <DenseOnly t={t} className="items-center gap-3">
            {NAV_EXTRA.map((l) => (
              <span key={l} className="font-synonym text-[9.5px] text-[rgba(245,241,232,0.6)]">
                {l}
              </span>
            ))}
          </DenseOnly>
          <motion.div
            className="flex items-center border"
            style={{
              borderColor: BORDER,
              borderRadius: radius,
              height: btnH,
              paddingLeft: btnPxPad,
              paddingRight: btnPxPad,
            }}
          >
            <MorphText t={t} a="Sign in" b="ログイン / 会員登録" size={[11, 8.5]} color="rgba(245,241,232,0.72)" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* utility strip — dense only */}
      <motion.div
        className="flex items-center gap-4 overflow-hidden border-b px-3"
        style={{ borderColor: BORDER, height: utilH, opacity: useTransform(t, [0, 0.45, 1], [0, 0, 1]) }}
      >
        {UTIL.map((u) => (
          <span key={u} className="whitespace-nowrap font-synonym text-[8.5px] text-[rgba(245,241,232,0.5)]">
            {u}
          </span>
        ))}
      </motion.div>

      {/* body */}
      <motion.div className="flex min-h-0 flex-1" style={{ padding: bodyPadPx, gap: gapPx }}>
        <motion.div className="flex min-w-0 flex-1 flex-col" style={{ gap: gapPx }}>
          {/* hero */}
          <motion.div
            className="relative flex flex-col justify-center overflow-hidden border"
            style={{
              borderColor: BORDER,
              borderRadius: radius,
              height: heroH,
              paddingTop: useMotionTemplate`${heroPadY}px`,
              paddingBottom: useMotionTemplate`${heroPadY}px`,
              paddingLeft: padPx,
              paddingRight: padPx,
              gap: rowGapPx,
              background:
                "repeating-linear-gradient(135deg, rgba(245,241,232,0.04) 0 8px, rgba(245,241,232,0.015) 8px 16px)",
            }}
          >
            <MorphText t={t} a="Everything you need, delivered" b="くらしをもっと便利に、もっと確かに。" size={[30, 15]} weight={500} color="rgba(245,241,232,0.92)" serif />
            <MorphText t={t} a="Simple pricing. Trusted by millions." b="全国配送・当日受け取り・法人向けサービスも対応しています" size={[13, 9.5]} color="rgba(245,241,232,0.6)" />
            <DenseOnly t={t} className="gap-3">
              {["送料無料キャンペーン実施中", "会員ポイント 5倍", "24時間受付"].map((l) => (
                <span key={l} className="border px-1.5 py-[2px] font-synonym text-[8px] text-[rgba(245,241,232,0.55)]" style={{ borderColor: LINE }}>
                  {l}
                </span>
              ))}
            </DenseOnly>
            <motion.div className="mt-2 flex items-center" style={{ gap: rowGapPx }}>
              <motion.div
                className="flex items-center justify-center"
                style={{ height: btnH, paddingLeft: btnPxPad, paddingRight: btnPxPad, borderRadius: radius, background: "rgba(245,241,232,0.30)" }}
              >
                <MorphText t={t} a="Get started" b="お申し込み" size={[12, 9]} weight={500} color="rgba(23,25,29,0.9)" />
              </motion.div>
              <motion.div
                className="flex items-center justify-center border"
                style={{ height: btnH, paddingLeft: btnPxPad, paddingRight: btnPxPad, borderRadius: radius, borderColor: BORDER }}
              >
                <MorphText t={t} a="Learn more" b="資料請求" size={[12, 9]} color="rgba(245,241,232,0.7)" />
              </motion.div>
              <DenseOnly t={t} className="gap-2">
                {["店舗を探す", "見積もり", "お問い合わせ"].map((l) => (
                  <span key={l} className="border px-2 py-[3px] font-synonym text-[8.5px] text-[rgba(245,241,232,0.6)]" style={{ borderColor: LINE }}>
                    {l}
                  </span>
                ))}
              </DenseOnly>
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute right-3 top-3 font-synonym text-[8px] tracking-[0.25em] uppercase text-[rgba(245,241,232,0.4)]"
              style={{ opacity: heroBadgeOpacity }}
            >
              重要なお知らせ
            </motion.div>
          </motion.div>

          {/* section label */}
          <div className="flex items-baseline gap-3">
            <MorphText t={t} a="Popular categories" b="カテゴリから探す" size={[15, 10]} weight={500} color="rgba(245,241,232,0.85)" serif />
            <motion.div className="h-px flex-1" style={{ background: LINE }} />
            <DenseOnly t={t} className="gap-3">
              <span className="font-synonym text-[8.5px] text-[rgba(245,241,232,0.5)]">一覧を見る ＞</span>
              <span className="font-synonym text-[8.5px] text-[rgba(245,241,232,0.5)]">並び替え</span>
            </DenseOnly>
          </div>

          {/* card grid */}
          <motion.div className="grid" style={{ gap: cardGapPx, gridTemplateColumns: cols }}>
            {CARDS.map((c, i) => (
              <Card key={c.a} t={t} card={c} index={i} imgH={imgH} radius={radius} pad={cardPad} rowGap={rowGapPx} />
            ))}
          </motion.div>

          {/* news table — dense only */}
          <motion.div
            className="overflow-hidden border"
            style={{ borderColor: BORDER, borderRadius: radius, height: tableH, opacity: useTransform(t, [0, 0.5, 1], [0, 0, 1]) }}
          >
            <div className="flex items-center justify-between border-b px-3 py-[5px]" style={{ borderColor: BORDER }}>
              <span className="font-synonym text-[9px] text-[rgba(245,241,232,0.75)]">新着情報</span>
              <span className="font-synonym text-[8px] text-[rgba(245,241,232,0.45)]">すべて見る ＞</span>
            </div>
            {NEWS.map((row) => (
              <div key={row[1] + row[0]} className="grid grid-cols-[68px_54px_1fr_36px] items-center gap-2 border-b px-3 py-[5px]" style={{ borderColor: LINE }}>
                <span className="font-synonym text-[8px] text-[rgba(245,241,232,0.45)]">{row[0]}</span>
                <span className="border px-1 text-center font-synonym text-[7.5px] text-[rgba(245,241,232,0.55)]" style={{ borderColor: LINE }}>
                  {row[1]}
                </span>
                <span className="truncate font-synonym text-[8.5px] text-[rgba(245,241,232,0.68)]">{row[2]}</span>
                <span className="text-right font-synonym text-[7.5px] text-[rgba(245,241,232,0.45)]">{row[3]}</span>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ opacity: airyOpacity, height: useTransform(t, [0, 1], [28, 0]) }} />
        </motion.div>

        {/* sidebar */}
        <motion.div
          className="flex shrink-0 flex-col overflow-hidden border-l"
          style={{
            width: sidebarW,
            opacity: sidebarOpacity,
            borderColor: BORDER,
            paddingLeft: useMotionTemplate`${useTransform(t, [0, 1], [0, 10])}px`,
            gap: rowGapPx,
          }}
        >
          {RANK.map((title, i) => (
            <div key={title} className="flex flex-col gap-[3px] border-b pb-2" style={{ borderColor: LINE }}>
              <span className="font-synonym text-[9px] text-[rgba(245,241,232,0.78)]">{title}</span>
              {["最新の更新情報を掲載しています", "会員限定の特典を確認する", "詳しい条件はこちら"].slice(0, 3 - (i % 2)).map((l, j) => (
                <span key={j} className="truncate font-synonym text-[7.5px] text-[rgba(245,241,232,0.45)]">
                  ・{l}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* footer */}
      <motion.div
        className="border-t"
        style={{ borderColor: BORDER, paddingLeft: padPx, paddingRight: padPx, paddingTop: useMotionTemplate`${useTransform(t, [0, 1], [20, 8])}px`, paddingBottom: useMotionTemplate`${useTransform(t, [0, 1], [20, 8])}px` }}
      >
        <motion.div className="grid" style={{ gap: cardGapPx, gridTemplateColumns: footCols }}>
          {[
            { a: "Company", b: "会社概要", links: ["会社案内", "IR情報", "採用情報"] },
            { a: "Support", b: "サポート", links: ["よくある質問", "お問い合わせ", "配送について"] },
            { a: "Legal", b: "規約・方針", links: ["利用規約", "プライバシー", "特定商取引法"] },
            { a: "Services", b: "サービス", links: ["法人向け", "定期便", "ギフト"] },
            { a: "Stores", b: "店舗案内", links: ["店舗検索", "営業時間", "アクセス"] },
            { a: "Follow", b: "公式アカウント", links: ["ニュースレター", "アプリ", "サイトマップ"] },
          ].map((col, i) => (
            <FooterCol key={col.a} t={t} col={col} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Card({
  t,
  card,
  index,
  imgH,
  radius,
  pad,
  rowGap,
}: {
  t: MV;
  card: (typeof CARDS)[number];
  index: number;
  imgH: MotionValue<number>;
  radius: MotionValue<number>;
  pad: MotionValue<string>;
  rowGap: MotionValue<string>;
}) {
  const extra = index > 2;
  const opacity = useTransform(t, [0, 0.4, 1], extra ? [0, 0, 1] : [1, 1, 1]);
  const display = useTransform(t, (v) => (extra && v < 0.02 ? "none" : "flex"));
  const y = useTransform(t, [0, 1], [extra ? 10 : 0, 0]);
  return (
    <motion.div
      className="flex flex-col border"
      style={{
        borderColor: LINE,
        borderRadius: radius,
        padding: pad,
        gap: rowGap,
        opacity,
        display,
        y,
        background: "rgba(245,241,232,0.02)",
      }}
    >
      <Swatch h={imgH} r={radius} />
      <MorphText t={t} a={card.a} b={card.b} size={[12, 9]} weight={500} color="rgba(245,241,232,0.82)" />
      <MorphText t={t} a={card.price} b={card.jp} size={[11, 8.5]} color="rgba(245,241,232,0.58)" />
      <DenseOnly t={t} className="flex-col gap-[2px]">
        <span className="font-synonym text-[7.5px] text-[rgba(245,241,232,0.42)]">在庫あり ／ 翌日お届け</span>
        <span className="font-synonym text-[7.5px] text-[rgba(245,241,232,0.42)]">レビュー 4.6（1,284件）</span>
        <span className="w-fit border px-1 font-synonym text-[7px] text-[rgba(245,241,232,0.5)]" style={{ borderColor: LINE }}>
          {card.tag}
        </span>
      </DenseOnly>
    </motion.div>
  );
}

function FooterCol({
  t,
  col,
  index,
}: {
  t: MV;
  col: { a: string; b: string; links: string[] };
  index: number;
}) {
  const extra = index > 2;
  const opacity = useTransform(t, [0, 0.4, 1], extra ? [0, 0, 1] : [1, 1, 1]);
  const display = useTransform(t, (v) => (extra && v < 0.02 ? "none" : "flex"));
  return (
    <motion.div className="flex flex-col gap-[3px]" style={{ opacity, display }}>
      <MorphText t={t} a={col.a} b={col.b} size={[11, 8.5]} weight={500} color="rgba(245,241,232,0.72)" />
      <DenseOnly t={t} className="flex-col gap-[2px]">
        {col.links.map((l) => (
          <span key={l} className="font-synonym text-[7.5px] text-[rgba(245,241,232,0.45)]">
            {l}
          </span>
        ))}
      </DenseOnly>
      <motion.span
        className="font-synonym text-[9px] text-[rgba(245,241,232,0.4)]"
        style={{ opacity: useTransform(t, [0, 0.4, 1], [1, 0, 0]) }}
      >
        {col.links[0]}
      </motion.span>
    </motion.div>
  );
}

/* ---------------- annotation panel ---------------- */

const MODES = {
  india: {
    label: "Mode A · Indian Interface",
    site: "sample-in.example.in",
    traits: ["Generous whitespace", "Large typography", "Simple hierarchy", "Lower information density"],
  },
  japan: {
    label: "Mode B · Japanese Interface",
    site: "sample-jp.example.jp",
    traits: [
      "Dense hierarchy",
      "Compact typography",
      "Multiple reading paths",
      "Grouped information",
      "Higher information density",
    ],
  },
} as const;

function AnnotationPanel({ japanese }: { japanese: boolean }) {
  const mode = japanese ? MODES.japan : MODES.india;
  return (
    <div className="relative rounded-[12px] p-6" style={{ border: `1px solid ${ANNO}`, background: "rgba(245,241,232,0.02)" }}>
      <div className="flex items-baseline justify-between">
        <div className="text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.45)]">Annotation</div>
        <div className="font-synonym text-[9px] text-[rgba(245,241,232,0.35)]">{mode.site}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="mt-4 font-boska text-2xl text-[#F5F1E8]">{mode.label}</div>
          <ul className="mt-6">
            {mode.traits.map((tr, i) => (
              <motion.li
                key={tr}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                className="flex items-baseline gap-3 border-b py-3 font-synonym text-[14px] text-[rgba(245,241,232,0.8)]"
                style={{ borderColor: ANNO }}
              >
                <span className="w-6 shrink-0 text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tr}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)]">
        Hover the workspace to transform
      </div>
    </div>
  );
}

/* ---------------- callout markers over the browser ---------------- */

const CALLOUTS = [
  { n: "01", top: "6%", left: "3%" },
  { n: "02", top: "26%", left: "3%" },
  { n: "03", top: "52%", left: "3%" },
  { n: "04", top: "74%", left: "3%" },
  { n: "05", top: "90%", left: "3%" },
];

function Callouts({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {CALLOUTS.map((c, i) => (
        <motion.div
          key={c.n}
          className="absolute flex h-[18px] w-[18px] items-center justify-center rounded-full font-synonym text-[8px]"
          style={{ top: c.top, left: c.left, border: `1px solid ${ANNO}`, color: "rgba(245,241,232,0.55)", background: "rgba(23,25,29,0.6)" }}
          animate={{ opacity: active ? 1 : 0.35, scale: active ? 1.02 : 1 }}
          transition={{ delay: active ? i * 0.05 : 0, duration: 0.6, ease: EASE }}
        >
          {c.n}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- workspace ---------------- */

function Workspace() {
  const [hover, setHover] = useState(false);
  const raw = useMotionValue(0);
  const t = useSpring(raw, SPRING);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 24 });
  const smy = useSpring(my, { stiffness: 60, damping: 24 });
  const glass = useMotionTemplate`radial-gradient(560px circle at ${smx}% ${smy}%, rgba(245,241,232,0.05), transparent 62%)`;

  const tiltX = useTransform(smy, [0, 100], [0.6, -0.6]);
  const tiltY = useTransform(smx, [0, 100], [-0.6, 0.6]);

  const setMode = (on: boolean) => {
    setHover(on);
    raw.set(on ? 1 : 0);
  };

  return (
    <div className="grid grid-cols-12 items-start gap-8">
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ type: "spring", ...SPRING }}
        onMouseEnter={() => setMode(true)}
        onMouseLeave={() => setMode(false)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
        className="relative col-span-12 overflow-hidden lg:col-span-8 xl:col-span-9"
        style={{
          height: 780,
          borderRadius: 16,
          background: "#17191D",
          border: `1px solid ${BORDER}`,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 2400,
          boxShadow: hover ? "0 44px 96px -52px rgba(0,0,0,0.95)" : "0 24px 60px -40px rgba(0,0,0,0.9)",
          transition: "box-shadow 800ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* tab strip */}
        <div className="flex items-end gap-1 border-b px-3 pt-2" style={{ borderColor: BORDER, background: "rgba(245,241,232,0.02)" }}>
          <div className="mr-2 flex items-center gap-[6px] pb-2">
            {["#4C4F55", "#4C4F55", "#4C4F55"].map((c, i) => (
              <span key={i} className="h-[9px] w-[9px] rounded-full" style={{ background: "rgba(245,241,232,0.16)" }} />
            ))}
          </div>
          {["Sample — Home", "Field notes", "Screen archive"].map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-t-[6px] px-3 py-[6px] font-synonym text-[9.5px]"
              style={{
                background: i === 0 ? "rgba(245,241,232,0.055)" : "transparent",
                border: `1px solid ${i === 0 ? BORDER : "transparent"}`,
                borderBottom: "none",
                color: i === 0 ? "rgba(245,241,232,0.7)" : "rgba(245,241,232,0.35)",
              }}
            >
              <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: "rgba(245,241,232,0.2)" }} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={i === 0 ? (hover ? "jp" : "in") : label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {i === 0 ? (hover ? "サンプル — ホーム" : label) : label}
                </motion.span>
              </AnimatePresence>
              <span style={{ color: "rgba(245,241,232,0.25)" }}>×</span>
            </div>
          ))}
          <span className="pb-[6px] pl-2 font-synonym text-[11px] text-[rgba(245,241,232,0.25)]">＋</span>
        </div>

        {/* toolbar */}
        <div className="relative flex items-center gap-3 border-b px-4 py-[9px]" style={{ borderColor: BORDER }}>
          {["‹", "›", "⟳"].map((g) => (
            <span key={g} className="font-synonym text-[11px] text-[rgba(245,241,232,0.3)]">
              {g}
            </span>
          ))}
          <div
            className="flex h-[24px] flex-1 items-center gap-2 rounded-full px-3"
            style={{ background: "rgba(245,241,232,0.05)", border: `1px solid ${LINE}` }}
          >
            <span className="text-[9px] text-[rgba(245,241,232,0.35)]">⌾</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={hover ? "jp" : "in"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-synonym text-[10px] tracking-[0.14em] text-[rgba(245,241,232,0.45)]"
              >
                {hover ? "sample-jp.example.jp / 情報" : "sample-in.example.in / home"}
              </motion.span>
            </AnimatePresence>
          </div>
          <div
            className="flex h-[24px] w-[150px] items-center gap-2 rounded-full px-3"
            style={{ background: "rgba(245,241,232,0.035)", border: `1px solid ${LINE}` }}
          >
            <span className="text-[9px] text-[rgba(245,241,232,0.3)]">⌕</span>
            <span className="font-synonym text-[9.5px] text-[rgba(245,241,232,0.3)]">{hover ? "サイト内検索" : "Search"}</span>
          </div>
          <span className="font-synonym text-[11px] text-[rgba(245,241,232,0.28)]">⋮</span>

          {/* page loading indicator */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left"
            style={{ background: `linear-gradient(to right, ${ACCENT}, rgba(245,241,232,0.4))` }}
            initial={false}
            animate={hover ? { scaleX: [0, 1], opacity: [0.9, 0.9, 0] } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {/* reflection sweep across chrome */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(245,241,232,0.35), transparent)" }}
            initial={false}
            animate={hover ? { x: ["-40%", "40%"], opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </div>

        {/* interface + scrollbar */}
        <div className="relative flex h-[calc(100%-79px)]">
          <div className="min-w-0 flex-1 overflow-hidden">
            <MorphInterface t={t} />
          </div>
          <div className="w-[7px] shrink-0 border-l" style={{ borderColor: LINE, background: "rgba(245,241,232,0.015)" }}>
            <motion.div
              className="mx-auto w-[3px] rounded-full"
              style={{ background: "rgba(245,241,232,0.16)" }}
              animate={{ height: hover ? 90 : 190, marginTop: hover ? 40 : 16 }}
              transition={{ type: "spring", ...SPRING }}
            />
          </div>
        </div>

        <Callouts active={hover} />

        {/* cursor glass sheen */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{ backgroundImage: glass, opacity: hover ? 1 : 0, transition: "opacity 700ms" }}
        />
      </motion.div>

      {/* annotation + connectors */}
      <div className="relative col-span-12 lg:col-span-4 xl:col-span-3">
        <svg aria-hidden className="pointer-events-none absolute -left-8 top-8 hidden h-72 w-8 lg:block" viewBox="0 0 32 288" preserveAspectRatio="none">
          {[24, 88, 152, 216].map((y, i) => (
            <motion.path
              key={y}
              d={`M32 ${y} H16 V${y - 12} H0`}
              fill="none"
              stroke={ANNO}
              strokeWidth="1"
              strokeDasharray="3 4"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            />
          ))}
          <circle cx="32" cy="24" r="2" fill="rgba(245,241,232,0.28)" />
        </svg>
        <AnnotationPanel japanese={hover} />
      </div>
    </div>
  );
}

/* ---------------- chapter ---------------- */

export function ComparativeAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 90%", "end 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative bg-[#17191D]">
      <BlueprintBackdrop />
      <div className="relative">
        <ChapterShell
          id="comparative-analysis"
          number="04"
          label="Comparative Analysis"
          heading="Reconstructing the Interface"
          pageRef="§ 04 · Pages 053 – 072"
          wide={
            <div className="mx-auto mt-16 w-[92%] max-w-[1600px] lg:w-[85%]">
              <Workspace />
              <div className="mt-24">
                <ChapterRule />
                <div className="max-w-[720px]">
                  <ChapterAnnotation>
                    Continues in Chapter 05 — Findings, where the transformations observed here are
                    stated as recorded results.
                  </ChapterAnnotation>
                </div>
              </div>
            </div>
          }
        >
          <p className="font-synonym text-[15px] leading-[1.85]" style={{ color: "rgba(245,241,232,0.78)" }}>
            A single interface is held on the research table. At rest it follows the conventions
            observed across the Indian sample; as the reader engages with it, the same interface
            reorganises itself according to the Japanese sample — navigation, spacing, grid,
            typography and density shifting together rather than in sequence.
          </p>
          <p className="mt-4 text-[9px] tracking-[0.35em] uppercase" style={{ color: INK, opacity: 0.4 }}>
            Hover the workspace to observe the transformation
          </p>
        </ChapterShell>
      </div>
    </motion.div>
  );
}
