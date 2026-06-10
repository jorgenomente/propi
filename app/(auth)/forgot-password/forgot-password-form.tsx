'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

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

import {
  requestPasswordResetAction,
  type PasswordResetRequestState,
} from '../actions';

const initialState: PasswordResetRequestState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="h-12 w-full text-sm" type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar enlace'}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(
    requestPasswordResetAction,
    initialState,
  );
  const formState = state ?? initialState;
  const errorId = formState.error ? 'forgot-password-error' : undefined;
  const successId = formState.success ? 'forgot-password-success' : undefined;
  const emailFieldKey = formState.email ?? 'empty';

  return (
    <Card className="border-border bg-card w-full max-w-md shadow-[0_20px_60px_-42px_rgba(15,23,42,0.24)]">
      <CardHeader className="space-y-3">
        <div className="bg-muted text-muted-foreground inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Recuperacion
        </div>
        <CardTitle className="text-2xl" role="heading" aria-level={2}>
          Recuperar contraseña
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Ingresa tu correo y te enviaremos un enlace para crear una contraseña
          nueva.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electronico</Label>
            <div className="relative">
              <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                key={emailFieldKey}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={formState.email}
                placeholder="tu@correo.com"
                aria-invalid={Boolean(formState.error)}
                aria-describedby={errorId ?? successId}
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
              <ArrowLeft className="size-4" />
              Volver a iniciar sesion
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
