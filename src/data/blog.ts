export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: 'Molecular' | 'Architecture' | 'Temporal' | 'Protocol';
    readTime: string;
    image: string;
    nodeId: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'The Resonance of Cryo-Searing',
        excerpt: 'How sound frequencies are used to stabilize molecular lattice structures during the searing process.',
        date: '2026.01.12',
        category: 'Molecular',
        readTime: '04:12 MIN',
        nodeId: 'BLOG_NODE_412',
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Architectural Plating Systems',
        excerpt: 'A deep dive into the structural engineering principles behind our stacked geometric entrees.',
        date: '2026.01.08',
        category: 'Architecture',
        readTime: '06:45 MIN',
        nodeId: 'BLOG_NODE_645',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: '3',
        title: 'Temporal Flavor Displacement',
        excerpt: 'Understanding the 15-second lag between ingestion and peak flavor profile activation.',
        date: '2026.01.05',
        category: 'Temporal',
        readTime: '03:20 MIN',
        nodeId: 'BLOG_NODE_320',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '4',
        title: 'The Void Manager Protocol',
        excerpt: 'Everything you need to know about navigating the dispute resolution system for high-magnitude credits.',
        date: '2025.12.28',
        category: 'Protocol',
        readTime: '02:15 MIN',
        nodeId: 'BLOG_NODE_215',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop'
    }
];
