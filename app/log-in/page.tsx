
import Link from 'next/link';
import SignInForm from '../components/SignInForm';
import Image from 'next/image';


const Page = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-white my-2">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <Link href="/" className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                            Urban<span className="text-neutral-600">Graph</span>Tees
                        </Link>
                        <h1 className="mt-8 text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                            Welcome <br />Back
                        </h1>
                        <p className="mt-4 text-gray-500 font-medium">
                            New to the brand? <Link href="/create-account" className="text-neutral-600 font-bold hover:underline">
                                Create an account</Link>
                        </p>
                    </div>

                    <SignInForm />

                    <div className="relative my-8 flex items-center">
                        <div className="grow border-t border-gray-100"></div>
                        <span className="shrink mx-4 text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
                            Fast Access
                        </span>
                        <div className="grow border-t border-gray-100"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="py-3 border border-gray-200 font-bold text-xs 
                        uppercase tracking-widest hover:bg-gray-50 transition">Google</button>
                        <button
                            className="py-3 border border-gray-200 font-bold text-xs 
                        uppercase tracking-widest hover:bg-gray-50 transition">Apple ID</button>
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:flex flex-1 bg-zinc-900 items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                    alt="Streetwear Studio"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                    width={700}
                    height={700}
                />
                <div className="relative z-10 p-12 text-left w-full">
                    <div className="max-w-xs border-l-4 border-neutral-600 pl-6">
                        <p className="text-white font-black text-2xl uppercase italic leading-tight">
                            &quot;Style is a way to say who you are without having to speak.&quot;
                        </p>
                        <p className="text-neutral-500 font-bold mt-2 text-xs uppercase tracking-[0.3em]">UrbanGraphTees</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page