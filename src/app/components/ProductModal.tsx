import { X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
  description?: string;
  materials?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-white rounded-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <h2 className="text-3xl mb-2 tracking-tight">{product.name}</h2>
                    <p className="text-2xl text-[#D4AF37]">{product.price}</p>
                  </div>

                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {product.description ||
                      'A stunning handcrafted piece that combines traditional artisan techniques with contemporary design. Each item is unique and made with care.'}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-sm tracking-wide mb-2">Materials</h3>
                    <p className="text-neutral-600 text-sm">
                      {product.materials || 'Sterling silver, natural gemstones, hand-finished'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm tracking-wide mb-2">Details</h3>
                    <ul className="text-neutral-600 text-sm space-y-1">
                      <li>• Handcrafted by skilled artisans</li>
                      <li>• Made to order (2-3 weeks)</li>
                      <li>• Comes with certificate of authenticity</li>
                      <li>• Free shipping & returns</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-neutral-900 text-white py-4 px-6 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      isInWishlist
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Heart size={18} fill={isInWishlist ? '#D4AF37' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
