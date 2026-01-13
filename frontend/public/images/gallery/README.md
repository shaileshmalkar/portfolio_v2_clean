# Gallery Images Folder

## How to Add Your Own Images

1. **Place your images here** in this folder (`frontend/public/images/gallery/`)

2. **Supported formats**: JPG, PNG, GIF, WebP

3. **Update the backend** (`backend/main.py`) to reference your images:

```python
{
    "url": "/images/gallery/your-image-name.jpg",
    "title": "Your Image Title",
    "description": "Description of what the image shows"
}
```

## Example Structure:
```
frontend/public/images/gallery/
  ├── fastapi-code-1.jpg
  ├── python-dev.jpg
  ├── api-integration.png
  └── ...
```

## Tips:
- Use descriptive filenames (e.g., `fastapi-endpoint-code.jpg`)
- Optimize images for web (keep file sizes reasonable)
- Recommended size: 800x600px or larger for best quality

