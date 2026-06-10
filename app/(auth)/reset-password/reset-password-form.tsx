'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { updatePasswordAction, type PasswordUpdateState } from '../actions';

const initialState: PasswordUpdateState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="h-12 w-full text-sm" type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Actualizar contraseña'}
    </Button>
  );
}

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(
    updatePasswordAction,
    initialState,
  );
  const formState = state ?? initialState;
  const errorId = formState.error ? 'reset-password-error' : undefined;
  const successId = formState.success ? 'reset-password-success' : undefined;
  const feedbackId = errorId ?? successId;

  return (
    <Card className="border-border bg-card w-full max-w-md shadow-[0_20px_60px_-42px_rgba(15,23,42,0.24)]">
      <CardHeader className="space-y-3">
        <div className="bg-muted text-muted-foreground inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Seguridad
        </div>
        <CardTitle className="text-2xl" role="heading" aria-level={2}>
          Crear nueva contraseña
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Elige una contraseña nueva para recuperar el acceso a tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="password">Nueva contraseña</Label>
            <div className="relative">
              <LockKeyhole className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Minimo 6 caracteres"
                aria-invalid={Boolean(formState.error)}
                aria-describedby={feedbackId}
                className="pl-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <div className="relative">
              <LockKeyhole className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repite la contraseña"
                aria-invalid={Boolean(formState.error)}
                aria-describedby={feedbackId}
                className="pl-11"
                required
              />
            </div>
          </div>

          {formState.error ? (
            <p
              id={errorId}
              role="alert"
              className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
            >
              {formState.error}
            </p>
          ) : null}

          {formState.success ? (
            <p
              id={successId}
              role="status"
              className="rounded-lg border border-emerald-300/70 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
            >
              {formState.success}
            </p>
          ) : null}

          <SubmitButton />

          <p className="text-muted-foreground text-center text-sm">
            <Link
              href="/login"
              className="text-foreground inline-flex items-center gap-2 font-medium"
            >
              Iniciar sesion
              <ArrowRight className="size-4" />
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
