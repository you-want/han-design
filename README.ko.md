# 汉 · Han

AI Agent를 위한 중국 문화 디자인 Skill입니다. 선지, 묵색, 주홍, 서예, 두루마리, 전통 구도를 재사용 가능한 디자인 토큰, 테마, 시각 레시피, 문화적 판단 규칙으로 변환합니다.

**언어 / Languages：** [简体中文](README.md) · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)（현재）

## 왜 "Han"인가

우리의 신분증에는 한족이라 적혀 있고, 우리는 한어를 말하고, 한자를 씁니다. 우리가 만든 이 중국풍 디자인 시스템은 당연히 han-design이라 불러야 합니다.

## 특징

- 7개 왕조 테마: 진한, 위진, 당, 송, 원, 명, 청
- 9개 문화 테마: 수묵, 청록산수, 청화자, 돈황, 궁정금, 무협, 다도, 주사, 청자
- 완전한 CSS 토큰, 컴포넌트, 아이콘, 문양, 모션
- 6개 풀페이지 Starter: 브랜드, 제품, 대시보드, 전시, 이벤트, 장문
- 테마, 시각 강도, 콘텐츠 보완, 스크린샷 리뷰를 지원하는 자동운전 디자인 플로우
- 표준 Agent Skill frontmatter와 독립 설치 가능한 디렉토리
- 반응형, 키보드 포커스, reduced-motion 기본 지원
- 빌드 단계 없는 정적 HTML 예제

## 현재 버전

Han의 현재 버전은 `v0.1.0-preview.0`으로, 설치 시험, 페이지 생성, 피드백 수집에 적합합니다. 이것은 디자인 Skill과 시각 에셋 팩이지, 범용 프론트엔드 컴포넌트 라이브러리가 아닙니다. 복잡한 인터랙션은 대상 프로젝트의 기존 네이티브 또는 접근 가능한 컴포넌트를 계속 사용하세요.

## 저장소 구조

```text
han/
├── .codex-plugin/plugin.json   # Codex Plugin 매니페스트
├── skills/
│   └── han-design/              # 독립 설치 가능한 Skill
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── references/
│       └── assets/
│           ├── han.css          # 전체 CSS 진입점
│           ├── han-scoped.css   # 토큰과 규칙이 data-han-scope에 제약
│           ├── base.css         # 전체 진입점만 사용하는 글로벌 기본 스타일
│           ├── utilities.css    # scoped 안전한 레이아웃과 타이포그래피 유틸리티
│           ├── accessibility.css
│           ├── fonts.css        # 옵션 원격 폰트
│           ├── *.css
│           └── snippets/
├── examples/                    # 데모 사이트, Skill/Plugin 코어에 포함되지 않음
├── scripts/validate.mjs
├── vercel.json
├── LICENSE
└── README.md
```

## Agent Skill로 설치

저장소 클론:

```bash
git clone https://github.com/you-want/han-design.git han
```

설치 가능한 Skill 디렉토리는:

```text
skills/han-design
```

Agent Skills의 권장 공통 설치 위치는 `~/.agents/skills/`입니다:

```bash
mkdir -p "$HOME/.agents/skills"
cp -R skills/han-design "$HOME/.agents/skills/han-design"
```

PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME/.agents/skills" | Out-Null
Copy-Item -Recurse -Force "skills/han-design" "$HOME/.agents/skills/han-design"
```

Codex는 여전히 `~/.codex/skills/`를 지원합니다. Agent Skills를 지원하는 다른 도구는 해당 설치기나 설정을 `skills/han-design/`에 향하게 하세요. 도구마다 자동 발견 디렉토리가 다릅니다.

저장소 루트에는 `.codex-plugin/plugin.json`도 포함되어 있어 Codex Plugin 소스로 사용할 수 있습니다. 저장소 예제와 서드파티 데모 이미지를 포함하지 않는 릴리스 디렉토리 생성:

```bash
node scripts/package-plugin.mjs
```

설치 후 이렇게 호출할 수 있습니다:

> han-design을 사용해 절제된 송풍의 제품 랜딩 페이지를 생성해 주세요.

> han-design으로 현재 페이지를 리팩터링하고, 기존 React 컴포넌트와 인터랙션을 유지해 주세요.

설계 판단을 Han에 직접 맡길 수도 있습니다:

> han-design을 사용해 현재 페이지를 더 아름답게 만들어 주세요. 프로젝트를 확인한 후 페이지 유형, 테마, 시각 강도를 스스로 판단하고, 기능과 기술 스택을 유지하며, 데스크톱과 모바일 검토를 완료하고 한 라운드 수정해 주세요.

사용자는 테마 ID, 컴포넌트 클래스명, 어떤 Starter를 사용해야 하는지 알 필요가 없습니다. Han은 먼저 내부 디자인 브리프를 생성한 후, 풀페이지 구도, 테마, 시각 강도, 콘텐츠 보완 전략을 선택합니다.

복사해서 사용 가능한 호출 작업은 [Skill 호출 예시](examples/skill-prompts.md)를 참고하세요.

## CSS 직접 사용

`skills/han-design/assets/`를 프로젝트에 복사합니다. 단독 페이지는 전체 진입점 사용:

```html
<!-- 옵션: jsDelivr과 Google Fonts에서 폰트를 로드합니다 -->
<link rel="stylesheet" href="/han/fonts.css">

<!-- 디자인 토큰, 테마, 모든 컴포넌트 -->
<link rel="stylesheet" href="/han/han.css">
```

기존 앱이나 디자인 시스템은 글로벌 리셋을 포함하지 않는 진입점을 사용해야 합니다:

```html
<link rel="stylesheet" href="/han/han-scoped.css">

<section data-han-scope data-theme="song">
  <button type="button" class="han-btn-seal">확인</button>
</section>
```

`han-scoped.css`는 `:root`에 Han 토큰을 정의하지 않으며, 글로벌 `body`, 제목, 단락, 링크, 폼 컨트롤, 미디어 요소, 스크롤바도 수정하지 않습니다. 토큰, 다크 모드, 테마 변수는 `data-han-scope` 안에서만 유효합니다. 레이아웃 기초와 요소 기본 스타일은 계속 호스트 프로젝트가 책임집니다.

테마 선택:

```html
<html lang="zh-CN" data-theme="song">
```

다크 모드:

```html
<html lang="zh-CN" data-theme="song" data-color-mode="dark">
```

Han의 핵심 릴리스는 `skills/han-design/` Skill 패키지이며, npm 컴포넌트 라이브러리를 목표로 하지 않습니다. 에셋을 복사한 후, 단독 페이지는 `han.css`, 기존 앱은 `han-scoped.css`를 사용합니다.

## 테마

### 왕조 테마

이 테마들은 현대 웹을 위한 시각적 해석이지, 역사적 복원이 아니며, 한 왕조의 전체 시각 문화를 대표하지도 않습니다.

| 테마 | `data-theme` | 분위기 |
|---|---|---|
| 진한 | `qinhan` | 칠기, 석각, 중후한 소재감 |
| 위진 | `weijin` | 표일하고 청준 |
| 당 | `tang` | 옹용하고 명려 |
| 송 | `song` | 청아하고 절제 |
| 원 | `yuan` | 다원적, 대비가 선명 |
| 명 | `ming` | 정교하고 정연 |
| 청 | `qing` | 화려하고 번복 |

### 문화 테마

| 테마 | `data-theme` |
|---|---|
| 수묵 | `ink` |
| 청록산수 | `landscape` |
| 청화자 | `porcelain` |
| 돈황 | `dunhuang` |
| 궁정금 | `imperial` |
| 무협현묵 | `wuxia` |
| 현대 다공간 | `tea` |
| 주사경사 | `vermilion` |
| 청자 | `celadon` |

### 현대 컬러 테마

이 테마들은 저장소 내 참고 이미지의 컬러 카드에서 번역된 것으로, 현대 웹을 위한 컬러 시스템이지 어떤 공식 통화 컬러 사양도 아닙니다.

| 테마 | `data-theme` | 분위기 |
|---|---|---|
| 송맥 | `pine-wheat` | 자연적, 신선, 고요 |
| 등자 | `plum-blush` | 부드러움, 로맨틱, 라이트 럭셔리 |
| 해란 | `ocean-orchid` | 차분, 투명, 우아 |
| 초당 | `caramel-cream` | 따뜻, 빈티지, 프리미엄 |
| 박하 | `mint-lavender` | 투명, 자연, 가벼움 |
| 매과 | `berry-butter` | 명快, 트렌디, 활력 |

## 예제

- [빠른 시작](examples/quick-start.html) — 전체 구조 예제
- [Mac 컨셉 페이지](examples/mac-han.html) — 전체 구조 예제, 이미지 라이선스는 아래 설명 참조
- [범위 테마 통합](examples/scoped-integration.html) — scoped CSS 전체 구조 예제
- [브랜드 시각 실험](examples/landing-page.html) — 정적 시각 참조
- [테마 쇼케이스](examples/theme-showcase.html) — 정적 시각 참조
- [전체 컴포넌트 쇼케이스](examples/showcase.html) — 정적 시각 참조
- [단일 컴포넌트 예제](examples/components/) — 정적 시각 참조

`examples/`는 독립된 데모 사이트로, Skill이나 Plugin 핵심 릴리스에 포함되지 않으며 핵심 유효성 판정에도 참여하지 않습니다. 예제는 저장소 내 상대 경로를 사용하며 정적 사이트로 직접 배포할 수 있습니다. 전체 구조/시각 참조 등급은 `examples/validation.json`에 기록되어 있습니다. Vercel 설정은 홈페이지를 브랜드 시각 실험 페이지에 매핑합니다.

`data-han-static-reference="true"`를 가진 페이지는 시각 상태만 표시합니다. Modal, Tabs, 커스텀 Select, Date Picker, Tree, Upload 등 복잡한 컨트롤은 표시 구조를 복사하는 것만으로는 프로덕션에 사용할 수 없습니다. 컴포넌트 카탈로그에 따라 키보드, 포커스, 상태, ARIA를 보완하거나, Han 스타일을 대상 프로젝트의 기존 접근 가능한 컴포넌트에 적용하세요.

## Skill 리소스

- [Skill 지시](skills/han-design/SKILL.md)
- [상세 디자인 가이드](skills/han-design/references/design-guide.md)
- [현대 컬러 테마](skills/han-design/references/contemporary-palettes.md)
- [컴포넌트 카탈로그](skills/han-design/references/component-catalog.md)
- [문화 방법론](skills/han-design/references/cultural-methodology.md)
- [왕조 테마 경계](skills/han-design/references/dynasty-contexts.md)
- [문양 의미론](skills/han-design/references/motif-semantics.md)
- [서예와 인장](skills/han-design/references/calligraphy-and-seals.md)
- [지역, 민족, 생활 문화](skills/han-design/references/regional-and-ethnic-contexts.md)
- [문화 출처 색인](skills/han-design/references/cultural-sources.md)
- [작업 레시피](skills/han-design/references/task-recipes.md)
- [자동운전과 디자인 브리프](skills/han-design/references/autopilot.md)
- [페이지 유형과 풀페이지 Starter](skills/han-design/references/page-archetypes.md)
- [시각 리뷰와 2차 수정](skills/han-design/references/visual-review.md)
- [출력 품질 평가](skills/han-design/references/output-evaluation.md)
- [전체 CSS 진입점](skills/han-design/assets/han.css)
- [Scoped CSS 진입점](skills/han-design/assets/han-scoped.css)
- [HTML snippets](skills/han-design/assets/snippets/)
- [단독 HTML 출력 검사](skills/han-design/scripts/check-output.mjs)
- [브라우저 출력 검사](skills/han-design/scripts/check-browser-output.mjs)

Skill은 참조 문서를 온디맨드로 읽으며, 각 작업 시작 시 모든 CSS를 로드하지 않습니다. 풀페이지를 새로 구축할 때는 `skills/han-design/assets/starters/`에서 브랜드, 제품, 대시보드, 전시, 이벤트, 장문 구도를 우선적으로 선택한 후 대상 프레임워크로 번역하세요.

시각 강도는 4단계입니다: `0`은 토큰 층만, 대시보드용; `1`은 절제, 제품과 브랜드 페이지용; `2`는 선명, 차, 공예, 문화 브랜드용; `3`은 드라마틱, 축제, 전시, 게임 이벤트용. 이것은 장식 예산이지, 페이지에 컴포넌트를 더 쌓으라는 요구가 아닙니다.

## 개발과 검증

핵심 Skill / Plugin 검증:

```bash
npm ci
npm run generate:scoped
npm run validate
npm run eval:check
npm run test:browser
npm run check:browser-output -- --strict tests/fixtures/scoped-host.html
npm run package:plugin
```

`check-output.mjs`는 의존성 없는 정적 사전 검사입니다; `check-browser-output.mjs`는 Playwright와 axe를 사용해 브라우저에서 계산된 접근성, 포커스, 가로 오버플로, 런타임 예외, reduced-motion을 검사합니다.

`evals/cases.json`은 더 이상 스키마 검증만 하지 않습니다. 실제 포워드 테스트는 adapter를 통해 실행됩니다:

```bash
node scripts/run-evals.mjs --adapter /path/to/agent-adapter.mjs
```

adapter는 표준 입력에서 case id와 사용자 프롬프트만 받으며, `shouldTrigger`, 예상 reference, 예상 진입점은 보지 않습니다. 그것은 `triggered`, `references`, `assetEntry`, 그리고 옵션으로 `starter`, `intensity`, `designBrief`, `reviewedViewports`, `revisionPerformed`, `checksPassed`, `outputPath`를 출력합니다. 자동운전 케이스는 Agent가 정말로 디자인 브리프, 데스크톱과 모바일 리뷰, 최소 1라운드 수정을 완료하고, 검사가 통과될 때까지 처리 가능한 문제를 수정했는지 확인합니다. 저장소는 범용 외부 Agent command adapter를 제공합니다:

```bash
HAN_EVAL_AGENT=/path/to/agent \
HAN_EVAL_AGENT_ARGS='["arguments","for-a-fresh-session"]' \
node scripts/run-evals.mjs --adapter scripts/eval-adapters/agent-command.mjs
```

`evals/fixtures/smoke-adapter.mjs`는 runner 파이프라인만 검증합니다. `--allow-smoke-adapter`를 명시적으로 전달해야 하며, 모델 품질 결과로 취급할 수 없습니다.

예제 사이트 검증은 별도 실행:

```bash
node scripts/validate-examples.mjs
```

검증 내용:

- Skill frontmatter와 디렉토리 명명
- 필수 파일과 로컬 참조
- CSS 사용자 정의 속성
- 테마 기능 색 대비와 의미 토큰
- 문화 references와 고위험 절대적 표현
- HTML snippet의 기본 의미 문제
- Plugin 매니페스트와 scoped CSS 진입점
- Skill eval 케이스 구조
- 실행 가능 eval runner와 adapter 결과 평가
- 다크 모드 기능 색 대비
- Skill 패키지 내부 참조와 릴리스 패키지 경계
- 공식 Skill/Plugin validator 스냅샷
- Playwright, axe, scoped 격리, 키보드, reduced-motion 테스트

GitHub Actions는 두 개의 독립 작업을 사용합니다: `Validate Skill and Plugin core`는 저장소 검증, Codex 표준 validator 스냅샷, eval runner 계약, Playwright/axe 브라우저 테스트, 릴리스 패키지 재검증을 실행합니다; `Validate demo website`는 README와 예제 사이트를 별도로 검사합니다. 예제 사이트 문제는 Skill schema나 런타임 패키지 문제로 기술되지 않습니다.

## 기여

테마, 컴포넌트, 접근성 수정, 예제, 문서 개선의 기여를 환영합니다.

1. 저장소를 포크하고 기능 브랜치를 생성합니다.
2. Skill, assets, references, evals, Plugin 매니페스트를 수정한 후 `node scripts/validate.mjs`를 실행합니다.
3. `examples/`, README의 예제 링크, Vercel 페이지를 수정한 후 `node scripts/validate-examples.mjs`를 실행합니다.
4. 신규 컴포넌트에는 스타일, 성숙도 설명, 예제를 포함하세요; 복잡한 인터랙션은 키보드, 포커스, 상태, ARIA 동작을 설명해야 합니다.
5. Pull Request를 제출하고 시각적 의도와 검증 방법을 설명하세요.

역사, 지역, 민족, 종교, 문양, 생활 문화 콘텐츠를 신규 추가할 때는 출처, 적용 경계, 현대 번역 설명도 제공하세요.

## 폰트와 네트워크

`fonts.css`는 LXGW WenKai, Noto Serif SC, Noto Sans SC를 로드합니다. 오프라인, 엄격한 CSP, 프라이버시 민감, 또는 중국 대륙 네트워크 환경에서는 이 파일을 로드하지 않고, 디자인 토큰에 정의된 시스템 폰트 폴백을 사용하거나 폰트를 자체 호스팅하는 것을 권장합니다.

## License

[MIT](LICENSE)

MIT 라이선스는 Han 자체의 코드, 문서, 자체 제작 에셋을 커버하며, 서드파티 데모 자료를 자동으로 커버하지 않습니다. `examples/assets/apple-mac/`는 `scripts/package-plugin.mjs`가 생성하는 Plugin 릴리스 디렉토리에 포함되지 않습니다. 정확한 경계는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)를 참조하세요.
