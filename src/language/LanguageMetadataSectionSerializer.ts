import JSONUtils from '../util/JSONUtils'
import Language from './Language'
import LanguageMetadataSection from './LanguageMetadataSection'

export default class LanguageMetadataSectionSerializer {
  public fromJson (obj: any): LanguageMetadataSection {
    const set: Set<Language> = new Set()

    for (const lang of Object.entries(obj)) {
      const s = lang[0]
      if (s.length > 16) {
        console.error(`Invalid language->${s}: language code must not be more than 16 characters long`)
      }

      const s1 = JSONUtils.getAsString(lang[1], 'region')
      const s2 = JSONUtils.getAsString(lang[1], 'name')
      const flag = JSONUtils.getAsBoolean(lang[1], 'bidirectional', false)

      if (s1.length === 0) {
        console.error(`Invalid language-> ${s} ->region: empty value`)
      }

      if (s2.length === 0) {
        console.error(`Invalid language-> ${s} ->name: empty value`)
      }

      if (set.has(new Language(s, s1, s2, flag))) {
        console.warn(`Duplicate language->${s} defined`)
      } else set.add(new Language(s, s1, s2, flag))
    }

    const arr: Language[] = [...set]
    return new LanguageMetadataSection(arr)
  }

  public getMetadataSectionName (): string {
    return 'language'
  }
}
