import os
from PIL import Image
from rembg import remove

def process():
    try:
        print("Processing exterior image...")
        input_ext = Image.open('src/assets/plane-exterior-ai.png')
        output_ext = remove(input_ext)
        output_ext.save('src/assets/plane-exterior-fin.png')
        print("Exterior image saved.")

        print("Processing interior image...")
        input_int = Image.open('src/assets/plane-interior-ai.png')
        output_int = remove(input_int)
        
        # Rotate interior if it's horizontal
        if output_int.width > output_int.height:
            print("Rotating interior image...")
            output_int = output_int.rotate(-90, expand=True) 
            
        output_int.save('src/assets/plane-interior-fin.png')
        print("Interior image saved.")
    except Exception as e:
        print(f"Error processing images: {e}")

if __name__ == "__main__":
    process()
