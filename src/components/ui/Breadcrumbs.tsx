import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
                <Home className="w-3 h-3" />
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <div key={to} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-muted/50" />
                        {isLast ? (
                            <span className="text-foreground font-bold">{value}</span>
                        ) : (
                            <Link to={to} className="hover:text-foreground transition-colors">
                                {value}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
