import PageTransition from '../components/layout/PageTransition';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function LegalPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
                <Breadcrumbs />
                <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase mb-12">Legal Protocols</h1>

                <div className="space-y-16 font-sans text-muted/80 leading-relaxed">

                    <section>
                        <h2 className="font-serif text-2xl uppercase text-foreground mb-4">01. Privacy Index</h2>
                        <p>
                            We collect minimal telemetry to optimize your caloric intake. Data points such as taste preferences and frequency of visits are stored in a local encrypted ledger. We do not sell your biological data to third-party entities, unless they are extraterrestrial in origin.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl uppercase text-foreground mb-4">02. Terms of Ingestion</h2>
                        <p>
                            By consuming Instant Bite products, you acknowledge the experimental nature of our molecular gastronomy. Users with standard digestive systems agree to indemnify Instant Bite against any spontaneous flavor-induced epiphanies or temporal displacements.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl uppercase text-foreground mb-4">03. Refund Policy</h2>
                        <p>
                            Due to the ephemeral nature of our cuisine, refunds are only issued if the food dematerializes before consumption. Please contact the Void Manager for disputes exceeding 500 Credits.
                        </p>
                    </section>

                </div>
            </div>
        </PageTransition>
    );
}
