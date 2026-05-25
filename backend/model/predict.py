import sys
import json
import torch
from PIL import Image
import numpy as np
import os

from retina_classifier import RetinaClassifier

device = "cpu"

IMAGE_PATH = sys.argv[1]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CLASSIFIER_PATH = os.path.join(BASE_DIR, "retina_classifier.pth")

CLASSES = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR"
]

DESCRIPTIONS = {
    "No DR": "Healthy retina with no signs of diabetic retinopathy.",
    "Mild DR": "Early signs of diabetic retinopathy.",
    "Moderate DR": "Requires medical consultation.",
    "Severe DR": "Immediate ophthalmology care needed.",
    "Proliferative DR": "Advanced stage with high vision loss risk."
}

try:

    img = Image.open(IMAGE_PATH).convert("RGB")
    img = img.resize((224, 224))

    img_np = np.array(img).astype("float32") / 255.0
    img_np = np.transpose(img_np, (2, 0, 1))

    img_tensor = torch.tensor(img_np).unsqueeze(0).to(device)

    # LOAD CLASSIFIER ONLY
    model = RetinaClassifier().to(device)

    model.load_state_dict(
        torch.load(CLASSIFIER_PATH, map_location=device)
    )

    model.eval()

    with torch.no_grad():

        out = model(img_tensor)

        prob = torch.softmax(out, dim=1)[0]

        pred_class = CLASSES[int(torch.argmax(prob))]

        confidence = float(prob.max()) * 100

    result = {
        "stage": pred_class,
        "description": DESCRIPTIONS[pred_class],
        "confidence": confidence
    }

    print(json.dumps(result))

except Exception as e:

    print(json.dumps({
        "error": str(e)
    }))