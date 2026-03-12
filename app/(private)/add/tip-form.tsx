'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Coins } from 'lucide-react';

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
    <Button type="submit" className="h-12 w-full text-sm" disabled={pending}>
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
        <div className="relative">
          <Coins className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
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
            className="pl-11 text-lg font-semibold"
            required
          />
        </div>
        <p id="tip-form-help" className="text-muted-foreground text-sm">
          Usa un monto mayor a 0. Se guarda directamente en tu historial.
        </p>
      </div>

      {formState.error ? (
        <p
          id={errorId}
          role="alert"
          className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl border px-4 py-3 text-sm"
        >
          {formState.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
