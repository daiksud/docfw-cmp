import type { Dictionary } from './get-dictionary'

const dictionary: Dictionary = {
  logo: {
    title: 'ドキュメントフレームワーク比較'
  },
  banner: 'このサイトは docfw-cmp（ドキュメントフレームワーク比較）における Nextra の評価チャプターです。',
  backToTop: 'トップへ戻る',
  tocTitle: '目次',
  lastUpdated: '最終更新日',
  editPage: 'GitHub でこのページを編集',
  dark: 'ダーク',
  light: 'ライト',
  system: 'システム',
  search: {
    placeholder: 'ドキュメントを検索…',
    emptyResult: '検索結果が見つかりませんでした。',
    errorText: '検索インデックスの読み込みに失敗しました。',
    loading: '読み込み中…'
  },
  copyPage: {
    copy: 'ページをコピー',
    copied: 'コピーしました',
    copyDescription: 'LLM 向けに Markdown としてページをコピー',
    chatgptTitle: 'ChatGPT で開く',
    claudeTitle: 'Claude で開く',
    askDescription: 'このページについて質問する'
  },
  notFound: {
    title: '404: ページが見つかりません',
    link: '壊れたリンクについて報告する'
  }
}

export default dictionary
