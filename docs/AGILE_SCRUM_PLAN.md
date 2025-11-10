# AGILE & SCRUM PLAN

Ringkasan: Rencana penerapan Agile Scrum untuk Lavus Restaurant App (tim kecil 1–5 dev) agar pengembangan fitur reservasi, menu, rewards berjalan terukur.

Last Updated: 2025-11-10

## Tujuan

Menyediakan kerangka kerja ringan yang konsisten untuk kolaborasi, prioritisasi backlog, eksekusi sprint, dan inspeksi adaptasi.

## Peran Tim

| Peran | Tanggung Jawab Utama |
|-------|----------------------|
| Product Owner (PO) | Menetapkan prioritas backlog, menulis user story, menerima/menolak hasil sprint |
| Scrum Master (SM) | Memfasilitasi ceremony, menghilangkan impediments, memastikan praktik Agile diikuti |
| Tech Lead | Review arsitektur, quality gate (CI), coaching dev |
| Developer | Implementasi user story, menulis test, dokumentasi |
| QA (opsional) | Exploratory test, regresi, menulis test kasus E2E |
| UX / UI (opsional) | Wireframe, spesifikasi komponen visual |

Catatan: Tim 1–5 orang; beberapa peran bisa digabung (misal Tech Lead sekaligus SM).

## Durasi Sprint

Rekomendasi: 2 minggu (cukup untuk fitur UI + API integrasi). Jika tim sangat kecil dan kebutuhan feedback cepat, bisa 1 minggu. Evaluasi setelah 3 sprint.

## Cadence / Frekuensi

| Aktivitas | Frekuensi | Durasi Maks | Output |
|-----------|-----------|-------------|--------|
| Daily Standup | Harian | 15 menit | Status, impediment list |
| Backlog Grooming | Mingguan (mid-sprint) | 30–45 menit | Backlog siap untuk planning |
| Sprint Planning | Awal sprint | 60–90 menit | Sprint goal + commit stories |
| Sprint Review | Akhir sprint | 30–45 menit | Demo increment, feedback |
| Retrospective | Akhir sprint (setelah review) | 45–60 menit | Action improvement |

## Definition of Ready (DoR) Checklist

Story dianggap siap apabila:

- [ ] Memiliki judul jelas & deskripsi ringkas.
- [ ] Tujuan bisnis dinyatakan.
- [ ] Acceptance Criteria terformat Gherkin atau bullet.
- [ ] Ukuran relatif sudah diestimasi (Story Points).
- [ ] Dependencies diidentifikasi (API, desain figma, lib eksternal).
- [ ] Data contoh / mock tersedia (misal contoh menu, reservasi).
- [ ] Risiko/ketidakpastian tercatat.
- [ ] Dapat selesai dalam 1 sprint (bila tidak, pecah lagi).

## Template User Story

```text
Sebagai <<TIPE_USER>>(mis: pelanggan terdaftar)
Saya ingin <<AKSI>>(mis: memfilter menu berdasarkan tipe makanan)
Sehingga <<MANFAAT>>(mis: menemukan hidangan lebih cepat dan pesan).
```

Acceptance Criteria (contoh):

```gherkin
Diberikan user berada di layar Home
Ketika user memilih kategori "Salad"
Maka daftar menu hanya menampilkan hidangan tipe Salad
Dan jumlah hasil ditampilkan.
```

## Estimasi Story Points (Referensi)

| Poin | Karakteristik |
|------|---------------|
| 1 | Perubahan teks kecil / konfigurasi minor |
| 2 | Komponen UI sederhana (tanpa state kompleks) |
| 3 | Fitur kecil dengan state / validasi ringan |
| 5 | Integrasi API dasar + beberapa state |
| 8 | Fitur menengah (multi screen atau kompleksitas navigasi) |
| 13 | Kompleks besar / perlu spike / risiko tinggi (pecah bila memungkinkan) |

## Sprint Planning

### Input

- Backlog terurut oleh PO.
- Kapasitas tim (hari efektif = hari kerja - cuti - meeting).
- Velocity historis (setelah ≥3 sprint).

### Timebox Agenda (90 menit contoh)

1. (10m) PO: Paparkan goal bisnis & kandidat top stories.
2. (30m) Diskusi teknis / klarifikasi acceptance criteria.
3. (20m) Estimasi (jika belum) & penyesuaian prioritas vs kapasitas.
4. (20m) Finalisasi Sprint Goal & daftar komit.
5. (10m) Identifikasi risiko + siapa yang handle.

### Template Sprint Goal

```text
Sprint Goal: Meningkatkan pengalaman reservasi awal
Fokus: Alur pilih tanggal + jam + jumlah tamu, tampilan konfirmasi.
Metrik keberhasilan: 100% stories terkait reservasi selesai & dapat demo.
```

## Contoh Board Kolom

1. Backlog
2. Ready
3. In Progress
4. Code Review
5. Testing
6. Done

Aturan perpindahan:

- Masuk "Ready" setelah DoR terpenuhi.
- Pindah ke "Code Review" hanya jika PR dibuat + checklist PR diisi.
- Pindah ke "Testing" setelah review disetujui & branch di-merge ke develop.
- Done setelah lulus test otomatis + PO menerima.

## Handling Bug & Hotfix

- Bug ditemukan di sprint tetap masuk backlog groomed (prioritas oleh PO).
- Hotfix kritikal (crash / data korup) langsung branch `hotfix/<<deskripsi-singkat>>` dari `main` sesuai strategi branch.

## Metrics Agile Awal

| Metrik | Tujuan | Cara Hitung |
|--------|--------|-------------|
| Velocity | Stabil naik / konsisten | Total poin selesai per sprint |
| Carryover Rate | < 20% | Poin tidak selesai / total sprint poin |
| Lead Time (Story) | Turun bertahap | Hari dari Ready -> Done |
| Bug Escape | Minimum | Jumlah bug produksi ditemukan setelah release |

## Risiko & Mitigasi Awal

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Build Android lambat | Menunda feedback | Cache Gradle, gunakan emulator ringan |
| Ketergantungan desain terlambat | Story tertunda | Jadwalkan grooming rutin + placeholder UI |
| Tidak ada data API stabil | Fitur blok | Gunakan mock service / JSON lokal |

## Adaptive Improvements

Setelah Retro, revisi: durasi meeting, format board, definisi kolom, penyesuaian DoR/DoD.

## Cara Mengganti Placeholder

Cari teks dengan format `<<LIKE_THIS>>` lalu ganti sesuai konteks projek (contoh `<<REPO_URL>>`, `<<ANDROID_PACKAGE>>`). Jika ada `<<PLACEHOLDER - fill from project brief>>` isi dari brief bisnis / PO.

## Related Docs

- `DEFINITION_OF_DONE.md`
- `SPRINT_CEREMONIES.md`
- `SPRINT_TRACKING.md`
- `BRANCH_STRATEGY.md`
 
## Alignment dengan Rubrik Penilaian

| Kategori Rubrik | Kontribusi Dokumen | Dampak Penilaian |
|-----------------|--------------------|------------------|
| Project Setup & Structure | Menetapkan cadence & board kolom | Struktur proses jelas mendukung setup efisien |
| UI & Design Implementation | Sprint Goal & DoR memastikan desain siap sebelum coding | UI konsisten karena persiapan story |
| Functionality & Interactivity | Estimasi & acceptance criteria | Fitur terukur & lengkap |
| State Management & Hooks | Grooming memunculkan risiko arsitektur state | Mengurangi rework state |
| Navigation & Data Flow | Story memaksa definisi flow navigasi | Navigasi diuji selama sprint |
| API Integration & Data Handling | DoR memerlukan mock/data contoh | Data handling siap diuji |
| Code Quality & Documentation | Retrospective + metrics | Peningkatan kualitas berulang |
| Creativity & Innovation | Retro mendorong eksperimen bertahap | Fitur inovatif terkontrol |
| Presentation & Demonstration | Sprint Review skrip demo | Presentasi fitur lebih terstruktur |

