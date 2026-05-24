# Retinal_Analysis

This repository contains a React frontend and an Express + Python backend for retinal analysis.
# Retinal_Analysis

This repository contains a React frontend and an Express + Python backend for retinal analysis.

## Quick start (clone and prepare)

Prerequisites:
- `git` (with `git lfs` installed)
- `node` and `npm`
- `python` (3.8+ recommended) and `pip`

Clone the repo and fetch large model files (Git LFS):

```bash
git clone https://github.com/Ravichalikanti/Retinal_Analysis.git
cd Retinal_Analysis
# If you don't have Git LFS installed, follow instructions at https://git-lfs.github.com/
git lfs install
git lfs pull
```

If `git lfs pull` does not download model files automatically, run:

```bash
git lfs fetch --all
git lfs checkout
```

## Backend setup

1. Install Node.js dependencies:

```bash
cd backend
npm install
```

2. Install Python dependencies (minimal):

```bash
python -m pip install torch pillow numpy
```

3. Ensure the model weights are present in `backend/model/`:

- `autoencoder_retina.pth`
- `retina_classifier.pth`
- `encoder_only.pth` (optional)
- `encoder_only_fixed.pth` (optional)

These files are tracked using Git LFS and should be downloaded by `git lfs pull` above. If you obtained them separately, place them in `backend/model/`.

4. Start the backend server:

```bash
npm start
```

This runs `backend/server.js` which calls `backend/model/predict.py` to perform predictions.

## Frontend setup

Install dependencies and start the React app:

```bash
cd ../frontend
npm install
npm start
```

## Notes for contributors / distribution

- The repository uses Git LFS to store large model checkpoint files. Make sure contributors and CI runners have Git LFS enabled.
- If you cannot host model weights in this repo, consider providing a script to download them from an external storage location and place them into `backend/model/`.

## Contact

If you need help with the setup, open an issue in the repository with details about your OS and any errors you see.
