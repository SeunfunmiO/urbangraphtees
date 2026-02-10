import Link from "next/link"
import NavigationBar from "../components/NavigationBar"

const Page = () => {
    return (
        <div className="min-h-screen bg-neutral-50">
            <NavigationBar />

            <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Terms & Conditions
                    </h2>
                    <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
                        Welcome to UrbanGraphTees. By using our website, you agree to comply
                        with the following terms and conditions. Please read them carefully
                        before making a purchase.
                    </p>
                </div>

          
                <section className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                    <ol className="space-y-6 list-decimal list-inside">
                        <li>
                            <h4 className="font-semibold text-lg mb-1">
                                Use of Website
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                This website is intended for personal use only. Unauthorized
                                commercial use or reproduction of content is prohibited.
                            </p>
                        </li>

                        <li>
                            <h4 className="font-semibold text-lg mb-1">
                                Product Information
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                We strive to provide accurate product details. However, slight
                                variations in color, design, or size may occur.
                            </p>
                        </li>

                        <li>
                            <h4 className="font-semibold text-lg mb-1">
                                Orders & Payments
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                All orders must be paid in full before processing. We reserve
                                the right to cancel orders due to stock unavailability or
                                payment issues.
                            </p>
                        </li>

                        <li>
                            <h4 className="font-semibold text-lg mb-1">
                                Returns & Refunds
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                Returns are accepted within 7 days if the product is unused,
                                unworn, and in its original packaging. Refunds will be processed
                                to the original payment method.
                            </p>
                        </li>

                        <li>
                            <h4 className="font-semibold text-lg mb-1">
                                Limitation of Liability
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                We are not liable for damages arising from misuse of products or
                                third-party delays in delivery.
                            </p>
                        </li>
                    </ol>
                </section>

                {/* Footer Action */}
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-6 py-2 
                        text-sm font-medium hover:bg-black hover:text-white transition"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Page
