<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Codes/Index', [
            'codes' => Code::with('user:id,name')->orderBy('created_at', 'asc')->get()
        ]);
    }

    public function welcome()
    {
        $codes = Code::with('user:id,name')->get();

        return Inertia::render('Welcome', [
            'codes' => $codes,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {

    // }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:codes,title|min:3|max:100',
            'code' => 'nullable|'
        ], [
            'title.required' => 'El Titulo es requerido',
            'title.min' => 'El titulo debe tener al menos :min caracteres',
            'title.max' => 'El titulo no debe sobrepasar los :max caracteres',
            'title.unique' => 'Ya existe un titulo con el mismo nombre',
        ]);

        $request->user()->codes()->create($validated);

        return redirect( route('codes.index'))->with('message', 'Codigo creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Code $code)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Code $code)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Code $code)
    {
        $this->authorize('update', $code);

        $validated = $request->validate([
            'title' => 'required|unique:codes,title|min:3|max:100',
            'code' => 'nullable|'
        ], [
            'title.required' => 'El Titulo es requerido',
            'title.min' => 'El titulo debe tener al menos :min caracteres',
            'title.max' => 'El titulo no debe sobrepasar los :max caracteres',
            'title.unique' => 'Ya existe un titulo con el mismo nombre',
        ]);

        $code->update($validated);

        return redirect( route('codes.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code)
    {
        $this->authorize('delete', $code);

        $code->delete();

        return redirect(route('codes.index'));
    }
}