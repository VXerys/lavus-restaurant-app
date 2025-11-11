# hooks/

Custom hook reusable untuk komposisi logika UI.

Gunakan untuk:

- Ekstraksi logic view dari komponen (fetch, debounce, form state).
- Abstraksi event/side-effect yang sering diulang.

Best practices:

- Penamaan `use*` dan ketergantungan eksplisit di dependency array.
- Cleanup efek dengan benar; hindari memory leak pada event/listener.
- Uji hook kritikal dengan RTL + `renderHook` (jika memakai util tersebut).

## Custom Hooks

- **`useClaimDealAnimation`** - Hook untuk menangani animasi claim deal dengan overlay sukses

Contoh:

```ts
export function usePromos() {
  // const { data, isLoading } = useQuery('promos', fetchPromos)
  return { data: [], isLoading: false };
}
```

Terkait: [`docs/DEFINITION_OF_DONE.md`](../../docs/DEFINITION_OF_DONE.md).
