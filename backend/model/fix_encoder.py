import torch

state = torch.load("encoder_only.pth", map_location="cpu")

new_state = {}

for k, v in state.items():
    new_key = k.replace("encoder.", "")
    new_state[new_key] = v
torch.save(new_state, "encoder_only_fixed.pth")

print("✅ Fixed encoder saved as encoder_only_fixed.pth")
