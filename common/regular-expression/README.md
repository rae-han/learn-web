# 1. 정규 표현식

정규 표현식(regular expression)은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 [형식언어](https://ko.wikipedia.org/wiki/%ED%98%95%EC%8B%9D_%EC%96%B8%EC%96%B4)(formal language)다.

정규 표현식은 문자열을 대상으로 패턴 매칭 기능을 제공하는데, 이는 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

정규 표현식을 사용하면 반복문, 조건문 없이 패턴을 정의하고 테스트 하는 것으로 간단히 체크할 수 있지만, 정규 표현식은 주석이나 공백을 허용하지 않고 여러 가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지 않다는 문제가 있다.

# 2. 정규 표현식의 생성

자바스크립트 기준으로 정규 표현식 객체(`RegExp` 객체)를 생성하기 위해서는 정규 표현식 리터럴과 `RegExp` 생성자 함수를 사용할 수 있다. 일반 적으로는 정규 표현식 리터럴을 사용하는 것인데 다음과 같이 표현한다.

![정규 표현식 리터럴](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/860dff2b-763e-40ff-87c5-abaa4dc6afa9/Untitled.png)

정규 표현식 리터럴

위와 같이 정규 표현식 리터럴을 패턴과 플래그로 구성된다. 자바스크립트에서는 `RegExp` 생성자 함수를 사용하여 `RegExp` 객체를 생성할 수도 있다.

```jsx
// new RegExp(pattern[, flags]);
// 아래 두 객체는 /ab+c/i 라는 표현식을 생성한다.
new RegExp(/ab+c/, 'i') // 리터럴
new RegExp('ab+c', 'i') // 생성자
```

# 3. 정규 표현식의 구성

## 3.1. 자바스크립트 RegExp 메서드

자바스크립트에서 정규 표현식을 사용하는 메서드는 아래와 같다.

- RegExp 객체
    - RegExp.prototype.exec
    - RegExp.prototype.test
- String 객체
    - String.prototype.match
    - String.prototype.replace
    - String.prototype.search
    - String.prototype.split

### 3.1.1. RegExp.prototype.exec

`exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환하고, 매칭 결과가 없는 경우 null을 반환한다.

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

console.log(regExp.exec(target));
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

### 3.1.2. RegExp.prototype.test

`test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

console.log(regExp.test(target)); // true
```

### 3.1.3. String.prototype.match

`String` 표준 빌트인 객체가 제공하는 `match` 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

```jsx
const target = 'Is this all there is?';
const regExp = /is/g;

console.log(target.match(regExp)); // [ 'is', 'is' ]
```

### 3.1.4. String.prototype.replace

`replace` 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환한다.

```jsx
const target = 'Is this all there is?';
const regExp = /is/g;

console.log(target.replace(regExp, '0')); // Is th0 all there 0?
console.log(target.replace(/is/, '0')); // Is th0 all there is?
```

두번째 인자로 들어가는 `replacement` 문자열을 다음과 같은 특수 교체 패턴을 포함할 수 있다.

- `$$` - “$” 기호를 삽입.
- `$&` - 매치된 문자열을 삽입.
- `$`` - 매치된 문자열 앞쪽까지의 문자열을 삽입
- `$’` - 매치된 문자열의 뒷쪽 문자열을 삽입
- `$n` - n이 1이상 99이하의 정수라면, 첫번째 매개변수로 넘겨진 `RegExp` 객체에서 소괄호로 묶인 n번째의 부분 표현식으로 매치된 문자열을 삽입, 캡쳐링이라고도 한다.

```jsx
const target = 'Is this all there is?';

console.log(target.replace(/is/, '$$')); // Is th$ all there is?
console.log(target.replace(/is/, '$&')); // Is this all there is?
console.log(target.replace(/is/, '$`')); // Is thIs th all there is?
console.log(target.replace(/is/, "$'")); // Is th all there is? all there is?
console.log(target.replace(/(i)(s)/, '$1$1$2$2')); // Is thiiss all there is?
console.log(target.replace(/(i)(s)/, ' $1$1 $2$2$2$2')); // Is th ii ssss all there is?
console.log(target.replace(/(is)/, '$1$1')); // Is thisis all there is?

let regex = /(\w+)\s(\w+)/
let str = 'John Smith'
let newstr = str.replace(re, '$2, $1')
console.log(newstr) // "Smith, John"
```

### 3.1.5. String.prototype.search

`search` 메서드는 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.

```jsx
const target = 'Is this all there is?';
const regExp = /is/g;

console.log(target.search(regExp)); // 5
console.log(target.search(/notfound/)); // -1
```

### 3.1.6. String.prototype.split

split 메서드는 대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색하여 문자열을 구분한 후 분리된 각 문자열로 이뤄진 배열을 반환한다.
만약 빈 문자열을 전달하면 각 문자를 모두 분리하고, 인수를 생략하면 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.

```jsx
const target = 'Is this all there is?';

console.log(target.split(/ /)); // [ 'Is', 'this', 'all', 'there', 'is?' ]
console.log(target.split(/is/ig)); // [ '', ' th', ' all there ', '?' ]
console.log(target.split('')); // ['I', 's', ' ', 't', (...), '?']
console.log(target.split()); // [ 'Is this all there is?' ]
// console.log(target.split(//)); // SyntaxError: Unexpected end of input
```

## 3.2. 플래그

패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다. 그 중 `i`, `g`, `m` 이 사용 빈도가 높다.

- `**i` (ignore case)** - 대소문자를 구분하지 않음
- `**g` (global)** - 전역 탐색
- `**m` (multi line)** - 여러 줄에 걸쳐 탐색
- `d` (has indices) - 부분 문자열 일치에 대해 인덱스 생성
- `s` (dot all) - 개행 문자가 `.` 과 일치함
- `u` (unicode) - `unicode`, 패턴을 유니코드 코드 포인트의 시퀀스로 간주함
- `y` (sticky) - “접착" 탐색, 대상 문자열의 현재 위치에서 탐색을 시작함

```jsx
const target = 'Is this all there is?';

console.log(target.match(/is/)); // [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
console.log(target.match(/is/i)); // [ 'Is', index: 0, input: 'Is this all there is?', groups: undefined ]
console.log(target.match(/is/g)); // [ 'is', 'is' ]
console.log(target.match(/is/ig)); // [ 'Is', 'is', 'is' ]
```

## 3.3. 패턴

정규 표현식은 일정한 규칙(패턴)을 가진 문자열의 집합을 표현하기 위해 사용하는 형식언어다.  정규 표현식은 패턴과 플래그로 구성되는데, 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며, 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.
패턴은 /로 열고 닫으며 문자열의 따음표는 생략한다. 또한 패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.

### 3.3.1. 문자열 검색

정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자 또는 문자열을 검색한다. 물론 검색할 때는 앞서 살펴본 `RegExp` 빌트인 객체 메서드를 사용한다. 앞서 플래그에서 살펴본 대로 대소문자를 구별하지 않고 검색하려면 플래그 `i`를, 검색 대상 문자열 내에서 패턴과 매치하는 모든 문자열을 전역 검색하려면 플래그  `g`를 사용한다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';

console.log(target.match(/A/)); // [ 'A', index: 0, input: 'A AA B BB Aa Bb AAA ABA', groups: undefined ]
console.log(target.match(/AA/ig)); // [ 'AA', 'Aa', 'AA' ]
```

### 3.3.2. 임의의 문자열 검색

`.`은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든 상관 없다. 만약 `.`을 연속하여 패턴을 생성하면 연속된 자루수 만큼의 문자열과 매치한다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';

console.log(target.match(/./g)); // ['A', ' ', 'A', 'A', ' ', (...), 'A', 'B', 'A']
console.log(target.match(/..../g)); // [ 'A AA', ' B B', 'B Aa', ' Bb ', 'AAA ' ]
```

### 3.3.3. 반복 검색

`{m,n}`은 앞선 패턴이 최소 m번, 최대  n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않는다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';
let regExp = /A{2,3}/ig;

console.log(target.match(regExp)); // [ 'AA', 'Aa', 'AAA' ]
```

`{n}`은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 죽 `{n}`은 `{n,n}`과 같다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';
let regExp = /A{2}/ig;

console.log(target.match(regExp)); // [ 'AA', 'Aa', 'AA' ]
```

`{n,}`은 앞선 패턴이 최소 n번 반복되는 문자열을 의미한다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';
let regExp = /A{2,}/ig;

console.log(target.match(regExp)); // [ 'AA', 'Aa', 'AAA' ]
```

`+`는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. 즉 `+`는 `{1,}`과 같다.

```jsx
let target = 'A AA B BB Aa Bb AAA ABA';
let regExp = /A+/g;

console.log(target.match(regExp)); // [ 'A', 'AA', 'A', 'AAA', 'A', 'A' ]
```

`?`는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미한다. 즉, `?`는 `{0,1}`과 같다.

```jsx
let target = 'color colour';
let regExp = /colou?r/g;

console.log(target.match(regExp)); // [ 'color', 'colour' ]
```

### 3.3.4. OR 검색

`|`은 `or`의 의미를 갖는다.

```jsx
let target = 'A AA B BB Aa Bb';
let regExp = /A|B/g

console.log(target.match(regExp)); // ['A', 'A', 'A', 'B', 'B', 'B', 'A', 'B']
```

분해되지 않는 단어 레벨로 검색하기 위해서 `+`를 함께 사용하면 좋다. 

```jsx
let target = 'A AA B BB Aa Bb';
let regExp = /A+|B+/g

console.log(target.match(regExp)); // [ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

위 예제는 패턴을 `or`로 한 번 이상 반복하는 것인데 이를 간단히 표현하면 다음과 같다. `[]`내의 문자는 `or`로 동작하고, 그 뒤에 `+`를 사용하면 앞선 패턴을 한 번 이상 반복한다. 즉 위 코드와 완전히 동일하게 동작한다.

```jsx
let target = 'A AA B BB Aa Bb';
let regExp = /[AB]+/g

console.log(target.match(regExp)); // [ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

범위를 지정하려면 `[]` 내에 `-`를 사용한다. 다음 예제의 경우 대문자 알파벳을 검색한다.

```jsx
let target = 'AA BB Z ZZ Aa Zz';
let regExp = /[A-Z]+/g

console.log(target.match(regExp)); // [ 'AA', 'BB', 'Z', 'ZZ', 'A', 'Z' ]
```

대소문자를 구별하지 않고 알파벳을 검색하는 방법은 다음과 같다.

```jsx
let target = 'AA BB Aa Bb 12';
let regExp1 = /[A-Za-z]/g;
let regExp2 = /[A-Z]/ig;

console.log(target.match(regExp1)); // ['A', 'A', 'B', 'B', 'A', 'a', 'B', 'b']
console.log(target.match(regExp2)); // ['A', 'A', 'B', 'B', 'A', 'a', 'B', 'b']
```

숫자를 검색하는 방법은 다음과 같다.

```jsx
let target = 'Aa Bb 12,345';
let regExp = /[0-9]+/g;

console.log(target.match(regExp)); // [ '12', '345' ]
```

위 코드의 경우 쉼표 때문에 매칭 결과가 분리되는데 이를 해결하면 쉼표를 패턴에 포함시키면 된다.

```jsx
let target = 'Aa Bb 12,345';
let regExp = /[0-9,]+/g;

console.log(target.match(regExp)); // [ '12,345' ]
```

`\d`는 숫자를 의미한다. 즉 `\d`는 `[0-9]`와 같다.
`\D`는 `\d`와 반대로  숫자가 아닌 문자를 의미한다.

```jsx
let target = 'Aa Bb 12,345';
let regExp1 = /[\d,]+/g;
let regExp2 = /[\D]+/g;

console.log(target.match(regExp1)); // [ '12,345' ]
console.log(target.match(regExp2)); // [ 'Aa Bb ', ',' ]
```

`\w`는 알파벳, 숫자, 언더스코어를 의미한다. 즉 `\w`는 `[A-Za-z0-9_]`와 같다.

`\W`는 `\w`와 반대로 동작한다. 즉 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

`\w`, `\W`는 `ASCII` 문자에만 일치합니다.

```jsx
let target = 'Aa Bb 12,345 _$%&';
let regExp1 = /[\w,]+/g;
let regExp2 = /[\W]+/g;

console.log(target.match(regExp1)); // [ 'Aa', 'Bb', '12,345', '_' ]
console.log(target.match(regExp2)); // [ ' ', ' ', ',', ' ', '$%&' ]
```

### 3.3.5. NOT 검색

`[...]` 내의 `^`은 `not`의 의미를 갖는다. 예를 들어, `[^0-9]`는 숫자를 제외한 문자를 의미한다. 
따라서 `[0-9]`와 같은 의미의 `\d`와 반대로 동작하는 `\D` 는 `[^0-9]`와 같고, `[A-Za-z0-9_]`와 같은 의미의 `\w`와 반대로 동작하는 `\W`는 `[^A-Za-z0-9_]`와 같다. 마찬가지로 `[\d]`, `[\w]`는 `[^\D]`, `[^\W]`와 같다.

```jsx
let target = 'AA BB 12 Aa Bb';
let regExp = /[^0-9]+/g;

console.log(target.match(regExp)); // [ 'AA BB ', ' Aa Bb' ]
```

### 3.3.6. 시작 위치, 마지막 위치로 검색

`[...]` 밖의 `^`은 문자열의 시작을 의미한다. 위에서 본 `[...]` 안의 `^`는 `not`의 의미를 가지는 것에 주의한다.
`$`는 문자열의 마지막을 의미한다.

```jsx
let target = 'https://google.com';

let regExp1 = /^https/;
console.log(regExp1.test(target)); // true

let regExp2 = /com$/;
console.log(regExp2.test(target)); // true 
```

### 3.3.7. 공백 문자

`\s`는 여러 가지 공백 문자(스페이스, 탭 등)를 의미한다. 즉 `\s`는 `[\t\r\n\v\f]`와 같은 의미다.

### 3.3.8. 정규 표현식 특수문자

정규 표현식 특수문자에 대한 상세한 내용은 아래 링크를 참조하자. 시간이 날때 보면 좋다.

- [문자 클래스 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
- [어서션](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
- [그룹과 범위](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges)
- [수량자 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)
- [유니코드 속성 이스케이프 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)

## 3.4. 자주 사용하는 정규표현식

### 3.4.1. 특정 단어로 시작하는지 검사

```jsx
const testcase1 = "https://example1.com";
const testcase2 = "http://example2.com";

const regExp1 = /^https?:\/\//;
const regExp2 = /^(http||https):\/\//;

console.log(regExp1.test(testcase1)); // true
console.log(regExp1.test(testcase2)); // true
console.log(regExp2.test(testcase1)); // true
console.log(regExp2.test(testcase2)); // true
```

### 3.4.2. 특정 단어로 끝나는지 검사

```jsx
const testcase = "index.html";
const regExp = /.html$/;

console.log(regExp.test(testcase)); // true
```

### 3.4.3. 숫자로만 이루어진 문자열인지 검사

```jsx
const testcase1 = '1234567890';
const testcase2 = 'qwer1234asdf';
const testcase3 = '1234qwer1234';

const regExp = /^\d+$/;

console.log(regExp.test(testcase1)); // true
console.log(regExp.test(testcase2)); // false
console.log(regExp.test(testcase3)); // false
console.log(testcase1.match(regExp)); // [ '1234567890', index: 0, input: '1234567890', groups: undefined ]
console.log(testcase2.match(regExp)); // null
console.log(testcase3.match(regExp)); // null
```

### 3.4.4. 하나 이상의 공백으로 시작하는지 검사

```jsx
const testcase = ' H I !';
const regExp = /^[\s]+/;

console.log(regExp.test(testcase));
```

### 3.4.5. 아이디로 사용 가능한지 검사

검색 대상 문자열이 알파벳 대소문자나 숫자로 시작하고 끝나며 4~10자리인지 검사한다.

```jsx
const regExp1 = /^[A-Za-z\d]{4,10}$/;
const regExp2 = /^[A-Za-z0-9]{4,10}$/;

const testcase = 'abc123';

console.log(regExp1.test(testcase)); // true
console.log(regExp2.test(testcase)); // true
```

### 3.4.6. 메일 주소 형식에 맞는지 검사

```jsx
const email = 'raehan@gmail.com'
const regExp = /^[A-Za-z0-9._]+@[A-Za-z0-9]+(\.[a-zA-Z]{2,2})*\.[A-Za-z]+$/;

console.log(regExp.test(email)); // true
```

참고로 인터넷 메시지 형식(internet message format) 규약인 `RFC5322`에 맞는 정교한 패턴 매칭이 필요하다면 다음과 같이 복잡한 패턴을 사용할 필요가 있다.

```jsx
const email = 'raehan@gmail.com'
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

console.log(emailRegex.test(email)); // true
```

### 3.4.7. 핸드폰 번호 형식에 맞는지 검사

```jsx
const regExp1 = /01[0-9]-?[0-9]{3,4}-?[0-9]{4}/;
const regExp2 = /01\d-?\d{3,4}-?\d{4}/;
const testcase1 = "01071121906";
const testcase2 = "010-7112-1906";

console.log(regExp1.test(testcase1)); // true
console.log(regExp1.test(testcase2)); // true
console.log(regExp2.test(testcase1)); // true
console.log(regExp2.test(testcase2)); // true
```

### 3.4.8. 특수 문자 포함 여부 검사

```jsx
const target = 'abc#123';
const regExp = /[^A-Za-z0-9]/gi;

console.log(regExp.test(target)); // true
```

다음 방식으로 대체할 수 있는데, 이 방식은 특수 문자를 선택적으로 검색할 수 있다는 장점이 있다.

```jsx
const target = 'abc#123';
const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

console.log(regExp.test(target)); // true
```

# 4. 기타 참고 자료

[RegExr](https://regexr.com/) - 정규 표현식을 배우고, 만들고, 시험할 수 있는 온라인 도구

[Regex tester](https://regex101.com/) - 정규 표현식 생성기/디버거

[Regex visualizer](https://extendsclass.com/regex-tester.html) - 시각적 정규 표현식 테스터

[MDN Regular Expressions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)