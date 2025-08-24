'use client';

import React, { useEffect, useState } from 'react';
import { Search, ExternalLink, Star, ShoppingCart } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { BallRally } from '@/components/ui/loader/BallRally';
import { useI18n } from '@/lib/i18n';
import { get } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

type Product = {
  id: string;
  name: string;
  brand: string;
  description?: string;
  category: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all';
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  features?: string[];
  weight?: string;
  sizes?: string[];
  colors?: string[];
  buyUrl?: string;
};

export default function CatalogPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    priceRange: '',
    skillLevel: '',
  });

  // Seed/load products from storage
  useEffect(() => {
    const loadData = () => {
      const productsData = get('products', []) as Product[];
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    };
    // small delay to simulate fetch + let seed run
    const id = setTimeout(loadData, 300);
    return () => clearTimeout(id);
  }, []);

  // Apply filters
  useEffect(() => {
    const search = filters.search.toLowerCase();

    const next = products.filter((p) => {
      const name = (p.name ?? '').toLowerCase();
      const brand = (p.brand ?? '').toLowerCase();
      const desc = (p.description ?? '').toLowerCase();

      const matchesSearch =
        !search || name.includes(search) || brand.includes(search) || desc.includes(search);

      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesBrand = !filters.brand || p.brand === filters.brand;
      const matchesSkillLevel =
        !filters.skillLevel || p.skillLevel === filters.skillLevel || p.skillLevel === 'all';

      const matchesPrice =
        !filters.priceRange ||
        (filters.priceRange === 'low' && p.price <= 2000) ||
        (filters.priceRange === 'medium' && p.price > 2000 && p.price <= 8000) ||
        (filters.priceRange === 'high' && p.price > 8000);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesSkillLevel &&
        matchesPrice
      );
    });

    setFilteredProducts(next);
  }, [products, filters]);

  // ✅ No Set spread (works with ES5 target)
  const categories: string[] = Array.from(new Set(products.map((p) => p.category)));
  const brands: string[] = Array.from(new Set(products.map((p) => p.brand)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pb-20 md:pb-8 md:pl-64">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <BallRally />
              <p className="mt-4 text-gray-600">{t('common.loading')}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold text-navy">{t('nav.catalog')}</h1>

              {/* Search + Filters */}
              <div className="grid gap-4 md:grid-cols-6">
                {/* Search */}
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="pl-9"
                  />
                </div>

                {/* Category */}
                <Select
                  value={filters.category}
                  onChange={(e: any) =>
                    setFilters((prev) => ({ ...prev, category: e.target.value }))
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category?.charAt(0).toUpperCase() + category?.slice(1)}
                    </option>
                  ))}
                </Select>

                {/* Brand */}
                <Select
                  value={filters.brand}
                  onChange={(e: any) =>
                    setFilters((prev) => ({ ...prev, brand: e.target.value }))
                  }
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>

                {/* Skill Level */}
                <Select
                  value={filters.skillLevel}
                  onChange={(e: any) =>
                    setFilters((prev) => ({ ...prev, skillLevel: e.target.value }))
                  }
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>

                {/* Price */}
                <Select
                  value={filters.priceRange}
                  onChange={(e: any) =>
                    setFilters((prev) => ({ ...prev, priceRange: e.target.value }))
                  }
                >
                  <option value="">All Prices</option>
                  <option value="low">Under ₹2,000</option>
                  <option value="medium">₹2,000 - ₹8,000</option>
                  <option value="high">Above ₹8,000</option>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-600">
              {filteredProducts.length} products found
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 h-48 bg-gray-200 rounded-md flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating ?? '-'}</span>
                        <span className="text-gray-500">({product.reviews ?? 0})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        {product.skillLevel && product.skillLevel !== 'all' && (
                          <Badge variant="secondary" className="text-xs">
                            {product.skillLevel}
                          </Badge>
                        )}
                        {product.inStock ? (
                          <Badge variant="success" className="text-xs">In Stock</Badge>
                        ) : (
                          <Badge variant="error" className="text-xs">Out of Stock</Badge>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {product.features && product.features.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                            {product.features.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{product.features.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {product.weight && (
                        <div className="text-xs text-gray-500 mb-2">Weight: {product.weight}</div>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="text-xs text-gray-500 mb-2">
                          Sizes: {product.sizes.join(', ')}
                        </div>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <div className="text-xs text-gray-500 mb-2">
                          Colors: {product.colors.join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-navy">
                          {formatCurrency(product.price)}
                        </div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      <Button asChild size="sm" disabled={!product.inStock}>
                        <a href={product.buyUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                          Buy
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products match your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
