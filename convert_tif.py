import os
from PIL import Image

def convert_tif_to_png_or_jpg(directory, target_format="png"):
    """
    Convert all TIFF images in the specified directory (including subdirectories) to PNG or JPG.
    Delete the original TIFF images after conversion.

    :param directory: The root directory to search for TIFF images.
    :param target_format: The target image format, either "png" or "jpg".
    """
    if target_format not in ["png", "jpg"]:
        raise ValueError("target_format must be either 'png' or 'jpg'")

    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(".tif") or file.lower().endswith(".tiff"):
                tif_path = os.path.join(root, file)
                try:
                    with Image.open(tif_path) as img:
                        # Convert the image to RGB mode
                        img = img.convert("RGB")

                        # Construct the new file name and path
                        new_file_name = os.path.splitext(file)[0] + f".{target_format}"
                        new_file_path = os.path.join(root, new_file_name)

                        # Save the image in the new format
                        img.save(new_file_path, target_format.upper())

                        # Delete the original TIFF image
                        os.remove(tif_path)

                        print(f"Converted and removed: {tif_path} -> {new_file_path}")
                except Exception as e:
                    print(f"Failed to convert {tif_path}: {e}")

if __name__ == "__main__":
    directory = input("Enter the directory to convert TIFF images: ").strip()
    target_format = input("Enter the target format (png or jpg): ").strip().lower()
    convert_tif_to_png_or_jpg(directory, target_format)
