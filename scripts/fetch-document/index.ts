import { URL } from 'node:url'
import * as cheerio from 'cheerio'

const sites = new Set<string>([])

async function fetchDocumentLinks(url: string, selector: string): Promise<void> {
  /**
   * 指定されたURLとCSSセレクターを使用して、ドキュメントのリンクを取得する関数
   *
   * Args:
   *     url (string): ドキュメントの完全なURL
   *     selector (string): CSSセレクター
   *
   * Returns:
   *     None
   */

  // URLを解析して、ベースURLとドキュメントのパスを取得
  const parsedUrl = new URL(url)
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`

  // console.log(`baseUrl: ${baseUrl}`)

  try {
    // ページの内容を取得
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch the document: ${response.statusText}`)
    }
    const html = await response.text()

    // cheerioを使用してHTMLを解析
    const $ = cheerio.load(html)

    // 指定されたCSSセレクターを使用して要素を見つける
    const elements = $(selector)

    // console.log(`elements: ${elements.length}`)

    // 各要素の処理
    elements.each((_, elem) => {
      // もし、$(elem)がaタグだったら、リンクを取得、そうでないときは.find('a')する
      const links = $(elem).is('a') ? $(elem) : $(elem).find('a')
      links.each((_, link) => {
        // 相対リンクを絶対リンクに変換
        const href = $(link).attr('href')
        if (href) {
          const absoluteUrl = new URL(href, baseUrl).href
          // console.log(absoluteUrl)
          sites.add(absoluteUrl)
        }
      })
    })
  } catch (error) {
    // @ts-ignore
    console.error(`Error: ${error.message}`)
  }
}

type site = { url: string; selector: string }

async function main(): Promise<void> {
  /**
   * url、selectorを指定して下さい。
   */
  // ドキュメントのURLとCSSセレクターを指定
  const _sites: site[] = [
    {
      url: 'https://www.remotion.dev/docs/player',
      selector: 'nav[class*="menu"]',
    },
    // {
    //   url: 'https://www.remotion.dev/docs/',
    //   selector: 'li .menu__list-item',
    // },
    {
      url: 'https://www.remotion.dev/docs/api',
      selector: '.link_EHWF',
    },
  ]

  // ドキュメントのリンクを取得する関数を呼び出す
  for (const { url, selector } of _sites) await fetchDocumentLinks(url, selector)

  for (const site of sites) {
    console.log(site)
  }
}

// プログラムの実行
void main()
