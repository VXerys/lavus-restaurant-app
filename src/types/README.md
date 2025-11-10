# types/

Definisi tipe global (TypeScript) yang dapat digunakan lintas layer.

Contoh:

- `RouteParamList` untuk navigasi
- `MenuItem`, `Reservation`, `Promo`
- DTO untuk response API (mapping dilakukan di services)

Best practices:

- Hindari siklus dependensi; tipe global jangan impor komponen UI.
- Pisahkan DTO vs UI model bila perlu, jangan campur.
- Evolusikan tipe via incremental migration untuk menghindari breaking.
