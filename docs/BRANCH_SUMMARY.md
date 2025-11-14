# BRANCH SUMMARY

Ringkasan: Ringkasan cepat tipe branch Git dan contoh perintah.

Last Updated: 2025-11-10

## Tabel Ringkas

| Tipe               | Prefix     | Sumber Awal       | Target Merge      | Contoh Nama                 | Tujuan                    |
| ------------------ | ---------- | ----------------- | ----------------- | --------------------------- | ------------------------- |
| Main               | `main`     | -                 | -                 | main                        | Produksi stabil           |
| Develop (opsional) | `develop`  | main              | main              | develop                     | Integrasi fitur           |
| Feature            | `feature/` | develop atau main | develop atau main | feature/reservation-flow    | Fitur baru                |
| Bugfix             | `bugfix/`  | develop atau main | develop atau main | bugfix/menu-filter-reset    | Perbaikan non-kritis      |
| Hotfix             | `hotfix/`  | main              | main              | hotfix/checkout-null-crash  | Perbaikan kritis produksi |
| Release            | `release/` | develop atau main | main + develop    | release/1.2.0               | Stabil sebelum rilis      |
| Chore              | `chore/`   | develop atau main | develop atau main | chore/update-gradle-wrapper | Tugas teknis              |
| Docs               | `docs/`    | develop atau main | develop atau main | docs/testing-strategy       | Dokumentasi               |

## Contoh Perintah

```bash
# Buat feature branch
git checkout -b feature/menu-ui develop

# Push pertama
git push -u origin feature/menu-ui

# Switch ke main & tarik terbaru
git checkout main
git pull origin main

# Hapus branch lokal setelah merge
git branch -d feature/menu-ui

# Hapus branch remote
git push origin --delete feature/menu-ui

# Buat hotfix dari main
git checkout -b hotfix/checkout-null-crash main

# Buat release
git checkout -b release/1.2.0 develop
```

> Gunakan PowerShell sama; perintah Bash berlaku karena Git tetap menerima.

## Alias Git (Opsional Tambahkan di `.gitconfig`)

```ini
[alias]
  co = checkout
  br = branch
  st = status
  lg = log --oneline --graph --decorate --all
```

## Cara Mengganti Placeholder

Jika ada versi `<<VERSI>>` ganti dengan nomor versi sesuai semver (mis: 1.2.0). Jika issue gunakan `<<ISSUE_NUMBER>>`.

## Alignment dengan Rubrik Penilaian

- Project Setup & Structure (10%): Ringkas tipe branch membantu struktur jelas saat penilaian.
- Code Quality & Documentation (5%): Konsistensi penamaan mengurangi kompleksitas review.
- Functionality & Interactivity / API / State: Branch feature terpisah memudahkan pengujian fokus sebelum digabung.
- Presentation & Demonstration (Bonus): Perintah siap salin memudahkan demo proses Git.

## Related Docs

- `BRANCH_STRATEGY.md`
- `AGILE_SCRUM_PLAN.md`
- `DEFINITION_OF_DONE.md`
