export interface PageItem {
  id: string;
  type:
    | "sign"
    | "signParagraph"
    | "signPunctuation"
    | "text"
    | "paragraph"
    | "punctuation"
    | "breakflow"
    | "caret"
    | "number";
  details?: any;
}
