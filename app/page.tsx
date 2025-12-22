import { getWordPressPageBySlug } from "@/lib/wordpress-api"
import { PageContent } from "@/components/page-content"
import { VideoHero } from "@/components/video-hero"
import { notFound } from "next/navigation"

export default async function Home() {
  const page = await getWordPressPageBySlug("accueil")

  if (!page) {
    notFound()
    return null
  }

  // const hasHeroGallery = page.acf?.galerie && page.acf.galerie.length > 0

  return (
    <div className="min-h-screen">
      <VideoHero videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-12-15%20at%2010.10.41-UnZ2sBv3uYuVfgjEu6tExpjlhPk8MD.mp4" />

      <div className="relative bg-white">
        <PageContent content={page.acf?.contenu} images={page.acf?.images} />

        <div className="container mx-auto px-3 md:px-4 py-12">
          {page.content?.rendered && (
            <article className="prose prose-lg max-w-4xl mx-auto">
              <div
                className="text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
