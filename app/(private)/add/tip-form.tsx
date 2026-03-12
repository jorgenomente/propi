'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TipFormState } from './actions';

type TipFormProps = {
  action: (
    state: TipFormState | void,
    formData: FormData,
  ) => Promise<TipFormState | void>;
};

const initialState: TipFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="h-11 w-full text-sm" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar propina'}
    </Button>
  );
}

export function TipForm({ action }: TipFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const formState = state ?? initialState;
  const errorId = formState.error ? 'tip-form-error' : undefined;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          defaultValue={formState.amount}
          placeholder="20"
          aria-invalid={Boolean(formState.error)}
          aria-describedby={errorId ?? 'tip-form-help'}
          required
        />
        <p id="tip-form-help" className="text-muted-foreground text-sm">
          Usa un monto mayor a 0. Se guarda directamente en tu historial.
        </p>
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

      <SubmitButton />
    </form>
  );
}
