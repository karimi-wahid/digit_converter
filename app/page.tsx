"use client";
import { useState } from "react";
import { Copy, RotateCcw, CheckCircle2 } from "lucide-react";

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"en-to-fa" | "fa-to-en">("en-to-fa");
  const [copied, setCopied] = useState(false);

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  const convertDigits = (
    value: string,
    convertMode: "en-to-fa" | "fa-to-en"
  ): string => {
    if (convertMode === "fa-to-en") {
      return value.replace(/[۰-۹]/g, (d) =>
        persianDigits.indexOf(d).toString()
      );
    }
    return value.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const convertedText = text ? convertDigits(text, mode) : "";
  const digitCount = (text.match(/\d|[۰-۹]/g) || []).length;

  const handleCopy = async () => {
    if (convertedText) {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText("");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "en-to-fa" ? "fa-to-en" : "en-to-fa"));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Digit Converter
          </h1>
          <p className="text-slate-600">
            Convert between English and Persian digits instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-linear-to-br from-blue-600 to-cyan-600 px-6 py-8">
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-semibold transition-colors ${
                  mode === "en-to-fa" ? "text-white" : "text-blue-200"
                }`}
              >
                English → Persian
              </span>

              <button
                onClick={toggleMode}
                className="relative inline-flex h-10 w-20 items-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform ${
                    mode === "fa-to-en" ? "translate-x-11" : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-semibold transition-colors ${
                  mode === "fa-to-en" ? "text-white" : "text-blue-200"
                }`}
              >
                Persian → English
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Input {mode === "en-to-fa" ? "(English)" : "(Persian)"}
                </label>
                {text && (
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={
                  mode === "en-to-fa"
                    ? "Type numbers: 2025, 123..."
                    : "تایپ کنید: ۲۰۲۵، ۱۲۳..."
                }
                className="w-full h-32 px-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none outline-none"
                dir={mode === "fa-to-en" ? "rtl" : "ltr"}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-slate-400 text-xs font-medium">
                  CONVERTED
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Output {mode === "en-to-fa" ? "(Persian)" : "(English)"}
                </label>
                {convertedText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div
                className="w-full h-32 px-4 py-3 text-lg bg-slate-50 border-2 border-slate-200 rounded-xl overflow-auto"
                dir={mode === "en-to-fa" ? "rtl" : "ltr"}
              >
                <p className="text-slate-800 whitespace-pre-wrap">
                  {convertedText || (
                    <span className="text-slate-400">
                      Converted text will appear here...
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm text-slate-500">
              <span>Digits converted: {digitCount}</span>
              <span>Characters: {text.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Real-time conversion • Supports mixed text and numbers
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
