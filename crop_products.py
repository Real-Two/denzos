"""
crop_products.py — Split each Denzos product sheet into 3 individual images:
  _10ml.jpeg  (tester — small rectangle, leftmost)
  _50ml.jpeg  (full size — medium rectangle, center)
  _100ml.jpeg (gift box — large octagon, rightmost)

Strategy: scan each row for non-white pixels to find the left/right bounds of
each label group, then split into thirds.
"""

from PIL import Image, ImageChops
import os

SRC_DIR = r"c:\code n shi\denzos\public\products"
OUT_DIR = r"c:\code n shi\denzos\public\products"
PADDING = 10   # px padding around each crop

def find_content_bounds(img):
    """Return (left, right) pixel columns where content (non-white) exists."""
    bg = Image.new("RGB", img.size, (255, 255, 255))
    diff = ImageChops.difference(img.convert("RGB"), bg)
    # Collapse rows → find columns with any non-white pixel
    content_cols = []
    for x in range(img.width):
        col_pixels = [diff.getpixel((x, y)) for y in range(img.height)]
        if any(sum(p) > 30 for p in col_pixels):  # threshold for "not white"
            content_cols.append(x)
    if not content_cols:
        return 0, img.width
    return content_cols[0], content_cols[-1]

def find_gaps(img, threshold=30):
    """
    Find large white-column gaps between the 3 labels.
    Returns list of (gap_start, gap_end) for gaps wider than 20px.
    """
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
            gap_width = x - gap_start
            if gap_width > 15:  # only significant gaps
                gaps.append((gap_start, x))
    
    return gaps

def crop_products(src_path, name):
    img = Image.open(src_path)
    W, H = img.size
    print(f"\n{name}: {W}x{H}")
    
    # Find the gaps between the 3 label images
    gaps = find_gaps(img)
    print(f"  Gaps found: {gaps}")
    
    # Find overall content bounds
    left_bound, right_bound = find_content_bounds(img)
    print(f"  Content bounds: {left_bound} -> {right_bound}")
    
    if len(gaps) >= 2:
        # Take the first two significant gaps as dividers
        divider1 = (gaps[0][0] + gaps[0][1]) // 2
        divider2 = (gaps[1][0] + gaps[1][1]) // 2
        
        # Crop 1: 10ml tester (leftmost)
        x1_left = max(0, left_bound - PADDING)
        x1_right = min(W, gaps[0][0] + PADDING)
        
        # Crop 2: 50ml (center)
        x2_left = max(0, gaps[0][1] - PADDING)
        x2_right = min(W, gaps[1][0] + PADDING)
        
        # Crop 3: 100ml (rightmost)
        x3_left = max(0, gaps[1][1] - PADDING)
        x3_right = min(W, right_bound + PADDING)
        
    else:
        # Fallback: split into thirds based on content bounds
        content_width = right_bound - left_bound
        third = content_width // 3
        x1_left, x1_right = left_bound, left_bound + third
        x2_left, x2_right = left_bound + third, left_bound + 2 * third
        x3_left, x3_right = left_bound + 2 * third, right_bound
    
    crops = [
        (x1_left, 0, x1_right, H, "10ml"),
        (x2_left, 0, x2_right, H, "50ml"),
        (x3_left, 0, x3_right, H, "100ml"),
    ]
    
    for left, top, right, bottom, label in crops:
        cropped = img.crop((left, top, right, bottom))
        # Remove white margins from top/bottom too
        content = cropped.convert("RGB")
        bg = Image.new("RGB", content.size, (255, 255, 255))
        diff = ImageChops.difference(content, bg)
        
        content_rows = []
        for y in range(content.height):
            row_pixels = [diff.getpixel((x, y)) for x in range(content.width)]
            if any(sum(p) > 30 for p in row_pixels):
                content_rows.append(y)
        
        if content_rows:
            top_trim = max(0, content_rows[0] - PADDING)
            bottom_trim = min(content.height, content_rows[-1] + PADDING)
            cropped = cropped.crop((0, top_trim, cropped.width, bottom_trim))
        
        out_name = f"{name}_{label}.jpeg"
        out_path = os.path.join(OUT_DIR, out_name)
        cropped.save(out_path, "JPEG", quality=95)
        print(f"  Saved: {out_name}  ({cropped.size[0]}x{cropped.size[1]})")

# Process all product images
products = ["amber_royale", "frosted_air", "noir_floral", "oud_signature", "woody_intense"]

for product in products:
    src = os.path.join(SRC_DIR, f"{product}.jpeg")
    if os.path.exists(src):
        crop_products(src, product)
    else:
        print(f"WARNING: {src} not found")

print("\n✅ All done!")
