# DEVELOPMENT WORKFLOW & DAILY CHECKLIST

**Executive Summary:** Comprehensive operational guide establishing systematic workflows for developer onboarding, daily development activities, and pre-deployment quality validation for the Lavus Restaurant App. This checklist ensures consistent development practices, reduces setup friction, and maintains code quality standards throughout the development lifecycle.

**Last Updated:** 2025-11-12  
**Document Owner:** Development Lead / Tech Lead  
**Review Frequency:** Quarterly or when tooling/process changes

---

## Strategic Purpose & Objectives

### Checklist Philosophy

This development checklist serves multiple critical functions:

1. **Accelerated Onboarding:** Enable new team members to achieve productivity within hours rather than days through systematic environment setup
2. **Workflow Standardization:** Establish consistent daily practices preventing common pitfalls and ensuring quality gates
3. **Quality Assurance:** Embed quality validation at every development stage through automated checks and peer review
4. **Knowledge Preservation:** Document institutional knowledge about development environment, tooling, and common issues
5. **Continuous Improvement:** Capture solutions to recurring problems, reducing duplicate troubleshooting effort

### Integration with Development Ecosystem

This checklist integrates seamlessly with:

- **`DEFINITION_OF_DONE.md`** - Quality criteria validated in pre-PR checklist
- **`BRANCH_STRATEGY.md`** - Git workflow and branching conventions referenced in daily workflow
- **`TESTING_STRATEGY.md`** - Test execution and coverage requirements
- **`SPRINT_CEREMONIES.md`** - Daily standup preparation and sprint task selection
- **`PATH_ALIASES_SETUP.md`** - Import path configuration validated during setup

---

## Phase 1: Initial Developer Onboarding

### Onboarding Timeline Expectations

**Estimated Duration:** 2-4 hours for complete environment setup

**Success Criteria:** Application successfully running on Android emulator with hot reload functional

---

### 1.1 Development Environment Prerequisites

#### Core System Requirements

**Operating System Compatibility:**

- **Windows 10/11:** Recommended with WSL2 for enhanced performance
- **macOS 12+:** Required for iOS development; optional for Android-only
- **Linux (Ubuntu 20.04+):** Supported for Android development

**Hardware Recommendations:**

- **RAM:** Minimum 8GB (16GB+ recommended for emulator performance)
- **Storage:** 20GB+ free space for SDKs, emulators, and dependencies
- **Processor:** Intel Core i5 / AMD Ryzen 5 or better with virtualization support

---

#### 1.1.1 Node.js & Package Manager Setup

**Installation Steps:**

- [ ] **Install Node.js LTS** (v20.x recommended as of Nov 2025)

  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Windows: Use installer with automatic PATH configuration
  - macOS: `brew install node@20`
  - Linux: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`

- [ ] **Verify Node.js Installation**

  ```powershell
  node -v
  # Expected output: v20.x.x

  npm -v
  # Expected output: 10.x.x
  ```

- [ ] **Install Yarn Package Manager** (v1.22.x)

  ```powershell
  npm install -g yarn
  ```

- [ ] **Verify Yarn Installation**

  ```powershell
  yarn -v
  # Expected output: 1.22.x
  ```

**Troubleshooting:**

| Issue                           | Symptom                                 | Solution                                                                                      |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| `node: command not found`       | Terminal doesn't recognize node command | Restart terminal; verify PATH includes Node.js installation directory                         |
| Permission errors (macOS/Linux) | `EACCES` errors during npm install      | Use `sudo npm install -g yarn` or configure npm prefix: `npm config set prefix ~/.npm-global` |
| Version mismatch                | Wrong Node version installed            | Use `nvm` (Node Version Manager) to switch versions: `nvm install 20 && nvm use 20`           |

---

#### 1.1.2 Java Development Kit (JDK) Setup

**Android development requires JDK 17:**

- [ ] **Download JDK 17**

  - **Windows:** [Adoptium Temurin 17](https://adoptium.net/temurin/releases/)
  - **macOS:** `brew install openjdk@17`
  - **Linux:** `sudo apt install openjdk-17-jdk`

- [ ] **Configure JAVA_HOME Environment Variable**

  **Windows (PowerShell as Administrator):**

  ```powershell
  # Set JAVA_HOME
  [System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Eclipse Adoptium\jdk-17.0.x', 'Machine')

  # Add to PATH
  [System.Environment]::SetEnvironmentVariable('PATH', $env:PATH + ';%JAVA_HOME%\bin', 'Machine')
  ```

  **macOS/Linux (.bashrc or .zshrc):**

  ```bash
  export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
  export PATH=$JAVA_HOME/bin:$PATH
  ```

- [ ] **Verify JDK Installation**

  ```powershell
  java -version
  # Expected: openjdk version "17.0.x"

  echo %JAVA_HOME%  # Windows
  echo $JAVA_HOME   # macOS/Linux
  # Expected: Path to JDK 17 installation
  ```

**Common Issues:**

- **Multiple JDK versions:** Ensure JAVA_HOME points to JDK 17 specifically
- **PATH not updated:** Restart terminal or system after environment variable changes
- **Permission issues (Linux):** May need `sudo` for system-wide configuration

---

#### 1.1.3 Android Studio & SDK Configuration

**Complete Android Development Setup:**

- [ ] **Download and Install Android Studio**

  - Download: [https://developer.android.com/studio](https://developer.android.com/studio)
  - Install with recommended settings (includes Android SDK, AVD Manager, SDK Tools)

- [ ] **Install Required SDK Components**

  Open Android Studio → SDK Manager → SDK Platforms:

  - [ ] Android 14.0 (API Level 34) - Recommended target
  - [ ] Android 13.0 (API Level 33) - Backward compatibility

  SDK Tools tab:

  - [ ] Android SDK Build-Tools 34.0.0
  - [ ] Android Emulator
  - [ ] Android SDK Platform-Tools
  - [ ] Intel x86 Emulator Accelerator (HAXM) - Windows/Linux
  - [ ] Google Play services

- [ ] **Configure ANDROID_HOME Environment Variable**

  **Windows:**

  ```powershell
  [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\<USERNAME>\AppData\Local\Android\Sdk', 'User')
  ```

  **macOS/Linux (.bashrc or .zshrc):**

  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
  # export ANDROID_HOME=$HOME/Android/Sdk       # Linux
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  ```

- [ ] **Add Platform-Tools to PATH**

  **Windows:**

  ```powershell
  [System.Environment]::SetEnvironmentVariable('PATH', $env:PATH + ';%ANDROID_HOME%\platform-tools', 'User')
  ```

- [ ] **Verify Android SDK Installation**

  ```powershell
  adb version
  # Expected: Android Debug Bridge version 1.0.41

  echo %ANDROID_HOME%  # Windows
  echo $ANDROID_HOME   # macOS/Linux
  # Expected: Path to Android SDK
  ```

- [ ] **Create Android Virtual Device (AVD)**

  Android Studio → AVD Manager → Create Virtual Device:

  - **Device:** Pixel 5 or Pixel 6 (recommended for testing)
  - **System Image:** Android 14.0 (API 34) with Google Play
  - **Configuration:**
    - RAM: 2048 MB minimum (4096 MB recommended)
    - VM Heap: 256 MB
    - Internal Storage: 2048 MB
    - SD Card: 512 MB
  - **Graphics:** Hardware (GLES 2.0) for better performance

- [ ] **Enable Hardware Acceleration**

  **Windows (Hyper-V or HAXM):**

  - Check virtualization in BIOS: `systeminfo` → look for "Virtualization Enabled In Firmware: Yes"
  - Enable Hyper-V (Windows 10 Pro+) or install HAXM from SDK Manager

  **macOS:**

  - Built-in support; no additional configuration needed

  **Linux (KVM):**

  ```bash
  sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
  sudo adduser $USER kvm
  sudo chmod 666 /dev/kvm
  ```

---

#### 1.1.4 Git Version Control Setup

- [ ] **Install Git** (2.40+)

  - **Windows:** [Git for Windows](https://git-scm.com/download/win)
  - **macOS:** `brew install git` or Xcode Command Line Tools
  - **Linux:** `sudo apt install git`

- [ ] **Configure Git Identity**

  ```powershell
  git config --global user.name "Your Full Name"
  git config --global user.email "your.email@example.com"
  ```

- [ ] **Configure Git Defaults for Better Workflow**

  ```powershell
  # Use main as default branch name
  git config --global init.defaultBranch main

  # Rebase by default on pull
  git config --global pull.rebase true

  # Use VS Code as default editor (if preferred)
  git config --global core.editor "code --wait"

  # Enable colored output
  git config --global color.ui auto

  # Set line ending handling (Windows)
  git config --global core.autocrlf true

  # Set line ending handling (macOS/Linux)
  git config --global core.autocrlf input
  ```

- [ ] **Setup SSH Keys for GitHub** (Recommended)

  ```powershell
  # Generate SSH key
  ssh-keygen -t ed25519 -C "your.email@example.com"

  # Start SSH agent
  eval "$(ssh-agent -s)"  # macOS/Linux
  # Set-Service ssh-agent -StartupType Automatic; Start-Service ssh-agent  # Windows

  # Add SSH key
  ssh-add ~/.ssh/id_ed25519

  # Copy public key to clipboard
  cat ~/.ssh/id_ed25519.pub  # macOS/Linux
  # type %USERPROFILE%\.ssh\id_ed25519.pub | clip  # Windows
  ```

  Add public key to GitHub: Settings → SSH and GPG keys → New SSH key

---

#### 1.1.5 Project Repository Cloning

- [ ] **Clone Lavus Restaurant App Repository**

  ```powershell
  # HTTPS method (username/password or token)
  git clone https://github.com/VXerys/lavus-restaurant-app.git

  # SSH method (recommended after SSH key setup)
  git clone git@github.com:VXerys/lavus-restaurant-app.git

  # Navigate to project directory
  cd lavus-restaurant-app
  ```

- [ ] **Verify Repository Structure**

  ```powershell
  ls  # Windows PowerShell
  # dir  # Windows CMD
  ```

  Expected directories: `src/`, `android/`, `ios/`, `docs/`, `__tests__/`

---

#### 1.1.6 Dependency Installation

- [ ] **Install Project Dependencies**

  ```powershell
  # Install Node.js dependencies
  yarn install

  # Or if using npm
  npm install
  ```

  **Expected Duration:** 3-5 minutes depending on network speed

- [ ] **Verify Installation Success**

  ```powershell
  # Check for node_modules directory
  ls node_modules

  # Verify package.json scripts are accessible
  yarn test --version
  ```

**Troubleshooting Dependency Issues:**

| Error                                        | Cause                     | Solution                                                                            |
| -------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| `ERESOLVE unable to resolve dependency tree` | Package version conflicts | Try `yarn install --legacy-peer-deps` or `npm install --legacy-peer-deps`           |
| `gyp ERR!` (native module build failures)    | Missing build tools       | Install `windows-build-tools`: `npm install -g windows-build-tools` (Windows)       |
| Network timeout errors                       | Slow/blocked network      | Use different network or configure proxy: `yarn config set proxy http://proxy:port` |
| `EACCES` permission errors                   | Insufficient permissions  | Fix npm permissions or use `sudo` (macOS/Linux) with caution                        |

---

## 2. Struktur Kerja Harian

1. Pull perubahan terbaru: `git pull origin main` (atau `develop`).
2. Cek issue board (Sprint board): pilih story Ready.
3. Buat branch fitur: `git checkout -b feature/<nama-fitur>`.
4. Implementasi bertahap + commit kecil terarah.
5. Jalankan test dan lint sebelum push.
6. Push berkala (hindari hilang progress): `git push -u origin feature/<nama-fitur>`.
7. Buka PR saat siap review (isi template + screenshot UI).
8. Tanggap komentar review cepat (<24 jam kerja).
9. Setelah merge, hapus branch lokal & remote.

## 3. Pra-Pull Request Checklist

- [ ] Branch benar dari target (`main`/`develop`).
- [ ] Nama branch mengikuti konvensi (`feature/reserve-flow`).
- [ ] Lint: `yarn lint` (0 error, warning wajar).
- [ ] Type check: `yarn typecheck` (0 error).
- [ ] Unit test lulus: `yarn test`.
- [ ] Coverage modul baru minimal 70%.
- [ ] Tidak ada `console.log` atau komentar TODO tanpa issue.
- [ ] UI diuji pada emulator: layout tidak pecah (utama: Home, Menu, Detail, Checkout, Reserve, Profile).
- [ ] State error ditangani (network fail, empty list menu).
- [ ] Path alias digunakan bukan relatif panjang.
- [ ] Dependencies baru ditinjau (alasan jelas, ukuran aman).
- [ ] Docs / README / ENV diperbarui jika perlu.
- [ ] Screenshots PR (sebelum/sesudah) ditambahkan.

## Perintah Penting

```powershell
# Jalankan app Android
npx react-native run-android

# Start Metro manual
npx react-native start

# Bersihkan cache RN
npx react-native start --reset-cache

# Lint
yarn lint

# Format semua file
yarn prettier:write

# Type check
yarn typecheck

# Test unit
yarn test
```

## Masalah Umum & Solusi Cepat

| Gejala                | Penyebab                  | Solusi                                     |
| --------------------- | ------------------------- | ------------------------------------------ |
| `Could not find Java` | JAVA_HOME belum set       | Set env JAVA_HOME & restart terminal       |
| Emulator lambat       | Hardware acceleration OFF | Aktifkan Hyper-V / HAXM sesuai device      |
| Metro stuck / hang    | Cache korup               | Jalankan reset cache perintah di atas      |
| `adb devices` kosong  | USB debugging belum aktif | Aktifkan di perangkat / restart adb server |

## Alignment dengan Rubrik Penilaian

| Kategori                        | Checklist/Bagian Terkait                  | Hasil yang Dinilai                   |
| ------------------------------- | ----------------------------------------- | ------------------------------------ |
| Project Setup & Structure       | Onboarding (tools, env), Perintah Penting | App berjalan tanpa error di emulator |
| UI & Design Implementation      | Pra-PR (screenshot UI, layout test)       | Konsistensi dan kerapihan tampilan   |
| Functionality & Interactivity   | Pra-PR (error state, test unit)           | Fitur inti bekerja & tidak crash     |
| State Management & Hooks        | Pra-PR (state error ditangani)            | UI reaktif sesuai perubahan state    |
| Navigation & Data Flow          | Uji manual flow utama                     | Navigasi tidak membingungkan / crash |
| API Integration & Data Handling | Error state & test memeriksa fetch        | Loading/error/empty ditangani        |
| Code Quality & Documentation    | Lint, typecheck, docs update              | Kode bersih & terdokumentasi         |
| Creativity & Innovation         | Tambahan screenshot / optimasi opsional   | Fitur ekstra terlihat jelas          |
| Presentation & Demonstration    | Screenshot sebelum/sesudah di PR          | Demo lancar & jelas                  |

## Cara Mengganti Placeholder

Ganti `<<NODE_LTS_VERSION>>`, `<<JAVA_HOME_PATH>>`, `<<ANDROID_SDK_ROOT>>`, `<<REPO_URL>>` dengan nilai aktual lingkungan Anda. Jika ada yang belum pasti gunakan `<<PLACEHOLDER - fill from project brief>>` sementara.

## Related Docs

- `PROJECT_STRUCTURE.md`
- `PATH_ALIASES_SETUP.md`
- `SETUP_COMPLETE.md`
- `DEFINITION_OF_DONE.md`
