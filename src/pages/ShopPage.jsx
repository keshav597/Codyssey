import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useCartStore, SHOP_ITEMS, CATEGORIES } from '../store/cartStore';
import { useProgress } from '../hooks/useProgress';
import { useAsyncData, fakeAPI } from '../hooks/useAsyncData';
import { ShoppingCart, X, Plus, Minus, Trash2, Package, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './ShopPage.css';

// This component is used to render the slide-out shopping cart drawer
function CartDrawer({ xp }) {
  const { cartItems, isCartOpen, closeCart, removeFromCart, decrementQty, addToCart, getTotal, clearCart, markPurchased } = useCartStore();
  const [checkoutState, setCheckoutState] = useState('idle');
  const total = getTotal();
  const canAfford = xp >= total;

  // This function is used to handle cart checkout and deduct XP
  async function handleCheckout() {
    if (!canAfford || cartItems.length === 0) return;
    setCheckoutState('loading');
    await fakeAPI(() => true, 1200);
    const ids = cartItems.map((i) => i.id);
    markPurchased(ids);
    setCheckoutState('success');
    setTimeout(() => setCheckoutState('idle'), 3000);
  }

  return (
    <>
      {isCartOpen && <div className="cart-backdrop" onClick={closeCart} />}

      <div className={`cart-drawer ${isCartOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h3>Your Cart</h3>
          <button className="cart-close-btn" onClick={closeCart}><X size={20} /></button>
        </div>

        {checkoutState === 'success' ? (
          <div className="cart-success">
            <CheckCircle size={48} color="#10b981" />
            <h4>Purchase Complete!</h4>
            <p>Your items have been added to your account.</p>
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <Package size={48} style={{ opacity: 0.3 }} />
                <p>Your cart is empty</p>
                <span>Browse the shop and add items!</span>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span className="cart-item__emoji">{item.emoji}</span>
                    <div className="cart-item__info">
                      <strong>{item.name}</strong>
                      <span className="xp-tag">{item.price === 0 ? 'FREE' : `${item.price} XP`}</span>
                    </div>
                    <div className="cart-item__qty">
                      <button onClick={() => decrementQty(item.id)}><Minus size={12} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => addToCart(item)}><Plus size={12} /></button>
                    </div>
                    <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="cart-footer">
              <div className="cart-balance">
                <span>Your XP Balance</span>
                <strong className={canAfford ? 'text-green' : 'text-red'}>{xp} XP</strong>
              </div>
              <div className="cart-total">
                <span>Cart Total</span>
                <strong>{total} XP</strong>
              </div>
              {!canAfford && cartItems.length > 0 && (
                <div className="cart-warning">
                  <AlertCircle size={14} />
                  <span>Not enough XP — earn more by completing lessons & quizzes!</span>
                </div>
              )}
              <Button
                fullWidth
                disabled={cartItems.length === 0 || !canAfford || checkoutState === 'loading'}
                onClick={handleCheckout}
                style={{ marginTop: 10 }}
              >
                {checkoutState === 'loading' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Loader size={16} className="spin" /> Processing...
                  </span>
                ) : `Redeem for ${total} XP`}
              </Button>
              {cartItems.length > 0 && (
                <button className="cart-clear-btn" onClick={clearCart}>Clear cart</button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

// This component is used to render an individual product card
function ProductCard({ item, onAdd, isPurchased }) {
  const cartItems = useCartStore((state) => state.cartItems);
  const inCart = cartItems.some((i) => i.id === item.id);

  return (
    <div className={`product-card ${!item.inStock ? 'product-card--disabled' : ''} ${isPurchased ? 'product-card--owned' : ''}`}>
      <div className="product-card__emoji">{item.emoji}</div>
      <div className="product-card__category">{item.category}</div>
      <h4 className="product-card__name">{item.name}</h4>
      <p className="product-card__desc">{item.desc}</p>
      <div className="product-card__footer">
        <span className={`product-card__price ${item.isFree ? 'product-card__price--free' : ''}`}>
          {item.isFree ? '🎁 FREE' : `${item.price} XP`}
        </span>
        {isPurchased ? (
          <span className="product-card__owned"><CheckCircle size={14} /> Owned</span>
        ) : !item.inStock ? (
          <span className="product-card__out">Out of stock</span>
        ) : (
          <button
            className={`product-card__btn ${inCart ? 'product-card__btn--in-cart' : ''}`}
            onClick={() => onAdd(item)}
          >
            {inCart ? (
              <><CheckCircle size={14} /> In Cart</>
            ) : (
              <><Plus size={14} /> Add</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// This component is used to render the XP store page with catalog filters and cart
export default function ShopPage() {
  const { student } = useProgress();
  const { addToCart, toggleCart, getItemCount, purchasedIds } = useCartStore();
  const itemCount = getItemCount();

  const [activeCategory, setActiveCategory] = useState('All');

  // This hook is used to simulate async fetching of products with loading state
  const { data: products, loading, error, refetch } = useAsyncData(
    () => fakeAPI(() => SHOP_ITEMS, 1000),
    []
  );

  // This is done for filtering products by the active category tab
  const filteredProducts = products
    ? activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <PageContainer title="XP Shop">
      <div className="shop-header">
        <div>
          <p className="text-secondary" style={{ fontSize: 14 }}>
            Spend your earned XP on power-ups, themes, and exclusive perks.
          </p>
          <div className="shop-xp-balance">
            <span>⚡</span>
            <span>Your balance: <strong>{student.xp} XP</strong></span>
          </div>
        </div>
        <button className="shop-cart-btn" onClick={toggleCart}>
          <ShoppingCart size={20} />
          <span>Cart</span>
          {itemCount > 0 && <span className="shop-cart-badge">{itemCount}</span>}
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="shop-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`shop-cat-btn ${activeCategory === cat ? 'shop-cat-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Async loading state */}
      {loading && (
        <div className="shop-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="product-skeleton">
              <div className="skeleton-emoji" />
              <div className="skeleton-line skeleton-line--short" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line--short" />
            </div>
          ))}
        </div>
      )}

      {/* Async error state with retry button */}
      {error && !loading && (
        <Card style={{ textAlign: 'center', padding: 40 }}>
          <AlertCircle size={40} color="#ef4444" style={{ marginBottom: 12 }} />
          <h4 style={{ marginBottom: 8 }}>Failed to load shop items</h4>
          <p className="text-secondary" style={{ marginBottom: 16, fontSize: 14 }}>{error}</p>
          <Button variant="secondary" onClick={refetch}>Try Again</Button>
        </Card>
      )}

      {/* Product list */}
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: 40 }}>
              <p className="text-secondary">No items in this category yet.</p>
            </Card>
          ) : (
            <div className="shop-grid">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onAdd={addToCart}
                  isPurchased={purchasedIds.includes(item.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CartDrawer xp={student.xp} />
    </PageContainer>
  );
}
