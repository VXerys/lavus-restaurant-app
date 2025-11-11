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

## Komponen Detail Screen

Komponen-komponen untuk detail screen yang dapat digunakan kembali:

- **`DetailScreenHeader`** - Header dengan back button dan title
- **`ClaimedSuccessOverlay`** - Overlay animasi sukses untuk claim
- **`DealImageSection`** - Section untuk menampilkan gambar deal
- **`DealInfoHeader`** - Header info deal (kategori, title, badge, validitas, deskripsi)
- **`TermsConditionsSection`** - Section terms & conditions dengan bullet points
- **`HowToRedeemSection`** - Section cara redeem dengan numbered steps

## Komponen Rewards

Komponen-komponen untuk rewards screen:

- **`RewardsPointsCard`** - Card untuk menampilkan poin rewards dengan tombol redeem
- **`MembershipProgressBar`** - Progress bar untuk membership tier dengan icon bintang

Struktur contoh:

```text
components/
  Button/
    index.ts
    Button.tsx
    Button.test.tsx
    styles.ts
```
