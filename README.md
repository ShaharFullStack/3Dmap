# 🗺️ 3Dmap - Interactive 3D Character, Car & Room Showcase

# [✨ Try the Live Demo! ✨](https://shaharfullstack.github.io/3Dmap/)

Welcome to 3Dmap, a fun and interactive 3D viewer that lets you explore characters, vehicles, and room designs in an immersive environment!

## ✨ What's Inside

This small demo project showcases:
- 🧍 Animated character models
- 🚗 Detailed car models
- 🏠 Interactive room designs

You can navigate the 3D space, interact with objects, and explore different designs all within your browser!

## 🚀 Quick Start

Want to see it in action? [Try the live demo here!](https://shaharfullstack.github.io/3Dmap/)

To play with the code yourself:

1. Clone the repository:
   ```
   git clone https://github.com/ShaharFullStack/3Dmap.git
   ```

2. Open `index.html` in your browser - that's it!

No complex build steps or dependency installations required. Just pure JavaScript goodness.

## 🎮 How to Use

- **Move around**: Click and drag to rotate the view
- **Zoom**: Use the mouse wheel to zoom in and out
- **Select objects**: Click on characters, cars, or room elements to interact with them
- **Change view**: Use the control panel to switch between different models and scenes

## 🧩 JavaScript Structure

The `/assets/js/` directory contains all the magic that powers this 3D experience:

- **Core visualization**: Three.js-powered 3D rendering
- **Animation controllers**: Character and object animations
- **Interaction handlers**: Click and hover effects
- **Scene management**: Loading and switching between different 3D models

## 💡 Customizing & Extending

Want to add your own models or modify the existing ones? It's easy:

```javascript
// Add a new character model
map.addModel({
  id: 'new-character',
  path: 'assets/models/characters/new-character.glb',
  position: [0, 0, 0],
  scale: 1.5,
  animations: true
});
```

## 🛠️ Built With

- [Three.js](https://threejs.org/) - Powerful 3D library for the web
- Vanilla JavaScript - No frameworks, just pure JS

## 💌 Try It Out!

This is a small, fun demo project perfect for:
- Learning 3D web development
- Showcasing character designs
- Visualizing room layouts
- Testing car models in a 3D environment

[Click here to try the live demo!](https://shaharfullstack.github.io/3Dmap/)

## 📝 License

[MIT License](LICENSE) - Feel free to use, modify, and share!

## 🤝 Contact

Have questions or want to contribute? Open an issue on the [GitHub repository](https://github.com/ShaharFullStack/3Dmap/issues).

---

Made with ❤️ by [ShaharFullStack](https://github.com/ShaharFullStack)
