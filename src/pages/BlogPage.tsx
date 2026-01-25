import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { BLOG_POSTS, type BlogPost } from '../data/blog';

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const regularPosts = BLOG_POSTS.slice(1);

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
                <Breadcrumbs />

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-2 border-black pb-8">
                    <div>
                        <span className="font-mono text-xs tracking-[0.3em] text-orange-600 block mb-2">[ INTEL // KNOWLEDGE_BASE ]</span>
                        <h1 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter">
                            The <span className="stroke-text italic">Protocol</span>
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-32">

                    {/* Featured Post: Master Protocol */}
                    <section>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                        >
                            <div className="lg:col-span-8 relative aspect-video overflow-hidden rounded-2xl border-2 border-black">
                                <img
                                    src={featuredPost.image}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    alt={featuredPost.title}
                                />
                                <div className="absolute top-6 left-6 flex items-center gap-4">
                                    <span className="bg-orange-600 text-white font-mono text-[10px] px-3 py-1 uppercase tracking-widest rounded-full">MASTER_PROTOCOL</span>
                                    <span className="bg-black/90 text-white font-mono text-[10px] px-3 py-1 uppercase tracking-widest rounded-full backdrop-blur-sm">{featuredPost.nodeId}</span>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-6">
                                <div className="flex items-center gap-4 font-mono text-[10px] text-orange-600 uppercase tracking-widest">
                                    <span>{featuredPost.date}</span>
                                    <span className="w-10 h-px bg-orange-600" />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                                <h2 className="font-serif text-4xl font-bold uppercase leading-[1.1]">
                                    {featuredPost.title}
                                </h2>
                                <p className="font-sans text-muted/80 text-lg leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <button className="group flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-widest pt-4 overflow-hidden">
                                    [ Initiate Immersion ]
                                    <motion.span
                                        className="h-px bg-black flex-1 w-20"
                                        whileHover={{ x: 20 }}
                                    />
                                </button>
                            </div>
                        </motion.div>
                    </section>

                    {/* Sub-Processes Grid */}
                    <section className="space-y-12">
                        <div className="flex items-center gap-4">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-orange-600">Sub-Processes</h3>
                            <div className="h-px bg-black/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {regularPosts.map((post: BlogPost, i: number) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group space-y-6"
                                >
                                    <div className="aspect-[4/5] overflow-hidden rounded-xl border border-black/10 relative">
                                        <img
                                            src={post.image}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                            <span className="bg-white text-black font-mono text-[10px] px-4 py-2 uppercase tracking-widest w-full block text-center border-2 border-black">
                                                ACCESS_NODE_{post.id}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between font-mono text-[9px] text-muted uppercase tracking-widest">
                                            <span>{post.category}</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <h4 className="font-serif text-2xl font-bold uppercase leading-tight group-hover:text-orange-600 transition-colors">
                                            {post.title}
                                        </h4>
                                        <p className="font-sans text-sm text-muted/80 leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer Insight */}
                <div className="mt-32 pt-12 border-t border-black/5 text-center">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                        DATA_STREAM_END // MORE INTEL_PENDING
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
