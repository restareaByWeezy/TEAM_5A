import { escapeRegExp, uniqBy } from 'lodash';

interface ObjType {
  [ch: string]: number;
}

const ch2pattern = (ch: string) => {
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl: ObjType = {
      ㄱ: '가'.charCodeAt(0),
      ㄲ: '까'.charCodeAt(0),
      ㄴ: '나'.charCodeAt(0),
      ㄷ: '다'.charCodeAt(0),
      ㄸ: '따'.charCodeAt(0),
      ㄹ: '라'.charCodeAt(0),
      ㅁ: '마'.charCodeAt(0),
      ㅂ: '바'.charCodeAt(0),
      ㅃ: '빠'.charCodeAt(0),
      ㅅ: '사'.charCodeAt(0),
    };
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ'];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  return escapeRegExp(ch);
};

const FuzzyString = (inputValue: string) => {
  const pattern = inputValue
    .split('')
    .map(ch2pattern)
    .map((prev) => `(${prev})`)
    .join('.*?');
  return new RegExp(pattern, 'i');
};

export const fuzzyFilter = (dataList: IItem[], searchValue: string): IItem[] => {
  const regex = FuzzyString(searchValue);
  const diseasesData = uniqBy(dataList, 'sickCd');
  const resultData = diseasesData
    .filter((row) => {
      return regex.test(row.sickNm);
    })
    .map((row) => {
      let longestDistance = 0;
      const sickName = row.sickNm.replace(regex, (match, ...groups) => {
        const letters = groups.slice(0, groups.length - 2);
        let lastIndex = 0;
        const highlighted = [];
        for (let i = 0, l = letters.length; i < l; i += 1) {
          const idx = match.indexOf(letters[i], lastIndex);
          highlighted.push(match.substring(lastIndex, idx));
          highlighted.push(',');
          highlighted.push(`|${letters[i]}|`);
          highlighted.push(',');
          if (lastIndex > 0) {
            longestDistance = Math.max(longestDistance, idx - lastIndex);
          }
          lastIndex = idx + 1;
        }
        return highlighted.join('');
      });

      return {
        sickCd: row.sickCd,
        sickNm: sickName,
        originSickNm: row.sickNm,
        longestDistance,
      };
    });

  resultData.sort((a, b) => {
    return a.longestDistance - b.longestDistance;
  });

  return resultData.slice(0, 8);
};
