import React from "react"
import { Head } from "blitz"

const Meta = (props) => {
  /* SEO対策: page_name, page_description, keywords */
  const {
    title,
    description = "「たぶんアレくらい」はある項目に対するランキングだけでなく、別ランキングにおける位置づけを合わせて表示し、相対的な位置関係や度合いを把握してもらうサイトです。",
    keywords = "",
  } = props
  return (
    <Head>
      {title ? <title>{`${title} | たぶんアレくらい`}</title> : <title>たぶんアレくらい</title>}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  )
}

export default Meta
