# Testing Guide

このプロジェクトは[Vitest](https://vitest.dev/)を使用してテストを行っています。

## テストの実行

### 基本的なコマンド

```bash
# 全テストを実行
pnpm test:run

# ウォッチモードでテストを実行（開発時に便利）
pnpm test

# UIモードでテストを実行
pnpm test:ui

# カバレッジレポートを生成
pnpm test:coverage
```

## テストの構成

### 1. コンポーネントテスト (`CodeMirror.spec.ts`)

基本的なコンポーネントの機能をテストします：

- **レンダリング**: コンポーネントが正しくレンダリングされるか
- **Props**: 各プロパティが正しく動作するか
- **イベント**: `ready`, `update`, `change`, `destroy`などのイベントが正しく発火するか
- **V-Model**: 双方向バインディングが正しく動作するか
- **スロット**: スロットコンテンツが正しく表示されるか
- **公開メソッド**: `getRange()`, `setCursor()`などのメソッドが正しく動作するか

### 2. SSR互換性テスト (`CodeMirror.ssr.spec.ts`)

サーバーサイドレンダリング環境での動作をテストします：

- **サーバーサイドレンダリング**: SSR環境でエラーなくレンダリングされるか
- **安全なメソッド呼び出し**: `view`が未初期化でもメソッドがエラーを投げないか
- **クライアントサイドハイドレーション**: ブラウザでの初期化が正しく行われるか
- **グレースフルデグラデーション**: 機能が段階的に提供されるか
- **メモリリーク防止**: コンポーネントが正しくクリーンアップされるか

## テストの追加

新しい機能を追加する場合は、対応するテストも追加してください：

```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CodeMirror from '@/components/CodeMirror';

describe('New Feature', () => {
  it('should work correctly', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        modelValue: 'test',
        // 新機能のprops
      },
    });

    // テストロジック
    expect(wrapper.exists()).toBe(true);
  });
});
```

## テスト環境

- **テストランナー**: Vitest
- **DOM環境**: happy-dom（軽量で高速）
- **Vueテストユーティリティ**: @vue/test-utils
- **アサーション**: Vitest標準のexpect API

## カバレッジ

カバレッジレポートは以下を除外しています：

- `node_modules/`
- `src-docs/` (ドキュメントサイト)
- `dist/` (ビルド出力)
- `**/*.d.ts` (型定義ファイル)
- `**/*.config.*` (設定ファイル)
- `src/Meta.ts` (自動生成ファイル)
- `src/helpers/h-demi.ts` (Vue 2/3互換レイヤー)

## ベストプラクティス

### 1. テストは独立させる

各テストは他のテストに依存しないようにしてください。

```typescript
beforeEach(() => {
  // 各テストの前にクリーンアップ
  document.body.innerHTML = '';
});
```

### 2. 非同期処理を待つ

コンポーネントのライフサイクルを待つために`nextTick()`を使用してください。

```typescript
await nextTick();
await nextTick(); // onMountedを待つ
```

### 3. クリーンアップ

テスト後はコンポーネントをアンマウントしてください。

```typescript
wrapper.unmount();
```

### 4. 意味のあるアサーション

テストは何をテストしているかが明確になるようにしてください。

```typescript
// 良い例
expect(wrapper.props('readonly')).toBe(true);

// 避けるべき例
expect(wrapper.props('readonly')).toBeTruthy();
```

## トラブルシューティング

### テストがタイムアウトする

長時間かかるテストにはタイムアウトを設定できます：

```typescript
it('long running test', { timeout: 10000 }, async () => {
  // テストコード
});
```

### DOMが見つからない

`attachTo`オプションを使用してDOMに直接マウントしてください：

```typescript
const wrapper = mount(CodeMirror, {
  props: { modelValue: 'test' },
  attachTo: document.body,
});

// 忘れずにクリーンアップ
wrapper.unmount();
```

### メモリリーク

テスト後に適切にクリーンアップされているか確認してください：

```typescript
afterEach(() => {
  // 必要に応じてグローバルな状態をリセット
});
```

## CI/CD

GitHub ActionsなどのCI環境でテストを実行する場合は、`pnpm test:run`を使用してください。これはウォッチモードなしで一度だけテストを実行します。

```yaml
- name: Run tests
  run: pnpm test:run
```

## 参考リンク

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Happy DOM](https://github.com/capricorn86/happy-dom)
