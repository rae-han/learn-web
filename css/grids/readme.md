# CSS: Cascading Style Sheets Core

# **Basic**

## 스타일 시트

### 브라우저 기본 스타일

- 웹 브라우저에 웹 문서를 표시할 때 브라우저에서 기본으로 사용하는 스타일
- 브라우저마다 다르기 때문에 reset.css나 normalize.css를 통해 초기화 해야한다.

### 인라인 스타일

- style 속성을 사용해 필요한 요소에 스타일을 직접 지정한다.

### 내부 스타일 시트

- 문서 앞부분에 스타일을 정의하고 관리.

### 외부 스타일 시트

- 스타일을 따로 파일로 저장한 후 연결해서 사용.

## CSS 기본 선택자

### 전체 선택자 (*)

- 문서의 모든 요소에 스타일을 적용

### 타입 선택자 (tagname)

- 특정 태그를 사용한 모든 요소에서 스타일을 적용

### 클래스 선택자 (.classname)

- 특정 부분만 선택해서 문서 안에 여러 번 적용
- class 속성에서 공백으로 여러개 사용이 가능하다.

### id 선택자 (#id)

- 특정 부분만 선택해서 문서 안에서 한번만 적용
- SPA에서는 전체 프로젝트에서 한번만 사용하는게 좋다.

### 그룹 선택자 (selectors, selectors)

- ,를 사용해 그룹화하여 여러 요소에 같은 스타일을 적용

## 스타일 우선순위

### 얼마나 중요한가?

1. 사용자 스타일
2. 제작자 스타일
3. 브라우저 기본 스타일

### 적용 범위는 어디까지인가? (가장 중요)

1. !important
2. 인라인 스타일
3. id 스타일
4. 클래스 스타일
5. 타입 스타일
- 선택자 우성순위 계산(specificity 계산)
    - 더 특정적인 선택자가 우선한다.
    - 나열된 선택자들 중 ID에는 100점, class에는 10점, 엘리먼트(태그 이름)에는 1점을 부과하여 더 높은 점수를 부여받은 선택자를 우선시한다.

### 소스 작성 순서는 어떠한가?

- 나중에 작성한 스타일이 먼저 작성한 스타일을 덮어 씀

# **CSS Selectors**

## 연결 선택자

### 하위 선택자

- 상위요소 하위요소
- 사우이 요소에 포함된 모든 하위 요소를 선택

### 자식 선택자

- 부모요소 > 자식요소
- 부모 요소에 포함된 자식 요소만 선택

### 인접 형제 선택자

- 요소1 + 요소2
- 요소1 이후 맨 먼저 오는 형제 요소를 선택

### 형제 선택자

- 요소1 ~ 요소2
- 요소1과 형제인 모든 요소를 선택

## 속성 선택자

### [속성]

- 해당 속성이 있는 요소
- [required], [disabled], [href]

### [속성 = 값]

- 지정한 속성값이 있는 요소
- [target = _blank], [disabled = true], [href=”https://example.org”]

### [속성 ~= 값]

- 지정한 속성값이 포함된 요소(단어별)
- [class ~= button], [class ~= container], [class ~= logo]

### [속성 |= 값]

- 지정한 속성값이 포함된 요소(하이픈 포함, 단어별)
- [title |= us], [title |= ko]

### [속성 ^= 값]

- 지정한 속성값으로 시작하는 요소
- [title ^= eng]

### [속성 $= 값]

- 지정한 속성값으로 끝나는 요소
- [href ^= xls]

### [속성 *= 값]

- 지정한 속성값의 일부가 일치하는 요소
- [href *= co.kr]

## 가상 클래스

### :link

- 방문하지 않은 링크에 스타일을 적용

### :visited

- 방문했던 링크에 스타일을 적용

### :hover

- 지정한 요소에 마우스 포인터를 올려놓을 때 스타일을 적용

### :active

- 지정한 요소를 활성했을 때 스타일을 적용

### :focus

- 지정한 요소에 초점이 맞춰졌을 때 스타일을 적용

### :target

- 앵커 대상에 스타일을 적용

### ::selection

- 사용자가 드래그한 글자를 선택

### :enabled

- 지정한 요소를 사용할 수 있는 상태일 때 스타일을 적용
- 보통 :disabled 값만 적용해줘도 문제 없다.

### :disabled

- 지정한 요소를 사용할 수 없는 상태일 때 스타일을 적용

### :checked

- 선택한 요소의 스타일을 적용

### :not

- 지정한 요소가 아닐 때 선택해서 스타일을 적용

### 가상 클래스 추가 설명

- active, hover는 반응 선택자, checked, focus, enabled, disabled는 상태 선택자, link, visited는 링크 선택자로 불린다.
- 반응 선택자와 링크 선택자는 순서가 중요한데 순서가 바뀌면 제대로 적용이 안될수도 있다. LoVe HAte로 외우면 쉽다.
    1. :link
    2. :visited
    3. :hover
    4. :active

## 구조 가상 클래스

### :only-child

- 부모 안에 자식 요소가 하나뿐일 때 자식 요소를 선택

### A:only-type-of

- 부모 안에 A 요소가 하나뿐일 때 선택

### :first-child

- 부모 안에 있는 모든 요소 중에서 첫 번째 자식 요소를 선택

### :last-child

- 부모 안에 있는 모든 요소 중에서 마지막 자식 요소를 선택

### A:first-of-type

- 부모 안에 있는 A 요소 중에서 첫 번째 요소를 선택

### A:last-of-type

- 부모 안에 있는 A 요소 중에서 마지막 요소를 선택

### :nth-child(n)

- 부모 안에 있는 모든 요소 중에서  n번째 자식 요소를 선택

### :nth-last-child(n)

- 부모 안에 있는 모든 요소 중에서 끝에서 n번째 자식 요소를 선택

### A:nth-of-type(n)

- 부모 안에 있는  A 요소 중에서 n번째 요소를 선택

### A:nth-last-of-type(n)

- 부모 안에 있는 A 요소 중에서 끝에서 n번째 요소를 선택

## 가상 요소

### ::first-line

- 첫 번째 줄을 선택

### ::first-letter

- 줄에서 첫 번째 글자를 선택

### ::before, ::after

- 특정 요소의 앞이나 뒤에 내용이나 스타일을 추가

# CSS Layout

## Flexbox Layout

### display

- 플렉스 컨테이너를 지정
- flex, inline-flex

### flex-direction

- 플렉스 항목에서 주축과 방향을 지정
- row, row-reverse, column, column-reverse

### flex-wrap

- 컨테이너 너비보다 항목이 많을 경우 줄바꿈 여부를 지정
- nowrap, wrap, wrap-reverse

### flex-flow

- 배치 방향과 줄 바꿈을 한번에 지정
- flex-direction 속성 값, flex-wrap 속성 값을 함께 기입

### justify-content

- 주축에서 플렉스 항목 정렬 방법을 지정
- flex-start, flex-end, center, space-between, space-around ...

### align-items

- 교차축에서 플렉스 항목 정렬 방법을 지정
- flex-start, flex-end, center, baseline, stretch ...

### align-self

- 특정 플렉스 항목의 정렬 방법을 지정
- flex-start, flex-end, center, baseline, stretch ...

### align-content

- 여러 줄일 때 교차축 정렬 방법을 지정
- flex-start, flex-end, center, space-between, space-around, stretch ...

### order

- 플렉스 항목의 배치 순서를 지정한다.
- 기본 배치 순서는 플렉스 항목을 감싼 플렉스 컨테이너에 추가된 순서이며 기본 값은 0이다.

### flex-gorw

- 플렉스 항목의 너비에 대한 확대 인자를 지정한다.
- 기본값은 0이며, 음수값은 무효하다.

### flex-shrink

- 플렉스 항목의 너비에 대한 축소 인자를 지정한다.
- 기본값은 1이고 음수값은 무효하다.
- 0을 지정하면 축소가 해제되어 원래의 너비를 유지한다.

### flex-basis

- 플렉스 항목의 너비 기본값을 px, %등의 단위로 지정한다
- 기본값은 auto이다.

### flex

- 플렉스 항목의 너비를 줄이거나 늘린다.
- 아래 flex-grow, flex-shrink, flex-basis 속성의 shorthand이며 기본 값은 0 1 auto 이다.
- 1개에서 3개까지의 값, auto, initial

## Grid Layout

### display

- 그리드 컨테이너를 지정한다.

### grid-template-columns, grid-template-rows

- 각 칼럼의 너비를 지정한다.
- 길이와 백분율을 사용하여 그리드를 생성하는 것 외에도 fr 단위를 사용하여 그리드 행과 열을 가변적으로 조정할 수 있다. 이 단위는 컨테이너 내부에 사용 가능한 공간에서 한 개의 분할 부분과 같다.

### gap, (grid-gap, grid-column-gap, grid-row-gap)

- 열과 행 사이의 간격을 지정한다.
- 원래는 접두사를 사용했지만 규격이 변경 됐다. 다만 지원하지 않는 브라우저가 있으니 두 속성 모두 사용하는 것을 권장한다.

### grid-column, grid-column-start, grid-column-end

- 열의 시작 라인 번호와 끝 라인 번호를 적는다. grid-column에서는 / 로 구분하여 적용한다.

### grid-row, grid-row-start, grid-row-end

- 행의 시작 라인 번호와 끝 라인 번호를 슬래시(/)를 넣어 사용한다. start와 end는 각각 적어주면 된다.

```jsx
<div class="container1">
  <div class="header">header</div>
  <div class="article">article</div>
  <div class="aside">aside</div>
  <div class="footer">footer</div>
</div>

.container1 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  .header {
    grid-column: 1/3;
    grid-row: 1;
    background: red;
  }
  .article {
    grid-column: 2;
    grid-row: 2;
    background: green;
  }
  .aside {
    grid-column: 1;
    grid-row: 2;
    background: yellow;
  }
  .footer {
    grid-column: 1/3;
    grid-row: 3;
    background: blue
  }
}
```

![스크린샷 2022-02-14 오후 9.37.05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a936a92-42aa-4a10-b00c-277dfe10e340/스크린샷_2022-02-14_오후_9.37.05.png)

### grid-area

- 템플릿 이름을 지정한다.

### grid-template-areas

- grid-area를 사용해 템플릿 그리드를 만든다.

```jsx
<div class="container2">
  <div class="header">header</div>
  <div class="article">article</div>
  <div class="aside">aside</div>
  <div class="footer">footer</div>
</div>

.container2 {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 1fr 3fr;

  .header {
    grid-area: header;
    background: red;
  }
  .article {
    grid-area: content;
    background: green;
  }
  .aside {
    grid-area: sidebar;
    background: yellow;
  }
  .footer {
    grid-area: footer;
    background: blue
  }
}
```

![스크린샷 2022-02-14 오후 9.37.21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/11c3750a-25d4-4035-9547-972d42c9f347/스크린샷_2022-02-14_오후_9.37.21.png)

### repeat()

- 같은 값을 여러 번 방복할 때 사용하는 함수이다.
- repeat(반복 횟수, 크기 값 or auto)
- grid-template-columns: repeat(3, 1fr) === 1fr 1fr 1fr

### minmax()

- 최소값과 최대값을 지정하는 함수이다.
- minmax(최소값, 최대값) → 크기값, auto-fill, auto-fit

### grid-auto-rows, grid-auto-columns

- 그리드의 크기를 자동으로 지정하게 해준다.