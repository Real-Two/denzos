"""
crop_products.py — Refined.
Crops the white background perfectly tightly around each product label.
"""

from PIL import Image, ImageChops, ImageOps
import os

SRC_DIR = r"c:\code n shi\denzos\public\products"
OUT_DIR = r"c:\code n shi\denzos\public\products"

def tight_crop(img):
    # Convert to RGB
    rgb = img.convert("RGB")
    # Invert so white background becomes black (0,0,0)
    inverted = ImageOps.invert(rgb)
    # getbbox() finds the bounding box of non-zero pixels
    bbox = inverted.getbbox()
    if bbox:
        return img.crop(bbox)
    return img

def find_gaps(img, threshold=30):
    bg = Image.new("RGB", img.size, (255, 255, 255))
    diff = ImageChops.difference(img.convert("RGB"), bg)
    in_gap = False
    gap_start = 0
    gaps = []
    
    for x in range(img.width):
        col_pixels = [diff.getpixel((x, y)) for y in range(img.height)]
        is_white = all(sum(p) <= threshold for p in col_pixels)
        
        if is_white and not in_gap:
            in_gap = True
            gap_start = x
        elif not is_white and in_gap:
            in_gap = False
            if x - gap_start > 15:
                gaps.append((gap_start, x))
    return gaps

def crop_products(src_path, name):
    img = Image.open(src_path)
    W, H = img.size
    gaps = find_gaps(img)
    
    if len(gaps) < 2:
        print(f"Could not find 2 gaps in {name}")
        return

    # Slice the original image broadly at the gaps
    # left slice: 0 to first gap start
    slice1 = img.crop((0, 0, gaps[0][0], H))
    # center slice: first gap end to second gap start
    slice2 = img.crop((gaps[0][1], 0, gaps[1][0], H))
    # right slice: second gap end to end of image
    slice3 = img.crop((gaps[1][1], 0, W, H))
    
    # Now tightly crop the white space out of each slice
    crop1 = tight_crop(slice1)
    crop2 = tight_crop(slice2)
    crop3 = tight_crop(slice3)
    
    # Save them
    crop1.save(os.path.join(OUT_DIR, f"{name}_10ml.jpeg"), "JPEG", quality=95)
    crop2.save(os.path.join(OUT_DIR, f"{name}_50ml.jpeg"), "JPEG", quality=95)
    crop3.save(os.path.join(OUT_DIR, f"{name}_100ml.jpeg"), "JPEG", quality=95)
    
    print(f"DONE {name}: {crop1.size}, {crop2.size}, {crop3.size}")

products = ["amber_royale", "frosted_air", "noir_floral", "oud_signature", "woody_intense"]
for p in products:
    crop_products(os.path.join(SRC_DIR, f"{p}.jpeg"), p)
