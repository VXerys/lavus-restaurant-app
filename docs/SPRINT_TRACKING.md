# SPRINT TRACKING

Ringkasan: Metode dan metrik untuk melacak progres sprint Lavus Restaurant App.

Last Updated: 2025-11-10

## Alat yang Bisa Dipakai
| Tool | Kelebihan | Kekurangan |
|------|-----------|------------|
| GitHub Projects | Integrasi repo langsung | Fitur agile terbatas dibanding Jira |
| Jira | Fitur lengkap (workflow, report) | Setup lebih kompleks |
| Trello | Mudah & ringan | Kurang laporan metrik detail |

Rekomendasi tim kecil: GitHub Projects + Issue + Milestone.

## Board Kolom (Contoh)
Backlog → Ready → In Progress → Code Review → Testing → Done.

## Metrik Utama
| Metrik | Definisi | Tujuan |
|--------|----------|--------|
| Velocity | Total story points selesai tiap sprint | Stabil / sedikit naik |
| Burndown | Grafik sisa poin vs hari sprint | Menunjukkan progress konsisten |
| Cycle Time | Hari dari In Progress -> Done | Pendek & konsisten (<5 hari) |
| Carryover | Poin tidak selesai terbawa ke sprint baru | <20% |
| Defect Rate | Bug ditemukan pasca rilis | Minimal (track per sprint) |

## Contoh Data Burndown (Sprint 2 Minggu, 10 Hari Kerja)
| Hari | Sisa Poin (Ideal) | Sisa Poin (Aktual) |
|------|-------------------|--------------------|
| 1 | 40 | 40 |
| 2 | 36 | 38 |
| 3 | 32 | 38 |
| 4 | 28 | 30 |
| 5 | 24 | 28 |
| 6 | 20 | 22 |
| 7 | 16 | 18 |
| 8 | 12 | 12 |
| 9 | 8 | 6 |
| 10 | 0 | 0 |

Visualisasikan dengan spreadsheet / tool chart.

## Export Laporan Mingguan (GitHub)
1. Filter issues sprint (label `sprint-<<NOMOR>>`).
2. Gunakan GitHub search: `is:issue label:sprint-5 is:closed` untuk yang selesai.
3. Ekspor CSV (opsi: gunakan API) atau salin ke spreadsheet.
4. Hitung: total poin, carryover, daftar bug, aksi improvement.

## Template Laporan Sprint
```
Sprint: <<SPRINT_NUMBER>> (Tanggal: <<START_DATE>> - <<END_DATE>>)
Sprint Goal: <ringkas>
Total Poin Commit: <angka>
Total Poin Selesai: <angka>
Carryover: <angka> (<persen>)
Bug Production: <jumlah>
Aksi Improvement Progress: <ringkas>
Catatan: <feedback PO / stakeholder>
```

## Otomatisasi Metode (Sederhana)
Gunakan script Node atau GitHub Action untuk menghitung jumlah issue dengan label tertentu dan menuliskan JSON summary.

## Risiko Tracking & Mitigasi
| Risiko | Penyebab | Mitigasi |
|--------|----------|----------|
| Velocity fluktuatif | Story terlalu besar | Pecah story, gunakan DoR |
| Burndown flat awal | Story tidak segera diambil | Prioritaskan early start, hindari menunggu integrasi |
| Banyak carryover | Estimasi over-optimis | Kalibrasi poin, gunakan data historis |

## Cara Mengganti Placeholder
Ganti `<<SPRINT_NUMBER>>`, `<<START_DATE>>`, `<<END_DATE>>` sesuai jadwal. Jika belum tentukan gunakan `<<PLACEHOLDER - fill from project brief>>`.

## Related Docs
- `AGILE_SCRUM_PLAN.md`
- `SPRINT_CEREMONIES.md`
- `IMPROVEMENT_SUMMARY.md`
- `BRANCH_STRATEGY.md`
