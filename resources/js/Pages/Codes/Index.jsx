import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import { useForm, Head } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import Code from '@/Components/Code'


const Index = ({auth, codes}) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        title: '',
        code: ''
    })
    const submit = (e) => {
        e.preventDefault()
        // onSuccess: () => llama al metodo reset(), esto quiere decir que si se ha enviado correctamente el formulario 'onSuccess', resetees los campos.
        post( route('codes.store'), {onSuccess: () => reset()})
    }
  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title='Index Code' />
        <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
            <form onSubmit={submit}>
                <input 
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    type='text'
                    placeholder='Titulo del codigo'
                    autoFocus
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <InputError message={errors.title} className='mt-2'/>
                <textarea
                    value={data.code}
                    onChange={e => setData('code', e.target.value)}
                    type='text'
                    placeholder='Pega aquí el codigo correspondiente'
                    className='mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
                    rows='8'
                >

                </textarea>
                <InputError message={errors.code} className='mt-2' />

                <PrimaryButton 
                    className='mt-4 w-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium px-6 py-2.5 shadow-md'
                    disabled = {processing}
                >
                    Crear

                </PrimaryButton>
            </form>

            <div className='mt-6 bg-white shadow-sm rounded-md divide-y'>
                {
                    codes.map(code => 
                        <Code key={code.id} code={code} />

                )}
            </div>

        </div>
    </AuthenticatedLayout>
  )
}

export default Index