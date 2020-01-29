export interface RegExpRequestData {
  text_type: number;
  regex_str: RegExp;
}

export interface RegExpFoundData {
  initial_text: string;
  regexp_found: string;
}
