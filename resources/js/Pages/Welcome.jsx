import Code from '@/Components/Code';
import { Link, Head } from '@inertiajs/react';


const Welcome = ({ auth, codes, changeStateModal, postId, deletePost, idPost }) => {

    
    return (
        <>
            <Head title="Welcome" />
            <div className="relative bg-slate-100 h-screen w-full">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right bg-gray-200 w-full">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
                    <div className='mt-24 bg-white shadow-sm rounded-md divide-y-8 divide-slate-100'>
                        {
                            codes.map(code =>
                                <Code 
                                    key={code.id} 
                                    code={code}
                                    changeStateModal={changeStateModal} 
                                    postId={postId}
                                    deletePost={deletePost}
                                    idPost={idPost}
                                />

                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Welcome