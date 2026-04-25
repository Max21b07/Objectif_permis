import type { Language } from "../locales/types";

const voiceLang: Record<Language, string> = {
  vi: "vi-VN",
  en: "en-US",
  fr: "fr-FR",
};

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Audio is optional; never block the learning flow.
  }
}

export function speak(text: string, lang: Language | "fr-FR" | "en-US" | "vi-VN"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang.length === 2 ? voiceLang[lang as Language] : lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // iOS Safari may refuse speech in some contexts; fail silently.
  }
}

export function playAudioOrSpeak(src: string | undefined, fallbackText: string, lang: Language): void {
  if (typeof window === "undefined" || !src) {
    speak(fallbackText, lang);
    return;
  }

  try {
    stopSpeaking();
    const audio = new Audio(src);
    audio.onerror = () => speak(fallbackText, lang);
    void audio.play().catch(() => speak(fallbackText, lang));
  } catch {
    speak(fallbackText, lang);
  }
}
