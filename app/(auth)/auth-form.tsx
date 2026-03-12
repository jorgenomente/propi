'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

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
    <Button className="h-11 w-full text-sm" type="submit" disabled={pending}>
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

  return (
    <Card className="border-border/60 bg-background/95 shadow-xl backdrop-blur">
      <CardHeader className="space-y-2">
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
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={formState.email}
              placeholder="tu@correo.com"
              aria-invalid={Boolean(formState.error)}
              aria-describedby={errorId}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={passwordAutoComplete}
              placeholder="Minimo 6 caracteres"
              aria-invalid={Boolean(formState.error)}
              aria-describedby={errorId}
              required
            />
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
              className="text-foreground font-medium underline underline-offset-4"
            >
              {alternateLabel}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
