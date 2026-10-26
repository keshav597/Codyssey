import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigation } from '../hooks/useNavigation';
import { useCartStore, SHOP_ITEMS, CATEGORIES } from '../store/cartStore';
import { useProgress } from '../hooks/useProgress';
import { useAsyncData, fakeAPI } from '../hooks/useAsyncData';
import { ShoppingCart, X, Plus, Minus, Trash2, Package, CheckCircle, AlertCircle, Loader, Lock, ArrowRight } from 'lucide-react';
import './ShopPage.css';

// This component is used to render the slide-out shopping cart drawer
function CartDrawer({ xp, spendXP }) {
  const { cartItems, isCartOpen, closeCart, removeFromCart, decrementQty, addToCart, getTotal, clearCart, markPurchased } = useCartStore();
  const [checkoutState, setCheckoutState] = useState('idle');
  const total = getTotal();
  const canAfford = xp >= total;

  // This function is used to handle cart checkout and deduct XP
  async function handleCheckout() {
    if (!canAfford || cartItems.length === 0) return;
    setCheckoutState('loading');
    await fakeAPI(() => true, 900);

    const success = spendXP(total);
    if (success) {
      const ids = cartItems.map((i) => i.id);
      markPurchased(ids);
      setCheckoutState('success');
      setTimeout(() => setCheckoutState('idle'), 3000);
    } else {
      setCheckoutState('idle');
    }
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
            <p>Your perks have been applied to your academic profile.</p>
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <Package size={48} style={{ opacity: 0.3 }} />
                <p>Your cart is empty</p>
                <span>Browse the perks store and add items with your earned XP!</span>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span className="cart-item__emoji">{item.emoji}</span>
                    <div className="cart-item__info">
                      <strong>{item.name}</strong>
                      <span className="xp-tag">{item.price} XP</span>
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
                  <span>Not enough XP ({total - xp} more XP needed). Complete lessons or quizzes to earn XP!</span>
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
                    <Loader size={16} className="spin" /> Deducting XP & Unlocking...
                  </span>
                ) : !canAfford ? (
                  `Need ${total - xp} more XP`
                ) : (
                  `Redeem for ${total} XP`
                )}
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
function ProductCard({ item, onAdd, isPurchased, userXP }) {
  const cartItems = useCartStore((state) => state.cartItems);
  const inCart = cartItems.some((i) => i.id === item.id);
  const canAfford = userXP >= item.price;

  return (
    <div
      className={`product-card ${!item.inStock ? 'product-card--disabled' : ''} ${
        isPurchased ? 'product-card--owned' : ''
      }`}
    >
      <div className="product-card__emoji">{item.emoji}</div>
      <div className="product-card__category">{item.category}</div>
      <h4 className="product-card__name">{item.name}</h4>
      <p className="product-card__desc">{item.desc}</p>

      <div className="product-card__footer">
        <div>
          <span className="product-card__price">{item.price} XP</span>
          {!isPurchased && !canAfford && item.inStock && (
            <div style={{ fontSize: 11, color: '#dc2626', marginTop: 2 }}>
              Need {item.price - userXP} more XP
            </div>
          )}
        </div>

        {isPurchased ? (
          <span className="product-card__owned">
            <CheckCircle size={14} /> Owned
          </span>
        ) : !item.inStock ? (
          <span className="product-card__out">Out of stock</span>
        ) : !canAfford ? (
          <button
            className="product-card__btn"
            disabled
            style={{ opacity: 0.6, cursor: 'not-allowed', background: '#f1f5f9', color: '#94a3b8', borderColor: '#cbd5e1' }}
          >
            <Lock size={12} /> Locked
          </button>
        ) : (
          <button
            className={`product-card__btn ${inCart ? 'product-card__btn--in-cart' : ''}`}
            onClick={() => onAdd(item)}
          >
            {inCart ? (
              <>
                <CheckCircle size={14} /> In Cart
              </>
            ) : (
              <>
                <Plus size={14} /> Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// This component is used to render the XP store page with catalog filters and cart
export default function ShopPage() {
  const { student, spendXP } = useProgress();
  const { navigate } = useNavigation();
  const { addToCart, toggleCart, getItemCount, purchasedIds } = useCartStore();
  const itemCount = getItemCount();

  const [activeCategory, setActiveCategory] = useState('All');

  // This hook is used to simulate async fetching of products with loading state
  const { data: products, loading, error, refetch } = useAsyncData(
    () => fakeAPI(() => SHOP_ITEMS, 800),
    []
  );

  // This is done for filtering products by the active category tab
  const filteredProducts = products
    ? activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <PageContainer title="Perks Store">
      <div className="shop-header">
        <div>
          <p className="text-secondary" style={{ fontSize: 14 }}>
            Spend your earned engineering XP on power-ups, themes, and exclusive perks.
          </p>
          <div className="shop-xp-balance" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
            <span>⚡</span>
            <span style={{ color: '#047857' }}>
              Your Balance: <strong>{student.xp} XP</strong>
            </span>
          </div>
        </div>
        <button className="shop-cart-btn" onClick={toggleCart}>
          <ShoppingCart size={20} />
          <span>Cart</span>
          {itemCount > 0 && <span className="shop-cart-badge">{itemCount}</span>}
        </button>
      </div>

      {/* Helpful banner when user has low or 0 XP */}
      {student.xp < 45 && (
        <div
          style={{
            margin: '16px 0',
            padding: '12px 16px',
            borderRadius: 8,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 13, color: '#475569' }}>
            💡 <strong>Need more XP?</strong> Solve interactive lessons and complete technical assessments in the Roadmap to earn XP.
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('codeverse')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            Go to Roadmap <ArrowRight size={13} />
          </Button>
        </div>
      )}

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
                  userXP={student.xp}
                  onAdd={addToCart}
                  isPurchased={purchasedIds.includes(item.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CartDrawer xp={student.xp} spendXP={spendXP} />
    </PageContainer>
  );
}
