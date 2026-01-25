export type Category = 'Starters' | 'Mains' | 'Architectural' | 'Drinks';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    image: string;
    tags?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Void Burger',
        description: 'Charcoal bun, dry-aged smash patty, truffle aioli, pickled enoki.',
        price: 18,
        category: 'Mains',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop',
        tags: ['Best Seller', 'Signature']
    },
    {
        id: '2',
        name: 'Structure Fries',
        description: 'Triple-cooked potato batons, rosemary dust, parmesan shavings.',
        price: 8,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1630384060421-a4323ceca041?q=80&w=2070&auto=format&fit=crop',
        tags: ['V', 'GF']
    },
    {
        id: '3',
        name: 'Liquid Gold',
        description: 'Saffron-infused consommé, gold leaf, suspended micro-herbs.',
        price: 14,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
        tags: ['Vegan']
    },
    {
        id: '4',
        name: 'Monolith Steak',
        description: 'Sous-vide flank steak, geometric root vegetables, reduction.',
        price: 32,
        category: 'Mains',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
        tags: ['GF']
    },
    {
        id: '5',
        name: 'Concrete Mousse',
        description: 'Sesame grey mousse, activated charcoal sponge, blackberry gel.',
        price: 12,
        category: 'Architectural',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1974&auto=format&fit=crop',
        tags: ['Sweet']
    },
    {
        id: '6',
        name: 'Neon Nectar',
        description: 'Yuzu, tonic, butterfly pea flower, bioluminescent essence.',
        price: 9,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        tags: ['Mocktail']
    }
];
