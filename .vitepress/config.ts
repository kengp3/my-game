import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hant',
  title: '赤血沙漠 攻略 Wiki',
  description: '最完整的赤血沙漠攻略資料庫',
  base: '/my-game/',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap',
      rel: 'stylesheet'
    }]
  ],

  appearance: 'dark',

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '新手入門', link: '/guide/beginner/' },
      { text: '主線劇情', link: '/guide/story/' },
      { text: 'Boss 攻略', link: '/guide/bosses/' },
      { text: '角色職業', link: '/guide/characters/' },
      { text: '裝備圖鑑', link: '/guide/equipment/' },
      { text: '地圖探索', link: '/guide/maps/' },
      { text: '系統機制', link: '/guide/systems/' },
    ],

    sidebar: {
      '/guide/beginner/': [
        {
          text: '新手入門',
          items: [
            { text: '新手指南', link: '/guide/beginner/' },
            {
              text: '戰鬥教學',
              collapsed: false,
              items: [
                { text: '基礎操作', link: '/guide/beginner/combat-basics' },
                { text: '連招系統', link: '/guide/beginner/combat-combos' },
                { text: '防禦與招架', link: '/guide/beginner/combat-defense' },
              ]
            }
          ]
        }
      ],
      '/guide/story/': [
        {
          text: '主線劇情',
          items: [
            { text: '主線總覽', link: '/guide/story/' },
            { text: '序幕：黑夜突襲', link: '/guide/story/chapter-prologue' },
            { text: '第一章：初次相遇', link: '/guide/story/chapter-1' },
            { text: '第二章：金色的貪欲', link: '/guide/story/chapter-2' },
            { text: '第三章：嚎叫丘', link: '/guide/story/chapter-3' },
            { text: '第四章：知識的代價', link: '/guide/story/chapter-4' },
            { text: '第五章：不速之客', link: '/guide/story/chapter-5' },
            { text: '第六章：盾牌的裂縫', link: '/guide/story/chapter-6' },
            { text: '第七章：歸鄉', link: '/guide/story/chapter-7' },
            { text: '第八章：血色加冕', link: '/guide/story/chapter-8' },
            { text: '第九章：沙漠聖者', link: '/guide/story/chapter-9' },
            { text: '第十章：反擊', link: '/guide/story/chapter-10' },
            { text: '第十一章：真相與現實', link: '/guide/story/chapter-11' },
            { text: '第十二章：深淵', link: '/guide/story/chapter-12' },
          ]
        }
      ],
      '/guide/bosses/': [
        {
          text: 'Boss 攻略',
          items: [
            { text: 'Boss 一覽', link: '/guide/bosses/' },
            { text: '裂角凱洛克（Kailok）', link: '/guide/bosses/example-boss' }
          ]
        }
      ],
      '/guide/characters/': [
        {
          text: '角色職業',
          items: [
            { text: '角色職業', link: '/guide/characters/' }
          ]
        }
      ],
      '/guide/equipment/': [
        {
          text: '裝備圖鑑',
          items: [
            { text: '裝備一覽', link: '/guide/equipment/' },
            { text: '主之劍（Sword of the Lord）', link: '/guide/equipment/example-equipment' }
          ]
        }
      ],
      '/guide/maps/': [
        {
          text: '地圖探索',
          items: [
            { text: '地圖一覽', link: '/guide/maps/' },
            { text: '埃爾南德（Hernand）', link: '/guide/maps/example-area' }
          ]
        }
      ],
      '/guide/systems/': [
        {
          text: '系統機制',
          items: [
            { text: '系統說明', link: '/guide/systems/' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜尋攻略內容...' },
              modal: {
                noResultsText: '找不到相關內容',
                resetButtonTitle: '清除搜尋',
                footer: { closeText: '關閉', navigateText: '導航', selectText: '選擇' }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
              return Array.from(segmenter.segment(text))
                .filter(s => s.isWordLike)
                .map(s => s.segment)
            }
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        }
      }
    },

    footer: {
      message: '赤血沙漠 攻略 Wiki — 非官方玩家社群攻略'
    }
  }
})
