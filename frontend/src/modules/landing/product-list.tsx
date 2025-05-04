import { useGetProduct } from '@/hooks/products/use-get-product'
import ProductCard from '../_components/card-product'
import { SectionLayout } from '@/components/section-layout'

export const ProductList = () => {
  const { data } = useGetProduct({
    page: 1,
    per_page: 6,
  })
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.data.map((product) => (
          <div key={product.id}>
            <ProductCard
              description={product.description}
              title={product.name}
              key={product.id}
              price={product.variants[0].price}
              rating={product.ratings.average}
              reviewCount={product.ratings.count}
              prefix="Rp."
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  )
}
