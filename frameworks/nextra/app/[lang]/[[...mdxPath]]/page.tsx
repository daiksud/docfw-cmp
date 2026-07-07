import { generateStaticParamsFor, importPage } from 'nextra/pages'
import type { FC } from 'react'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'
import { getDictionary } from '../../_dictionaries/get-dictionary'
import { CopyPage } from '../_components/copy-page'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

const Page: FC<PageProps> = async props => {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  const dictionary = await getDictionary(params.lang)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {sourceCode && (
        <CopyPage sourceCode={sourceCode} dict={dictionary.copyPage} />
      )}
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

export default Page
