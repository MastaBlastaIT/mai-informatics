import { RegExpFoundData, RegExpRequestData } from "models/regexp";
import axios from "axios";

export default class RegExpService {
  static regExpFind(params: RegExpRequestData): Promise<RegExpFoundData> {
    const formData = new FormData();
    formData.set("text_type", params.text_type.toString());
    params.regex_str && formData.set("regex_str", params.regex_str.toString());

    return axios
      .post("https://mastablastait.pythonanywhere.com/regexp_find", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => res.data);
  }
}
