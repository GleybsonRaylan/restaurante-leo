import { Plus, Minus, ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ItemCardProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  sabores?: readonly string[];
  onAdd: (quantity: number, sabor?: string) => void;
}

export default function ItemCard({ name, description, price, image, sabores, onAdd }: ItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSabor, setSelectedSabor] = useState(sabores?.[0] || '');
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    if (sabores && sabores.length > 0) {
      setShowModal(true);
    } else {
      onAdd(1);
    }
  };

  const confirmAdd = () => {
    onAdd(quantity, selectedSabor);
    setShowModal(false);
    setQuantity(1);
    setSelectedSabor(sabores?.[0] || '');
  };

  return (
    <>
      <div className="card-item flex gap-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        {/* Image */}
        <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-muted to-secondary flex-shrink-0 overflow-hidden relative">
          {image && !imageError ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon size={32} strokeWidth={1.5} />
              <span className="text-[10px] mt-1">Imagem</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-bold text-foreground text-lg leading-tight">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            {sabores && (
              <p className="text-xs text-accent mt-1">{sabores.length} sabores disponíveis</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-accent font-extrabold text-xl">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            <button
              onClick={handleAdd}
              className="btn-primary py-2 px-4 text-sm flex items-center gap-1 shadow-lg shadow-primary/30"
            >
              <Plus size={18} />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Modal for sabores */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg bg-card rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            
            {sabores && (
              <div className="mb-5">
                <label className="text-sm font-semibold text-foreground mb-3 block">Escolha o sabor:</label>
                <div className="flex flex-wrap gap-2">
                  {sabores.map(sabor => (
                    <button
                      key={sabor}
                      onClick={() => setSelectedSabor(sabor)}
                      className={`selection-chip ${selectedSabor === sabor ? 'selection-chip-active' : 'selection-chip-inactive'}`}
                    >
                      {sabor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-3 block">Quantidade:</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn-secondary p-3 rounded-xl"
                >
                  <Minus size={20} />
                </button>
                <span className="text-3xl font-bold w-16 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn-secondary p-3 rounded-xl"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5 p-4 bg-secondary rounded-xl">
              <span className="text-muted-foreground font-medium">Total:</span>
              <span className="text-3xl font-extrabold text-accent">
                R$ {(price * quantity).toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button onClick={confirmAdd} className="btn-primary w-full text-lg py-4 shadow-lg shadow-primary/30">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}
    </>
  );
}
