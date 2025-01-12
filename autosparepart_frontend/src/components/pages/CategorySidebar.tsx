import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getAllCategories } from '@/features/category/categorySlice';
import { getProductsByCategory } from '@/features/products/productsSlice';
import { ChevronDown, ChevronRight, Filter, Search, Tag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// interface Category {
//   id: string;
//   name: string;
//   count: number;
//   subcategories?: Category[];
// }

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

const priceRanges: PriceRange[] = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: Infinity, label: 'Over $500' }
];


interface CategoryProductCount {
  id: number;
  name: string;
  count: number;
  subcategories?: CategoryProductCount[]
}

const CategorySidebar = () => {
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((state) => state.categories);
  const { items: products } = useAppSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const categoriesWithCount: CategoryProductCount[] = categories.map((category) => {
    const productCount = products.filter((product) => (product.categoryId === category.id));

    return { id: category.id, name: category.name, count: productCount.length };
  });

  console.log("CATTTT: ", categoriesWithCount)
  console.log("PRODUCTS: ", products)

  const handleCategoryClick = (categoryId: string) => {
    dispatch(getProductsByCategory({ categoryId: Number(categoryId) }));
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceRangeClick = (priceRange: PriceRange) => {
    setSelectedPriceRanges(prev =>
      prev.includes(priceRange)
        ? prev.filter(range => range !== priceRange)
        : [...prev, priceRange]
    );
  };

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchQuery('');
  };

  const filteredCategories = categoriesWithCount.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CategoryTree = ({ category }: { category: CategoryProductCount }) => {
    const isExpanded = expandedCategories.includes(category.id.toString());
    const isSelected = selectedCategories.includes(category.id.toString());

    return (
      <div className="mb-1">
        <div className="flex items-center gap-2">
          {category.subcategories && category.subcategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-4 w-4 hover:bg-transparent"
              onClick={() => toggleExpanded(category.id.toString())}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          <div
            className={`flex items-center justify-between w-full cursor-pointer p-2 rounded-md hover:bg-accent ${isSelected ? 'bg-accent' : ''
              }`}
            onClick={() => handleCategoryClick(category.id.toString())}
          >
            <span className="text-sm">{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </div>
        </div>
        {isExpanded && category.subcategories && (
          <div className="ml-4 mt-1">
            {category.subcategories.map(subcategory => (
              <CategoryTree key={subcategory.id} category={subcategory} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-muted-foreground hover:text-primary"
            >
              Clear all
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Categories</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-1">
                  {filteredCategories.map(category => (
                    <CategoryTree key={category.id} category={category} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Price Range</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  {priceRanges.map((range, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-accent ${selectedPriceRanges.includes(range) ? 'bg-accent' : ''
                        }`}
                      onClick={() => handlePriceRangeClick(range)}
                    >
                      <span className="text-sm">{range.label}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Categories & Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80">
            <SheetHeader>
              <SheetTitle>Categories & Filters</SheetTitle>
              <SheetDescription>
                Browse products by category or apply filters
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default CategorySidebar;