import { PageHeader } from "@/components/page-header";
import { SiteCard, SiteCardGrid } from "@/components/ui/site-card";
import { notFound } from "next/navigation";

// À adapter selon la source de données réelle
async function getCategoryBySlug(slug: string) {
  // Remplace par ton fetch réel
  return {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Tous les contenus de la catégorie « ${slug} »` ,
    image: undefined,
    posts: [], // À remplir avec les vrais posts de la catégorie
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="pt-20 min-h-screen bg-background">
      <PageHeader
        title={category.name}
        subtitle={category.description}
        backgroundImage={category.image}
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Exemple d'affichage de posts */}
        <SiteCardGrid columns={3}>
          {category.posts.map((post: any) => (
            <SiteCard
              key={post.id}
              title={post.title}
              description={post.excerpt}
              image={post.image}
              href={post.href}
            />
          ))}
        </SiteCardGrid>
      </div>
    </div>
  );
}
