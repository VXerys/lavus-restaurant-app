# components/

Komponen UI presentational dan reusable (tidak mengetahui sumber data eksternal).

Gunakan untuk:

- Menyusun elemen UI kecil hingga menengah (Button, Card, Badge, Input, EmptyState, dsb.).
- Menghindari business logic (fokus pada props & render).

Best practices:

- Penamaan PascalCase: `MenuCard.tsx`, `PrimaryButton.tsx`.
- Props ditipkan secara eksplisit; sediakan default/optional yang jelas.
- Hindari state kompleks; serahkan ke parent/hook.
- Style konsisten dengan token di `@theme`.
- Uji via component test (RTL) untuk render dan interaksi dasar (lihat [`docs/TESTING_STRATEGY.md`](../../docs/TESTING_STRATEGY.md)).

Struktur contoh:

```text
components/
  Button/
    index.ts
    Button.tsx
    Button.test.tsx
    styles.ts
```
