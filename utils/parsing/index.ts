"use server"

import axios from "axios";
import  {DOMParser} from "xmldom"

export async function parseXMLContent(xmlContentLink: {
  url: string;
  languageName: string;
  languageCode: string;
  isTranslatable: boolean;
}): Promise<
  | {
      text: string;
      timestamp: string;
    }[]
  | null
> {
  try {
    const stringToParse = await axios.get(xmlContentLink.url);
    const parser = new DOMParser()
    const doc = parser.parseFromString(stringToParse.data, "application/xml")
    const textElements = doc.getElementsByTagName("text")
    const results = []

    for (let i = 0; i < textElements.length; i++) {
        const textContent = textElements[i].textContent;
        const startTimeStamp = textElements[i].getAttribute("start")

        if (textContent && startTimeStamp) {
            results.push({
                text: textContent,
                timestamp: startTimeStamp
            })
        }
    }

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
