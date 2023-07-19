<?php

namespace App\Policies;

use App\Models\Code;
use App\Models\User;
use Illuminate\Auth\Access\Response;


class CodePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Code $code)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Code $code)
    {
        return $code->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Code $code)
    {
        /* Esta logica nos dice que cualquiera que este autorizado a actualizar el post tambien esta autorizado a eliminarlo */
        return $this->update($user, $code);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Code $code)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Code $code)
    {
        //
    }
}