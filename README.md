# Retinal_Analysis

This repository contains a React frontend and an Express + Python backend for retinal analysis.

## Setup

1. Clone the repo:

```bash
git clone https://github.com/Ravichalikanti/Retinal_Analysis.git
cd Retinal_Analysis
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Start backend:

```bash
cd ../backend
npm start
```

5. Start frontend:

```bash
cd ../frontend
npm start
```

## Important model files

The backend Python prediction script requires pre-trained model weights in `backend/model/`:

- `autoencoder_retina.pth`
- `retina_classifier.pth`

These files are ignored by `.gitignore` and are not committed to the repository.

If you want this repo to work for others, you need one of these:

- add the `.pth` files into `backend/model/` and commit them if they are allowed to be shared,
- or publish the files separately and document where to download them,
- or add a setup script that downloads the model weights into `backend/model/`.

## Notes

- The frontend is a normal directory and not a git submodule.
- Prediction depends on `python` and PyTorch being installed for the backend script.
- `backend/server.js` launches `backend/model/predict.py` to perform image analysis.
