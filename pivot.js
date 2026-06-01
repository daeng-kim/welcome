/**
 * 정렬 기준 배열을 받아 comparator를 생성하는 함수
 * @param {Array<{key: string, type: 'mixed' | 'numeric' | 'string'}>} criteria
 * 
 * type:
 *   'mixed'   - 알파벳+숫자 혼합 (A10, D101 ...)
 *   'numeric' - 순수 숫자 (1, 2, 10, 11 ...)
 *   'string'  - 일반 문자열 (localeCompare)
 */
function createComparator(criteria) {
  function compareMixed(aVal, bVal) {
    const parse = (str) => {
      const match = String(str).match(/^([A-Za-z]*)(\d*.*)$/);
      return match ? { prefix: match[1], suffix: match[2] } : { prefix: str, suffix: '' };
    };
    const a = parse(aVal);
    const b = parse(bVal);

    if (a.prefix !== b.prefix) return a.prefix.localeCompare(b.prefix);
    return a.suffix.localeCompare(b.suffix); // 문자열 비교로 D10 < D101 < D11 유지
  }

  function compareNumeric(aVal, bVal) {
    return Number(aVal) - Number(bVal);
  }

  function compareString(aVal, bVal) {
    return String(aVal).localeCompare(String(bVal));
  }

  const compareFnMap = {
    mixed:   compareMixed,
    numeric: compareNumeric,
    string:  compareString,
  };

  return function (objA, objB) {
    for (const { key, type = 'string' } of criteria) {
      const fn = compareFnMap[type] ?? compareString;
      const result = fn(objA[key], objB[key]);
      if (result !== 0) return result; // 다르면 바로 반환, 같으면 다음 기준으로
    }
    return 0; // 모든 기준이 동일
  };
}
