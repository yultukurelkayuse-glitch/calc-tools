"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "zenkaku" | "hankaku";

type Targets = {
  alphanumeric: boolean;
  katakana: boolean;
  space: boolean;
};

const HALF_KATAKANA_TO_FULL: Record<string, string> = {
  "｡": "。",
  "｢": "「",
  "｣": "」",
  "､": "、",
  "･": "・",
  "ｦ": "ヲ",
  "ｧ": "ァ",
  "ｨ": "ィ",
  "ｩ": "ゥ",
  "ｪ": "ェ",
  "ｫ": "ォ",
  "ｬ": "ャ",
  "ｭ": "ュ",
  "ｮ": "ョ",
  "ｯ": "ッ",
  "ｰ": "ー",
  "ｱ": "ア",
  "ｲ": "イ",
  "ｳ": "ウ",
  "ｴ": "エ",
  "ｵ": "オ",
  "ｶ": "カ",
  "ｷ": "キ",
  "ｸ": "ク",
  "ｹ": "ケ",
  "ｺ": "コ",
  "ｻ": "サ",
  "ｼ": "シ",
  "ｽ": "ス",
  "ｾ": "セ",
  "ｿ": "ソ",
  "ﾀ": "タ",
  "ﾁ": "チ",
  "ﾂ": "ツ",
  "ﾃ": "テ",
  "ﾄ": "ト",
  "ﾅ": "ナ",
  "ﾆ": "ニ",
  "ﾇ": "ヌ",
  "ﾈ": "ネ",
  "ﾉ": "ノ",
  "ﾊ": "ハ",
  "ﾋ": "ヒ",
  "ﾌ": "フ",
  "ﾍ": "ヘ",
  "ﾎ": "ホ",
  "ﾏ": "マ",
  "ﾐ": "ミ",
  "ﾑ": "ム",
  "ﾒ": "メ",
  "ﾓ": "モ",
  "ﾔ": "ヤ",
  "ﾕ": "ユ",
  "ﾖ": "ヨ",
  "ﾗ": "ラ",
  "ﾘ": "リ",
  "ﾙ": "ル",
  "ﾚ": "レ",
  "ﾛ": "ロ",
  "ﾜ": "ワ",
  "ﾝ": "ン",
  "ﾞ": "゛",
  "ﾟ": "゜",
};

const FULL_KATAKANA_TO_HALF: Record<string, string> = {
  "。": "｡",
  "「": "｢",
  "」": "｣",
  "、": "､",
  "・": "･",
  "ヲ": "ｦ",
  "ァ": "ｧ",
  "ィ": "ｨ",
  "ゥ": "ｩ",
  "ェ": "ｪ",
  "ォ": "ｫ",
  "ャ": "ｬ",
  "ュ": "ｭ",
  "ョ": "ｮ",
  "ッ": "ｯ",
  "ー": "ｰ",
  "ア": "ｱ",
  "イ": "ｲ",
  "ウ": "ｳ",
  "エ": "ｴ",
  "オ": "ｵ",
  "カ": "ｶ",
  "キ": "ｷ",
  "ク": "ｸ",
  "ケ": "ｹ",
  "コ": "ｺ",
  "サ": "ｻ",
  "シ": "ｼ",
  "ス": "ｽ",
  "セ": "ｾ",
  "ソ": "ｿ",
  "タ": "ﾀ",
  "チ": "ﾁ",
  "ツ": "ﾂ",
  "テ": "ﾃ",
  "ト": "ﾄ",
  "ナ": "ﾅ",
  "ニ": "ﾆ",
  "ヌ": "ﾇ",
  "ネ": "ﾈ",
  "ノ": "ﾉ",
  "ハ": "ﾊ",
  "ヒ": "ﾋ",
  "フ": "ﾌ",
  "ヘ": "ﾍ",
  "ホ": "ﾎ",
  "マ": "ﾏ",
  "ミ": "ﾐ",
  "ム": "ﾑ",
  "メ": "ﾒ",
  "モ": "ﾓ",
  "ヤ": "ﾔ",
  "ユ": "ﾕ",
  "ヨ": "ﾖ",
  "ラ": "ﾗ",
  "リ": "ﾘ",
  "ル": "ﾙ",
  "レ": "ﾚ",
  "ロ": "ﾛ",
  "ワ": "ﾜ",
  "ン": "ﾝ",
  "゛": "ﾞ",
  "゜": "ﾟ",
};

function toZenkakuAlphanumeric(char: string): string {
  const code = char.charCodeAt(0);
  if (
    (code >= 0x0041 && code <= 0x005a) ||
    (code >= 0x0061 && code <= 0x007a) ||
    (code >= 0x0030 && code <= 0x0039)
  ) {
    return String.fromCharCode(code + 0xfee0);
  }
  return char;
}

function toHankakuAlphanumeric(char: string): string {
  const code = char.charCodeAt(0);
  if (
    (code >= 0xff21 && code <= 0xff3a) ||
    (code >= 0xff41 && code <= 0xff5a) ||
    (code >= 0xff10 && code <= 0xff19)
  ) {
    return String.fromCharCode(code - 0xfee0);
  }
  return char;
}

function applyVoicedSound(code: number): number | null {
  // カ行: カ(0x30AB) キ ク ケ コ -> ガ ギ グ ゲ ゴ
  if (code >= 0x30ab && code <= 0x30b3 && (code - 0x30ab) % 2 === 0) {
    return code + 1;
  }
  // サ行
  if (code >= 0x30b5 && code <= 0x30bd && (code - 0x30b5) % 2 === 0) {
    return code + 1;
  }
  // タ行
  if (code >= 0x30bf && code <= 0x30c8 && (code - 0x30bf) % 2 === 0) {
    return code + 1;
  }
  // ハ行
  if (code >= 0x30cf && code <= 0x30db && (code - 0x30cf) % 3 === 0) {
    return code + 1;
  }
  // ウ -> ヴ
  if (code === 0x30a6) return 0x30f4;
  return null;
}

function applySemiVoicedSound(code: number): number | null {
  // ハ行
  if (code >= 0x30cf && code <= 0x30db && (code - 0x30cf) % 3 === 0) {
    return code + 2;
  }
  return null;
}

function hankakuKatakanaToZenkaku(input: string): string {
  const chars = Array.from(input);
  const result: string[] = [];

  for (const char of chars) {
    const code = char.charCodeAt(0);
    // 半角濁点/半濁点は前の文字と合成
    if (code === 0xff9e || code === 0xff9f) {
      const prev = result[result.length - 1];
      if (prev) {
        const prevCode = prev.charCodeAt(0);
        const nextCode =
          code === 0xff9e
            ? applyVoicedSound(prevCode)
            : applySemiVoicedSound(prevCode);
        if (nextCode !== null) {
          result[result.length - 1] = String.fromCharCode(nextCode);
          continue;
        }
      }
      // 合成できない場合は通常の全角濁点/半濁点記号として出力
      result.push(code === 0xff9e ? "゛" : "゜");
      continue;
    }

    const mapped = HALF_KATAKANA_TO_FULL[char];
    result.push(mapped ?? char);
  }

  return result.join("");
}

function isVoicedKatakana(code: number): boolean {
  if (code >= 0x30ac && code <= 0x30c9 && (code - 0x30ab) % 2 === 1) return true;
  if (code >= 0x30d0 && code <= 0x30dc && (code - 0x30cf) % 2 === 1) return true;
  if (code === 0x30f4) return true;
  return false;
}

function isSemiVoicedKatakana(code: number): boolean {
  if (code >= 0x30d1 && code <= 0x30dd && (code - 0x30cf) % 2 === 0) return true;
  return false;
}

function zenkakuKatakanaToHankaku(input: string): string {
  let result = "";
  for (const char of input) {
    const code = char.charCodeAt(0);
    if (isVoicedKatakana(code)) {
      const baseCode = code === 0x30f4 ? 0x30a6 : code - 1;
      const base = FULL_KATAKANA_TO_HALF[String.fromCharCode(baseCode)] ?? char;
      result += base + "ﾞ";
    } else if (isSemiVoicedKatakana(code)) {
      const baseCode = code - 2;
      const base = FULL_KATAKANA_TO_HALF[String.fromCharCode(baseCode)] ?? char;
      result += base + "ﾟ";
    } else {
      result += FULL_KATAKANA_TO_HALF[char] ?? char;
    }
  }
  return result;
}

export function convertZenkakuHankaku(
  input: string,
  direction: Direction,
  targets: Targets
): string {
  if (direction === "hankaku") {
    // 全角 → 半角
    let result = input;
    if (targets.alphanumeric) {
      result = result.replace(/[Ａ-Ｚａ-ｚ０-９]/g, toHankakuAlphanumeric);
    }
    if (targets.space) {
      result = result.replace(/\u3000/g, " ");
    }
    if (targets.katakana) {
      result = zenkakuKatakanaToHankaku(result);
    }
    return result;
  }

  // 半角 → 全角
  let result = input;
  if (targets.alphanumeric) {
    result = result.replace(/[A-Za-z0-9]/g, toZenkakuAlphanumeric);
  }
  if (targets.space) {
    result = result.replace(/ /g, "\u3000");
  }
  if (targets.katakana) {
    result = hankakuKatakanaToZenkaku(result);
  }
  return result;
}

function formatCount(n: number): string {
  return n.toLocaleString("ja-JP");
}

const textareaClass =
  "w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const optionClass =
  "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:text-blue-600";

const directionClass =
  "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-600";

export default function ZenkakuHankakuTool() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("hankaku");
  const [targets, setTargets] = useState<Targets>({
    alphanumeric: true,
    katakana: true,
    space: true,
  });
  const [output, setOutput] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (output === null) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    resultRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [output]);

  const handleRun = () => {
    setCopied(false);
    if (input === "") {
      setOutput(null);
      setNotice("テキストを入力してから変換してください。");
      return;
    }
    setNotice(null);
    setRunCount((k) => k + 1);
    setOutput(convertZenkakuHankaku(input, direction, targets));
  };

  const handleClear = () => {
    setInput("");
    setOutput(null);
    setNotice(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (output === null) return;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output);
        success = true;
      }
    } catch {
      /* クリップボードAPI失敗時はフォールバックを試す */
    }
    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = output;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        /* フォールバックも失敗 */
      }
    }
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  const updateTarget = (key: keyof Targets, checked: boolean) => {
    setTargets((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div>
        <label
          htmlFor="zenkaku-hankaku-input"
          className="mb-2 block text-sm font-bold text-slate-600"
        >
          変換するテキスト
        </label>
        <textarea
          id="zenkaku-hankaku-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={`例）\nＳｍａｒｔＴｏｏｌｓ１２３　サンプル\nSmartTools123 ｻﾝﾌﾟﾙ`}
          className={textareaClass}
        />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-bold text-slate-600">変換方向</p>
        <div className="grid grid-cols-2 gap-2">
          <label className={directionClass}>
            <input
              type="radio"
              name="direction"
              value="hankaku"
              checked={direction === "hankaku"}
              onChange={(e) => setDirection(e.target.value as Direction)}
              className="sr-only"
            />
            全角 → 半角
          </label>
          <label className={directionClass}>
            <input
              type="radio"
              name="direction"
              value="zenkaku"
              checked={direction === "zenkaku"}
              onChange={(e) => setDirection(e.target.value as Direction)}
              className="sr-only"
            />
            半角 → 全角
          </label>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-bold text-slate-600">変換対象</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <label className={optionClass}>
            <input
              type="checkbox"
              checked={targets.alphanumeric}
              onChange={(e) => updateTarget("alphanumeric", e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
            英数字
          </label>
          <label className={optionClass}>
            <input
              type="checkbox"
              checked={targets.katakana}
              onChange={(e) => updateTarget("katakana", e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
            カタカナ
          </label>
          <label className={optionClass}>
            <input
              type="checkbox"
              checked={targets.space}
              onChange={(e) => updateTarget("space", e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
            スペース
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={handleRun}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.99]"
      >
        変換する
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="mt-3 w-full rounded-xl border-2 border-slate-200 bg-white py-3 font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-[0.99]"
      >
        入力と結果をクリア
      </button>

      <div className="mt-6">
        {notice !== null && (
          <p className="rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-400">
            {notice}
          </p>
        )}
        {output !== null && (
          <div
            key={`zenkaku-hankaku-${runCount}`}
            ref={resultRef}
            className="result-pop scroll-mt-4"
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              className="rounded-2xl bg-blue-50 p-5 sm:p-6"
            >
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    変換前の文字数
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-slate-700 sm:text-3xl">
                    {formatCount(input.length)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    変換後の文字数
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-blue-600 sm:text-3xl">
                    {formatCount(output.length)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">
                ※
                すべてブラウザ内で処理され、入力したテキストが外部に送信されることはありません
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="zenkaku-hankaku-output"
                className="mb-2 block text-sm font-bold text-slate-600"
              >
                変換結果
              </label>
              <textarea
                id="zenkaku-hankaku-output"
                readOnly
                rows={8}
                value={output}
                className="w-full resize-y rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base leading-relaxed text-slate-800 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 w-full rounded-xl border-2 border-blue-200 bg-white py-3 font-bold text-blue-600 transition-all hover:bg-blue-100/60 active:scale-[0.99]"
            >
              {copied ? "✓ コピーしました" : "結果をコピー"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
