'use client';

import { useActionState, useRef } from 'react';
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

function formatAmountInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return { display: '', raw: '' };
  }

  const normalizedInteger = digits.replace(/^0+(?=\d)/, '');

  const formattedInteger = new Intl.NumberFormat('es-AR').format(
    Number(normalizedInteger || '0'),
  );

  return {
    display: formattedInteger,
    raw: normalizedInteger || '0',
  };
}

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

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
  const hiddenAmountRef = useRef<HTMLInputElement>(null);
  const initialAmount = formatAmountInput(formState.amount ?? '');
  const tipDateValue = formState.tipDate || getTodayInputValue();

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="amount-display">Monto</Label>
        <div className="relative">
          <Coins className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            key={formState.amount ?? 'empty'}
            id="amount-display"
            type="text"
            inputMode="numeric"
            defaultValue={initialAmount.display}
            placeholder="20"
            aria-invalid={Boolean(formState.error)}
            aria-describedby={errorId}
            className="pl-11 text-lg font-semibold"
            onChange={(event) => {
              const nextAmount = formatAmountInput(event.target.value);
              event.currentTarget.value = nextAmount.display;

              if (hiddenAmountRef.current) {
                hiddenAmountRef.current.value = nextAmount.raw;
              }
            }}
            required
          />
          <input
            ref={hiddenAmountRef}
            name="amount"
            type="hidden"
            defaultValue={initialAmount.raw}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipDate">Fecha de la propina</Label>
        <Input
          id="tipDate"
          name="tipDate"
          type="date"
          defaultValue={tipDateValue}
          max={getTodayInputValue()}
          aria-invalid={Boolean(formState.error)}
          aria-describedby={errorId}
          className="text-base font-medium"
          required
        />
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
