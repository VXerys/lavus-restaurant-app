# navigation/

Deklarasi React Navigation (Stack/Tab) dan tipe aman untuk route params.

Gunakan untuk:

- Root navigator, stack per domain, dan bottom tabs.
- Centralized linking & deep link config (future).

Best practices:

- Tipekan `ParamList` dan gunakan `NativeStackScreenProps` dlsb.
- Pisahkan navigators per domain untuk keterbacaan.
- Jangan letakkan logic bisnis di file navigator; hanya routing.
- Dokumentasikan alur pada `docs/PROJECT_STRUCTURE.md` dan `AGILE_SCRUM_PLAN`.

Referensi: [`docs/PROJECT_STRUCTURE.md`](../../docs/PROJECT_STRUCTURE.md).
