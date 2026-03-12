'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';

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

import type { AuthFormState } from './actions';

type AuthFormProps = {
  action: (
    state: AuthFormState | void,
    formData: FormData,
  ) => Promise<AuthFormState | void>;
  title: string;
  description: string;
  submitLabel: string;
  alternateHref: string;
  alternateLabel: string;
  initialEmail?: string;
  passwordAutoComplete?: 'current-password' | 'new-password';
};

const initialState: AuthFormState = {};

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button className="h-12 w-full text-sm" type="submit" disabled={pending}>
      {pending ? 'Enviando...' : children}
    </Button>
  );
}

export function AuthForm({
  action,
  title,
  description,
  submitLabel,
  alternateHref,
  alternateLabel,
  initialEmail,
  passwordAutoComplete = 'current-password',
}: AuthFormProps) {
  const [state, formAction] = useActionState(action, {
    ...initialState,
    email: initialEmail,
  });
  const formState = state ?? initialState;
  const errorId = formState.error ? 'auth-form-error' : undefined;
  const emailFieldKey = formState.email ?? initialEmail ?? 'empty';

  return (
    <Card className="border-border bg-card w-full max-w-md shadow-[0_20px_60px_-42px_rgba(15,23,42,0.24)]">
      <CardHeader className="space-y-3">
        <div className="bg-muted text-muted-foreground inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Acceso personal
        </div>
        <CardTitle className="text-2xl" role="heading" aria-level={2}>
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          {description}
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
                aria-describedby={errorId}
                className="pl-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <div className="relative">
              <LockKeyhole className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={passwordAutoComplete}
                placeholder="Minimo 6 caracteres"
                aria-invalid={Boolean(formState.error)}
                aria-describedby={errorId}
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

          <SubmitButton>{submitLabel}</SubmitButton>

          <p className="text-muted-foreground text-center text-sm">
            <Link
              href={alternateHref}
              className="text-foreground inline-flex items-center gap-2 font-medium"
            >
              {alternateLabel}
              <ArrowRight className="size-4" />
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
