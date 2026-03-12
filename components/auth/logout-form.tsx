import { Button } from '@/components/ui/button';

export function LogoutForm({
  variant = 'outline',
}: {
  variant?: 'outline' | 'ghost';
}) {
  return (
    <form action="/auth/logout" method="post">
      <Button type="submit" variant={variant} className="h-10 w-full sm:w-auto">
        Cerrar sesion
      </Button>
    </form>
  );
}
