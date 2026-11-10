---
description: vue-codemirror6 is a CodeMirror 6 editor component for Vue 2.7 and Vue 3 with v-model binding, linting, and SSR support.
pageType: home

hero:
  name: vue-codemirror6
  text: CodeMirror 6 for Vue
  tagline: A lightweight wrapper component that brings the CodeMirror 6 editor to Vue 2.7 and Vue 3.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Playground
      link: /playground
    - theme: alt
      text: GitHub
      link: https://github.com/logue/vue-codemirror6
  image:
    src: https://user-images.githubusercontent.com/480173/224358008-6ffad05d-1d97-4c18-8554-7d41b03f88ab.png
    alt: vue-codemirror6 logo
features:
  - title: Vue 2.7 & Vue 3
    details: Built on vue-demi, so the same component works in both Vue 2.7 and Vue 3 projects.
    icon: 💚
    link: /guide/introduction
  - title: Two-way binding
    details: Bind the document with v-model just like a native input. External updates can keep the scroll position.
    icon: 🔁
    link: /guide/usage
  - title: Languages, linters, and themes
    details: Pass any CodeMirror LanguageSupport, LintSource, or theme through props, or add raw extensions.
    icon: 🎨
    link: /guide/languages-and-themes
  - title: SSR ready
    details: CodeMirror is only initialized on the client, so the component renders safely in Nuxt and other SSR frameworks.
    icon: 🌐
    link: /guide/ssr
  - title: Web Component
    details: The same component is also exported as a custom element for use outside Vue (experimental).
    icon: 🧩
    link: /guide/web-components
  - title: Full editor API
    details: Access the EditorView, selection, and CodeMirror 5 style helper methods through a template ref.
    icon: 🛠️
    link: /api/instance
---
