# SPRINT CEREMONIES

Ringkasan: Agenda dan skrip terstruktur untuk setiap Scrum ceremony Lavus Restaurant App.

Last Updated: 2025-11-10

## 1. Sprint Planning
### Tujuan
Menetapkan Sprint Goal & komit user stories yang siap.

### Agenda (60–90 menit)
1. Pembukaan & tujuan bisnis (PO) – 5m
2. Review backlog prioritas teratas – 10m
3. Klarifikasi story / acceptance criteria – 20m
4. Estimasi (Planning Poker / diskusi) – 15m
5. Kapasitas tim & penyesuaian – 10m
6. Tetapkan Sprint Goal – 10m
7. Identifikasi risiko & mitigasi – 10m

### Skrip Contoh
```
PO: "Goal sprint ini meningkatkan alur reservasi agar user dapat memilih tanggal dan jam lebih cepat."
Dev: "Story filter jam butuh API endpoint, sudah siap?"
PO: "Endpoint siap, gunakan param ?date=YYYY-MM-DD".
SM: "Apakah semua story DoR terpenuhi?"
```

### Output
- Sprint Goal tertulis.
- Daftar story dengan poin & assignee.
- Risiko tercatat.

## 2. Daily Standup
### Tujuan
Sinkron status & hambatan.
### Timebox
15 menit.
### Format 3 Pertanyaan
1. Apa yang dikerjakan kemarin?
2. Apa yang akan dikerjakan hari ini?
3. Ada hambatan?

### Contoh
```
Dev A: Kemarin implement komponen MenuCard, hari ini lanjut integrasi fetch menu, hambatan: API staging lambat.
SM: Akan cek performa server atau siapkan mock.
```

## 3. Backlog Grooming (Refinement)
### Frekuensi
Mingguan (tengah sprint).
### Agenda (30–45 menit)
1. Review item baru & prioritas.
2. Klarifikasi acceptance criteria.
3. Pecah story besar (>13 poin).
4. Estimasi awal jika belum.
5. Tandai yang siap (DoR).

### Output
- Backlog terurut.
- Story siap planning berikutnya.

## 4. Sprint Review
### Tujuan
Demonstrasi increment ke stakeholder.
### Agenda (30–45 menit)
1. Ringkas Sprint Goal & capaian.
2. Demo fitur: reservasi, menu filter, rewards, dsb.
3. Feedback singkat stakeholder.
4. Keputusan release (jika relevan).

### Skrip Contoh
```
PO: "Kita berhasil menambah flow reservasi lengkap. Mari lihat pilih tanggal -> konfirmasi."
Stakeholder: "Tampilan jam bisa dibuat lebih jelas?" -> Masukkan ke backlog.
```

### Output
- Feedback list.
- Keputusan release / penundaan.

## 5. Retrospective
### Tujuan
Identifikasi apa yang berjalan baik & perbaikan.
### Agenda (45–60 menit)
1. Set suasana positif – 5m
2. Kumpulkan "Start / Stop / Continue" sticky – 10m
3. Diskusi item teratas (vote) – 20m
4. Rumuskan aksi improvement (Owner + target sprint) – 15m
5. Penutup – 5m

### Format Start / Stop / Continue (Contoh)
| Start | Stop | Continue |
|-------|------|----------|
| Dokumentasi error mock API | Commit besar tanpa penjelasan | Lint & test di PR |

### Aksi Improvement Template
Lihat dokumen `IMPROVEMENT_SUMMARY.md`.

## Retrospective Prompt Tambahan
- Apa hambatan terbesar minggu ini?
- Apakah definisi Done terlalu berat / ringan?
- Adakah tool yang menghambat produktivitas?
- Satu hal yang paling meningkatkan kualitas codebase?

## Checklist Facilitator Retrospective
- [ ] Kirim invite + agenda.
- [ ] Siapkan board (virtual / fisik).
- [ ] Pastikan timer per bagian.
- [ ] Dokumentasikan aksi ke Improvement Summary.

## Cara Mengganti Placeholder
Jika perlu contoh spesifik API atau metrik gunakan `<<PLACEHOLDER - fill from project brief>>` lalu isi setelah data tersedia.

## Related Docs
- `AGILE_SCRUM_PLAN.md`
- `SPRINT_TRACKING.md`
- `IMPROVEMENT_SUMMARY.md`
- `DEFINITION_OF_DONE.md`
