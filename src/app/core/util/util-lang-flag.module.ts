export class UtilLangFlag {

    private static countryCode = [
        {
          lang: 'fr',
          countrycode: 'fr'
        },
        {
            lang: 'en',
            countrycode: 'gb'
          },
          {
            lang: 'spanish',
            countrycode: 'es'
          },
          {
            lang: 'portuguese',
            countrycode: 'pt'
          },
    ];
    static getCountryCode(langage) {
        return this.countryCode.find(e => e.lang === langage).countrycode;
    }
}